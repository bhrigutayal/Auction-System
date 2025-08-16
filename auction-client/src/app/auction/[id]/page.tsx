'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import { supabase } from '../../../lib/supabaseClient';
import CountdownTimer from '../../components/CountdownTimer';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';

// Update the socket URL for production
const SOCKET_URL = process.env.NODE_ENV === 'production' 
  ? window.location.origin.replace('https://', 'wss://').replace('http://', 'ws://')
  : 'http://localhost:3001';

interface Auction {
  id: string;
  item_name: string;
  description: string;
  starting_price: number;
  bid_increment: number;
  highest_bid: number;
  highest_bidder_id: string;
  start_time: string;
  end_time: string;
  seller_id: string;
  image_url?: string;
  imageUrl: string;
}

interface PostBidAction {
  id: string;
  auction_id: string;
  seller_id: string;
  bidder_id: string;
  action_type: 'pending' | 'accepted' | 'rejected' | 'counter_offer';
  status: 'pending' | 'completed';
  counter_amount?: number;
  message?: string;
  created_at: string;
}

export default function AuctionPage() {
  const params = useParams();
  const auctionId = params.id as string;
  const socketRef = useRef<Socket | null>(null);
  const { user, session } = useAuth();

  const [auction, setAuction] = useState<Auction | null>(null);
  const [highestBid, setHighestBid] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerDecision, setSellerDecision] = useState<'accepted' | 'rejected' | 'counter' | null>(null);
  const [counterOffer, setCounterOffer] = useState('');
  const [postBidAction, setPostBidAction] = useState<PostBidAction | null>(null);
  const [showPostBidActions, setShowPostBidActions] = useState(false);

  useEffect(() => {
    if (!auctionId) return;

    const getAuctionDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('auctions')
          .select('*')
          .eq('id', auctionId)
          .single();

        if (error || !data) {
          console.error('Error fetching auction details:', error);
          toast.error("Could not load auction details.");
          setIsLoading(false);
          return;
        }

        const formattedData: Auction = {
          ...data,
          imageUrl: data.image_url || `https://placehold.co/600x400/gray/white?text=${data.item_name.replace(/\s/g, '+')}`
        };

        setAuction(formattedData);
        setHighestBid(data.highest_bid || data.starting_price);
        setBidAmount((data.highest_bid + data.bid_increment || data.starting_price + data.bid_increment).toString());
        
        if (new Date(formattedData.end_time) <= new Date()) {
          setIsAuctionEnded(true);
          // Check if there are post-bid actions AFTER setting auction data
          setTimeout(() => {
            checkPostBidActions();
          }, 100);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error in getAuctionDetails:', error);
        toast.error("Failed to load auction details.");
        setIsLoading(false);
      }
    };

    getAuctionDetails();
  }, [auctionId]);

  useEffect(() => {
    if (!auctionId) return;

    const checkPostBidActions = async () => {
      if (!user || !auction) return;
      
      try {
        // Check for ANY post-bid action (not just pending ones)
        const { data, error } = await supabase
          .from('post_bid_actions')
          .select('*')
          .eq('auction_id', auctionId)
          .single();

        if (data && !error) {
          console.log('Found existing post-bid action:', data);
          setPostBidAction(data);
          setShowPostBidActions(true);
          return; // Don't create anything if one exists
        } else {
          console.log('No post-bid actions found');
          // Only create if auction ended, has a highest bidder, and no action exists
          if (isAuctionEnded && auction.highest_bidder_id) {
            // Double-check if action already exists before creating
            const { data: existingAction } = await supabase
              .from('post_bid_actions')
              .select('id')
              .eq('auction_id', auctionId)
              .single();
            
            if (!existingAction) {
              console.log('Creating new post-bid action...');
              await createPostBidAction();
            } else {
              console.log('Post-bid action found on second check:', existingAction);
              // Fetch the full action data
              const { data: fullAction } = await supabase
                .from('post_bid_actions')
                .select('*')
                .eq('id', existingAction.id)
                .single();
              
              if (fullAction) {
                setPostBidAction(fullAction);
                setShowPostBidActions(true);
              }
            }
          }
        }
      } catch (error) {
        console.log('Error checking post-bid actions:', error);
        // Don't create anything on error - just show the error
        toast.error('Failed to load post-bid actions');
      }
    };

    if (session) {
      try {
        socketRef.current = io(SOCKET_URL, {
          auth: { token: session.access_token },
          transports: ['websocket'] 
        });

        socketRef.current.on('connect', () => {
          console.log('Socket connected successfully');
          if (socketRef.current) {
            socketRef.current.emit('joinAuction', auctionId);
          }
        });

        socketRef.current.on('connect_error', (err: any) => {
          console.error('Socket connection error:', err);
          toast.error(`Socket connection failed: ${err.message}`);
        });

        socketRef.current.on('error', (errorMessage: string) => {
          console.error('Socket error:', errorMessage);
          toast.error(errorMessage);
        });

        // Listen for bid updates from other users FIRST - this ensures instant updates
        socketRef.current.on('bidUpdate', (data: { highestBid: number; highestBidderId: string; auctionId: string }) => {
          console.log('Bid update received:', data);
          if (data.highestBid > highestBid) {
            setHighestBid(data.highestBid);
            setBidAmount((data.highestBid + (auction?.bid_increment || 1)).toString());
            // Show notification for other users' bids
            if (data.highestBidderId !== user?.id) {
              toast.success(`New highest bid: $${data.highestBid}`);
            }
          }
        });

        socketRef.current.on('bidSuccess', (data: { bidAmount: number; auctionId: string }) => {
          console.log('Bid successful:', data);
          toast.success(`Bid placed successfully! Amount: $${data.bidAmount}`);
          // Update the highest bid locally immediately
          setHighestBid(data.bidAmount);
          setBidAmount((data.bidAmount + (auction?.bid_increment || 1)).toString());
          // Dismiss the loading toast
          toast.dismiss('bid-loading');
        });

        socketRef.current.on('outbidNotification', ({ user: outbidUserId }: { user: string }) => {
          if (user && outbidUserId === user.id) {
            toast.error("You've been outbid!");
          }
        });

        // Listen for seller bid notifications
        socketRef.current.on('sellerBidNotification', (data: { 
          sellerId: string; 
          auctionId: string; 
          itemName: string; 
          newHighestBid: number; 
          bidderId: string 
        }) => {
          console.log('Seller notification received:', data);
          console.log('Current user ID:', user?.id);
          console.log('Seller ID from notification:', data.sellerId);
          
          // Only show notification if current user is the seller
          if (user && user.id === data.sellerId) {
            console.log('Showing seller notification');
            toast.success(
              `New highest bid on "${data.itemName}": $${data.newHighestBid.toLocaleString()}!`, 
              { 
                duration: 6000,
                icon: '💰'
              }
            );
          } else {
            console.log('User is not the seller or user not logged in');
          }
        });

        // Listen for post-bid action updates
        socketRef.current.on('postBidActionUpdate', (data: PostBidAction) => {
          console.log('Post-bid action update received:', data);
          setPostBidAction(data);
          setShowPostBidActions(true);
          
          // Don't show toasts here - they will be handled by specific notifications
        });

        // Listen for bid acceptance notifications (only for highest bidder)
        socketRef.current.on('bidAcceptedNotification', (data: { 
          actionId: string; 
          auctionId: string 
        }) => {
          console.log('Bid accepted notification received:', data);
          
          // Only show for the highest bidder
          if (user && auction && user.id === auction.highest_bidder_id) {
            toast.success('🎉 Your bid has been accepted by the seller!', {
              duration: 8000,
              icon: '✅'
            });
            
            // Update the post-bid action to show accepted
            if (postBidAction) {
              setPostBidAction({
                ...postBidAction,
                action_type: 'accepted',
                status: 'completed'
              });
            }
          }
        });

        // Listen for bid rejection notifications (only for highest bidder)
        socketRef.current.on('bidRejectedNotification', (data: { 
          actionId: string; 
          auctionId: string 
        }) => {
          console.log('Bid rejected notification received:', data);
          
          // Only show for the highest bidder
          if (user && auction && user.id === auction.highest_bidder_id) {
            toast.error('❌ Your bid has been rejected by the seller.', {
              duration: 8000,
              icon: '❌'
            });
            
            // Update the post-bid action to show rejected
            if (postBidAction) {
              setPostBidAction({
                ...postBidAction,
                action_type: 'rejected',
                status: 'completed'
              });
            }
          }
        });

        // Listen for counter offer notifications (only for highest bidder)
        socketRef.current.on('counterOfferNotification', (data: { 
          actionId: string; 
          counterAmount: number; 
          auctionId: string 
        }) => {
          console.log('Counter offer notification received:', data);
          
          // Only show for the highest bidder
          if (user && auction && user.id === auction.highest_bidder_id) {
            toast.success(`💰 Seller has made a counter-offer: $${data.counterAmount}`, {
              duration: 8000,
              icon: '💰'
            });
            
            // Update the post-bid action to show counter offer
            if (postBidAction) {
              setPostBidAction({
                ...postBidAction,
                action_type: 'counter_offer',
                counter_amount: data.counterAmount,
                status: 'pending'
              });
            }
          }
        });

        // Listen for counter offer response notifications (only for seller)
        socketRef.current.on('counterOfferResponseNotification', (data: { 
          actionId: string; 
          response: string; 
          message: string; 
          auctionId: string 
        }) => {
          console.log('Counter offer response notification received:', data);
          
          // Only show for the seller
          if (user && auction && user.id === auction.seller_id) {
            if (data.response === 'accepted') {
              toast.success('✅ The bidder accepted your counter-offer!', {
                duration: 8000,
                icon: '✅'
              });
            } else {
              toast.error('❌ The bidder rejected your counter-offer.', {
                duration: 8000,
                icon: '❌'
              });
            }
            
            // Update the post-bid action to show the response
            if (postBidAction) {
              setPostBidAction({
                ...postBidAction,
                status: 'completed',
                message: data.message
              });
            }
          }
        });

        // Listen for transaction completion notifications
        socketRef.current.on('transactionCompleted', (data: { 
          auctionId: string; 
          finalAmount: number; 
          buyerEmail: string; 
          sellerEmail: string 
        }) => {
          console.log('Transaction completed:', data);
          
          // Show success message to both buyer and seller
          if (user && auction) {
            if (user.id === auction.highest_bidder_id) {
              toast.success(`🎉 Transaction completed! Invoice sent to ${data.buyerEmail}`, {
                duration: 10000,
                icon: '📧'
              });
            } else if (user.id === auction.seller_id) {
              toast.success(`🎉 Transaction completed! Invoice sent to ${data.sellerEmail}`, {
                duration: 10000,
                icon: '📧'
              });
            }
          }
          
          // Update the post-bid action to show completed
          if (postBidAction) {
            setPostBidAction({
              ...postBidAction,
              status: 'completed',
              message: `Transaction completed successfully. Final amount: $${data.finalAmount.toLocaleString()}`
            });
          }
        });

      } catch (error) {
        console.error('Error setting up socket:', error);
        toast.error("Failed to establish connection. Please refresh the page.");
      }
    }

    // Set up real-time subscription for instant updates
    const channel = supabase
      .channel(`auction-${auctionId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'auctions', 
        filter: `id=eq.${auctionId}` 
      },
        (payload) => {
          const newHighestBid = payload.new.highest_bid;
          if (newHighestBid && newHighestBid > highestBid) {
            console.log('Real-time update received:', newHighestBid);
            toast.success(`New highest bid: $${newHighestBid}`);
            setHighestBid(newHighestBid);
            setBidAmount((newHighestBid + (auction?.bid_increment || 1)).toString());
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [auctionId, session, auction?.bid_increment]);

  const handlePlaceBid = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return toast.error("Please log in to place a bid.");
    }
    
    if (!socketRef.current || !socketRef.current.connected) {
      return toast.error("Connection not established. Please refresh the page.");
    }
    
    if (!auction) {
      return toast.error("Auction data not loaded.");
    }

    // Check if user is the seller
    if (user.id === auction.seller_id) {
      return toast.error("Sellers cannot place bids on their own auctions.");
    }
    
    const newBid = parseFloat(bidAmount);
    if (isNaN(newBid)) {
      return toast.error("Please enter a valid bid amount.");
    }
    
    const minBid = highestBid + auction.bid_increment;
    if (newBid < minBid) {
      return toast.error(`Your bid must be at least $${minBid.toFixed(2)}`);
    }
    
    try {
      console.log('Emitting bid:', { auctionId, bidAmount: newBid });
      
      // Show loading state
      toast.loading('Placing your bid...', { id: 'bid-loading' });
      
      // Emit the bid event
      socketRef.current.emit('placeBid', {
        auctionId,
        bidAmount: newBid,
      });
      
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid. Please try again.');
      toast.dismiss('bid-loading');
    }
  };

  const handleAuctionEnd = () => {
    setIsAuctionEnded(true);
    toast.success("The auction has ended!");
    // Check for post-bid actions after a short delay
    setTimeout(() => {
      checkPostBidActions();
    }, 1000);
  };

  const checkPostBidActions = async () => {
    if (!user || !auction) return;
    
    try {
      console.log('Checking for post-bid actions...');
      // Check for ANY post-bid action (not just pending ones)
      const { data, error } = await supabase
        .from('post_bid_actions')
        .select('*')
        .eq('auction_id', auctionId)
        .single();

      if (data && !error) {
        console.log('Found existing post-bid action:', data);
        setPostBidAction(data);
        setShowPostBidActions(true);
        return; // Don't create anything if one exists
      } else {
        console.log('No post-bid actions found');
        // Only create if auction ended, has a highest bidder, and no action exists
        if (isAuctionEnded && auction.highest_bidder_id) {
          // Double-check if action already exists before creating
          const { data: existingAction } = await supabase
            .from('post_bid_actions')
            .select('id')
            .eq('auction_id', auctionId)
            .single();
          
          if (!existingAction) {
            console.log('Creating new post-bid action...');
            await createPostBidAction();
          } else {
            console.log('Post-bid action found on second check:', existingAction);
            // Fetch the full action data
            const { data: fullAction } = await supabase
              .from('post_bid_actions')
              .select('*')
              .eq('id', existingAction.id)
              .single();
            
            if (fullAction) {
              setPostBidAction(fullAction);
              setShowPostBidActions(true);
            }
          }
        }
      }
    } catch (error) {
      console.log('Error checking post-bid actions:', error);
      // Don't create anything on error - just show the error
      toast.error('Failed to load post-bid actions');
    }
  };

  const createPostBidAction = async () => {
    if (!auction || !auction.highest_bidder_id) return;
    
    try {
      // Final check if action already exists before creating
      const { data: existingAction } = await supabase
        .from('post_bid_actions')
        .select('id')
        .eq('auction_id', auctionId)
        .single();
      
      if (existingAction) {
        console.log('Post-bid action already exists, not creating duplicate');
        // Fetch the existing action instead
        const { data: fullAction } = await supabase
          .from('post_bid_actions')
          .select('*')
          .eq('id', existingAction.id)
          .single();
        
        if (fullAction) {
          setPostBidAction(fullAction);
          setShowPostBidActions(true);
        }
        return;
      }

      console.log('Creating new post-bid action...');
      const { data, error } = await supabase
        .from('post_bid_actions')
        .insert({
          auction_id: auctionId,
          seller_id: auction.seller_id,
          bidder_id: auction.highest_bidder_id,
          action_type: 'pending',
          status: 'pending'
        })
        .select()
        .single();

      if (data && !error) {
        console.log('Created post-bid action:', data);
        setPostBidAction(data);
        setShowPostBidActions(true);
      } else {
        console.error('Error creating post-bid action:', error);
        toast.error('Failed to create post-bid action');
      }
    } catch (error) {
      console.error('Error creating post-bid action:', error);
      toast.error('Failed to create post-bid action');
    }
  };

  const handleSellerAction = async (action: 'accepted' | 'rejected' | 'counter') => {
    if (!user || !auction || !postBidAction) return;

    try {
      let updateData: any = {
        action_type: action === 'counter' ? 'counter_offer' : action,
        status: 'completed'
      };

      if (action === 'counter' && counterOffer) {
        updateData.counter_amount = parseFloat(counterOffer);
        updateData.message = `Seller counter-offer: $${counterOffer}`;
      }

      const { error } = await supabase
        .from('post_bid_actions')
        .update(updateData)
        .eq('id', postBidAction.id);

      if (error) {
        toast.error('Failed to update action. Please try again.');
        return;
      }

      // Emit the update to the backend
      if (socketRef.current) {
        socketRef.current.emit('updatePostBidAction', {
          actionId: postBidAction.id,
          actionType: action === 'counter' ? 'counter_offer' : action,
          counterAmount: action === 'counter' ? parseFloat(counterOffer) : null
        });
      }

      setSellerDecision(action);
      
      if (action === 'counter') {
        toast.success(`Counter-offer sent: $${counterOffer}`);
      } else {
        toast.success(`Bid ${action} successfully!`);
      }
      
      // Reset form
      setCounterOffer('');
      
      // Don't hide the post-bid actions yet - wait for the response

    } catch (error) {
      console.error('Error handling seller action:', error);
      toast.error('Failed to process action. Please try again.');
    }
  };

  const handleBidderResponse = async (response: 'accepted' | 'rejected') => {
    if (!user || !postBidAction) return;

    try {
      const message = response === 'accepted' 
        ? `Bidder accepted the counter-offer of $${postBidAction.counter_amount}`
        : `Bidder rejected the counter-offer of $${postBidAction.counter_amount}`;

      const { error } = await supabase
        .from('post_bid_actions')
        .update({
          status: 'completed',
          message: message,
          updated_at: new Date().toISOString()
        })
        .eq('id', postBidAction.id);

      if (error) {
        toast.error('Failed to update response. Please try again.');
        return;
      }

      // Emit the response to the backend
      if (socketRef.current) {
        socketRef.current.emit('respondToCounterOffer', {
          actionId: postBidAction.id,
          response: response,
          message: message
        });
      }

      toast.success(`Response recorded: ${response}`);
      
      // Update local state
      setPostBidAction(prev => prev ? {
        ...prev,
        status: 'completed',
        message: message
      } : null);

    } catch (error) {
      console.error('Error handling bidder response:', error);
      toast.error('Failed to process response. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading Auction...</p>
        </div>
      </div>
    );
  }
  
  if (!auction) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Auction not found.</h2>
          <p className="text-gray-600">The auction you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const isSeller = user && auction && user.id === auction.seller_id;
  const isHighestBidder = user && auction && user.id === auction.highest_bidder_id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <img src={auction.imageUrl} alt={auction.item_name} className="w-full h-auto object-cover rounded-xl" />
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{auction.item_name}</h1>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{auction.description}</p>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-800">Current Highest Bid</span>
                <span className="text-3xl font-bold text-blue-600">${highestBid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Auction Ends In</span>
                <CountdownTimer endTime={auction.end_time} onEnd={handleAuctionEnd} />
              </div>
            </div>
            
            {!isAuctionEnded ? (
              user ? (
                isSeller ? (
                  // Seller view - show current bid info only
                  <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-green-800 mb-4">
                      <h3 className="text-xl font-bold mb-2">You are the seller of this auction</h3>
                      <p className="text-lg">Current highest bid: <span className="font-bold text-green-600">${highestBid.toLocaleString()}</span></p>
                      <p className="text-sm mt-2">You cannot place bids on your own auction</p>
                    </div>
                  </div>
                ) : (
                  // Regular user view - show bidding form
                  <form onSubmit={handlePlaceBid} className="space-y-4">
                    <label htmlFor="bid" className="block text-sm font-semibold text-gray-800 mb-2">
                      Your Bid (min. ${(highestBid + auction.bid_increment).toFixed(2)})
                    </label>
                    <div className="flex gap-4">
                      <input 
                        id="bid" 
                        type="number" 
                        value={bidAmount} 
                        onChange={(e) => setBidAmount(e.target.value)} 
                        className="flex-grow p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500" 
                        step={auction.bid_increment} 
                        min={highestBid + auction.bid_increment} 
                        placeholder={`Enter bid amount`}
                      />
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        Place Bid
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <div className="text-center p-6 bg-gray-100 rounded-xl border border-gray-200">
                  <p className="font-semibold text-gray-800">Please <Link href="/login" className="text-blue-600 hover:underline">log in</Link> to place a bid.</p>
                </div>
              )
            ) : (
              <div className="text-center p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-xl">
                <h3 className="text-2xl font-bold text-yellow-800">Auction Ended</h3>
                <p className="text-lg mt-2 text-yellow-700">Final Bid: <span className="font-bold">${highestBid.toLocaleString()}</span></p>
              </div>
            )}
            
            {/* Post-Bid Actions Section - ONLY SHOW TO SELLER AND HIGHEST BIDDER */}
            {isAuctionEnded && (isSeller || isHighestBidder) && (
              <div className="mt-8 p-6 bg-blue-50 border-blue-400 border rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-center text-blue-800">Post-Bid Actions</h3>
                
                {!postBidAction ? (
                  // Loading or no action yet
                  <div className="text-center">
                    <p className="text-blue-700">Loading post-bid actions...</p>
                    <button 
                      onClick={checkPostBidActions}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                ) : isSeller && postBidAction.status === 'pending' ? (
                  // Seller actions - only show if status is pending
                  <div className="space-y-4">
                    <p className="text-center text-blue-700">
                      The auction ended with a bid of ${highestBid}. What would you like to do?
                    </p>
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => handleSellerAction('accepted')} 
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Accept Bid
                      </button>
                      <button 
                        onClick={() => handleSellerAction('rejected')} 
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject Bid
                      </button>
                      <button 
                        onClick={() => setSellerDecision('counter')} 
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        Counter-Offer
                      </button>
                    </div>
                    
                    {sellerDecision === 'counter' && (
                      <div className="mt-4">
                        <input 
                          type="number" 
                          placeholder="Enter counter-offer amount" 
                          className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500" 
                          value={counterOffer}
                          onChange={(e) => setCounterOffer(e.target.value)} 
                        />
                        <button 
                          onClick={() => handleSellerAction('counter')}
                          className="w-full mt-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Send Counter-Offer
                        </button>
                      </div>
                    )}
                  </div>
                ) : isHighestBidder && postBidAction.status === 'pending' ? (
                  // Bidder actions - only show if status is pending
                  <div className="space-y-4">
                    <div className="text-center">
                      {postBidAction.action_type === 'accepted' && (
                        <div className="text-green-700">
                          <h4 className="text-lg font-bold mb-2">🎉 Your bid has been accepted!</h4>
                          <p className="text-sm">The seller has accepted your bid of ${highestBid}</p>
                        </div>
                      )}
                      {postBidAction.action_type === 'rejected' && (
                        <div className="text-red-700">
                          <h4 className="text-lg font-bold mb-2">❌ Your bid has been rejected</h4>
                          <p className="text-sm">The seller has rejected your bid of ${highestBid}</p>
                        </div>
                      )}
                      {postBidAction.action_type === 'counter_offer' && (
                        <div className="text-blue-700">
                          <h4 className="text-lg font-bold mb-2">💰 Counter-Offer Received!</h4>
                          <p className="text-lg mb-4">The seller has made a counter-offer: <span className="font-bold text-blue-600">${postBidAction.counter_amount}</span></p>
                          <p className="text-sm text-gray-600 mb-4">Would you like to accept or reject this offer?</p>
                          
                          <div className="flex justify-center gap-4">
                            <button 
                              onClick={() => handleBidderResponse('accepted')} 
                              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                              ✅ Accept Counter-Offer
                            </button>
                            <button 
                              onClick={() => handleBidderResponse('rejected')} 
                              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                            >
                              ❌ Reject Counter-Offer
                            </button>
                          </div>
                        </div>
                      )}
                      {postBidAction.action_type === 'pending' && (
                        <div className="text-yellow-700">
                          <h4 className="text-lg font-bold mb-2">⏳ Waiting for Seller's Response</h4>
                          <p className="text-sm">The seller is reviewing your bid of ${highestBid}</p>
                          <div className="mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto"></div>
                            <p className="text-xs mt-2 text-yellow-600">Please wait...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Show completed action status - this will show the final result
                  <div className="text-center">
                    <div className="text-blue-700">
                      {postBidAction.action_type === 'accepted' && (
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-green-700">✅ Deal Completed!</h4>
                          <p className="text-green-600">Bid accepted by seller</p>
                          {postBidAction.message && (
                            <p className="text-sm text-gray-600 mt-2">{postBidAction.message}</p>
                          )}
                        </div>
                      )}
                      {postBidAction.action_type === 'rejected' && (
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-red-700">❌ Deal Declined</h4>
                          <p className="text-red-600">Bid rejected by seller</p>
                          {postBidAction.message && (
                            <p className="text-sm text-gray-600 mt-2">{postBidAction.message}</p>
                          )}
                        </div>
                      )}
                      {postBidAction.action_type === 'counter_offer' && (
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-blue-700">💰 Counter-Offer: ${postBidAction.counter_amount}</h4>
                          {postBidAction.message && (
                            <p className="text-sm text-gray-600 mt-2">{postBidAction.message}</p>
                          )}
                          {postBidAction.status === 'completed' && (
                            <p className="text-sm text-gray-600 mt-2">
                              {postBidAction.message?.includes('accepted') ? '✅ Counter-offer was accepted' : '❌ Counter-offer was rejected'}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


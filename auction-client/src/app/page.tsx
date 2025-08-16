export const dynamic = 'force-dynamic';
import Link from 'next/link';
import AuctionCard from '../app/components/AuctionCard';
import { supabase } from '../lib/supabaseClient';

// This function now fetches data from Supabase
const getAuctions = async () => {
  const { data, error } = await supabase
    .from('auctions')
    .select('*')
    .order('end_time', { ascending: false });

    console.log(data);

  if (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
  
  // Map Supabase data to the format your component expects
  return data.map(auction => ({
      ...auction,
      currentPrice: auction.highest_bid || auction.starting_price,
      imageUrl: auction.image_url || `https://placehold.co/600x400/gray/white?text=${auction.item_name.replace(/\s/g, '+')}`
  }));
};

export default async function HomePage() {
  const auctions = await getAuctions();
  const now = new Date();
  const activeAuctions = auctions.filter(a => new Date(a.end_time) > now);
  const closedAuctions = auctions.filter(a => new Date(a.end_time) <= now);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Auctions</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover unique items and bid in real-time. Join thousands of users in exciting auctions happening right now.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/create-auction" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            Create Auction
          </Link>
          <Link 
            href="#active-auctions" 
            className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg"
          >
            Browse Auctions
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">{activeAuctions.length}</div>
            <div className="text-gray-600">Active Auctions</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-2">{closedAuctions.length}</div>
            <div className="text-gray-600">Completed Auctions</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg border border-gray-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Live Bidding</div>
          </div>
        </div>
      </div>

      {/* Active Auctions Section */}
      <section id="active-auctions" className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Auctions</h2>
            <p className="text-gray-600">Bid on items ending soon</p>
          </div>
          <Link 
            href="/create-auction" 
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            + New Auction
          </Link>
        </div>
        
        {activeAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeAuctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Active Auctions</h3>
            <p className="text-gray-600 mb-6">Be the first to create an auction!</p>
            <Link 
              href="/create-auction" 
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-all duration-200"
            >
              Create Your First Auction
            </Link>
          </div>
        )}
      </section>

      {/* Recently Closed Section */}
      {closedAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Closed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {closedAuctions.slice(0, 8).map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
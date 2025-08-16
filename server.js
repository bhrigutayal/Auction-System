const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { createClient: createRedisClient } = require('redis');
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
require('dotenv').config();
const path = require('path');
const { parse } = require('url');
const next = require('next');

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, 'auction-client') });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Initialize Redis Client for Upstash
const redisClient = createRedisClient({
  url: process.env.REDIS_URL,
  socket: {
    keepAlive: true,
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis max reconnection attempts reached');
        return new Error('Redis max reconnection attempts reached');
      }
      return Math.min(retries * 100, 3000);
    }
  }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));
redisClient.on('end', () => console.log('Redis Client Connection Ended'));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));

// Initialize Supabase Client with service role for admin access
const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Email Transporter with proper Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Test email connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email configuration error:', error);
    console.log('Please check your EMAIL_USER and EMAIL_PASS environment variables');
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email utility functions
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const generateInvoicePDF = async (auction, buyer, seller, finalAmount) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.fontSize(24).text('INVOICE', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Invoice Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Invoice #: INV-${auction.id.slice(0, 8).toUpperCase()}`);
      doc.moveDown();
      doc.fontSize(16).text('Auction Details');
      doc.fontSize(12).text(`Item: ${auction.item_name}`);
      doc.text(`Description: ${auction.description}`);
      doc.text(`Final Amount: $${finalAmount.toLocaleString()}`);
      doc.moveDown();
      doc.fontSize(16).text('Buyer Information');
      doc.fontSize(12).text(`Email: ${buyer.email}`);
      doc.moveDown();
      doc.fontSize(16).text('Seller Information');
      doc.fontSize(12).text(`Email: ${seller.email}`);
      doc.moveDown();
      doc.fontSize(14).text('Terms & Conditions');
      doc.fontSize(10).text('This invoice represents a successful auction transaction. Payment should be completed within 7 days.');
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const sendInvoiceEmail = async (to, auction, invoiceBuffer, isBuyer) => {
  const subject = `Invoice for ${auction.item_name} - Auction #${auction.id.slice(0, 8)}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Auction Invoice</h2>
      <p>Dear ${isBuyer ? 'Buyer' : 'Seller'},</p>
      <p>Your auction for <strong>${auction.item_name}</strong> has been completed successfully!</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Auction Details:</h3>
        <p><strong>Item:</strong> ${auction.item_name}</p>
        <p><strong>Final Amount:</strong> $${auction.highest_bid?.toLocaleString() || auction.starting_price.toLocaleString()}</p>
        <p><strong>Auction ID:</strong> ${auction.id.slice(0, 8)}</p>
      </div>
      <p>Please find the attached invoice for your records.</p>
      <p>Thank you for using our auction platform!</p>
      <br>
      <p style="color: #6b7280; font-size: 12px;">This is an automated message. Please do not reply.</p>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments: [{
        filename: `invoice-${auction.id.slice(0, 8)}.pdf`,
        content: invoiceBuffer
      }]
    });
    console.log(`Invoice email sent to ${to}`);
  } catch (error) {
    console.error('Error sending invoice email:', error);
  }
};

// Socket.IO Authentication Middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: Token not provided.'));
  }
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return next(new Error('Authentication error: Invalid token.'));
    }
    socket.user = { id: user.id };
    next();
  } catch (err) {
    return next(new Error('Authentication error: Token verification failed.'));
  }
});

nextApp.prepare().then(() => {
  io.on('connection', (socket) => {
    console.log(`Authenticated user connected: ${socket.user.id} with socket ${socket.id}`);

    socket.on('joinAuction', (auctionId) => {
      socket.join(auctionId);
      console.log(`Socket ${socket.id} joined room ${auctionId}`);
    });

    socket.on('placeBid', async ({ auctionId, bidAmount }) => {
      const userId = socket.user.id;
      if (!userId) {
        return socket.emit('error', 'Authentication error, user ID not found.');
      }
      try {
        console.log(`Processing bid: $${bidAmount} for auction ${auctionId} by user ${userId}`);
        const { data: auctionData, error: fetchError } = await supabase
          .from('auctions')
          .select('*')
          .eq('id', auctionId)
          .single();
        if (fetchError || !auctionData) {
          console.error('Error fetching auction:', fetchError);
          return socket.emit('error', 'Auction not found.');
        }
        if (userId === auctionData.seller_id) {
          return socket.emit('error', 'Sellers cannot place bids on their own auctions.');
        }
        const currentHighestBid = auctionData.highest_bid || auctionData.starting_price;
        const bidIncrement = auctionData.bid_increment;
        const previousHighestBidder = auctionData.highest_bidder_id;
        const sellerId = auctionData.seller_id;
        if (bidAmount < currentHighestBid + bidIncrement) {
          return socket.emit('error', `Bid must be at least $${currentHighestBid + bidIncrement}`);
        }
        const { error: updateError } = await supabase
          .from('auctions')
          .update({
            highest_bid: bidAmount,
            highest_bidder_id: userId
          })
          .eq('id', auctionId);
        if (updateError) {
          console.error('Supabase update error:', updateError);
          throw new Error(`Failed to update auction: ${updateError.message}`);
        }
        const { error: bidError } = await supabase
          .from('bids')
          .insert({
            auction_id: auctionId,
            bidder_id: userId,
            bid_amount: bidAmount
          });
        if (bidError) {
          console.error('Error logging bid:', bidError);
        }
        try {
          if (redisClient.isOpen) {
            const auctionKey = `auction:${auctionId}`;
            await redisClient.hSet(auctionKey, {
              highest_bid: bidAmount.toString(),
              highest_bidder_id: userId
            });
          }
        } catch (redisError) {
          console.log('Redis cache update failed (non-critical):', redisError);
        }
        io.to(auctionId).emit('bidUpdate', {
          highestBid: bidAmount,
          highestBidderId: userId,
          auctionId
        });
        if (previousHighestBidder && previousHighestBidder !== userId) {
          io.to(auctionId).emit('outbidNotification', { user: previousHighestBidder });
        }
        if (sellerId && sellerId !== userId) {
          console.log(`Sending seller notification to ${sellerId} for auction ${auctionId}`);
          io.to(auctionId).emit('sellerBidNotification', {
            sellerId: sellerId,
            auctionId: auctionId,
            itemName: auctionData.item_name,
            newHighestBid: bidAmount,
            bidderId: userId
          });
        }
        socket.emit('bidSuccess', { bidAmount, auctionId });
        console.log(`Bid successful: $${bidAmount} for auction ${auctionId}`);
        if (new Date(auctionData.end_time) <= new Date()) {
          console.log('Auction has ended, checking for post-bid action...');
          const existingAction = await checkPostBidActionExists(auctionId);
          if (!existingAction.exists) {
            await createPostBidActionIfNeeded(auctionId, auctionData.seller_id, userId);
          }
        }
      } catch (error) {
        console.error('Error placing bid:', error);
        socket.emit('error', 'An error occurred while placing your bid. Please try again.');
      }
    });

    socket.on('updatePostBidAction', async ({ actionId, actionType, counterAmount }) => {
      try {
        if (!['accepted', 'rejected', 'counter_offer'].includes(actionType)) {
          console.error('Invalid action type:', actionType);
          return;
        }
        const { error } = await supabase
          .from('post_bid_actions')
          .update({
            action_type: actionType,
            status: actionType === 'counter_offer' ? 'pending' : 'completed',
            counter_amount: counterAmount,
            updated_at: new Date().toISOString()
          })
          .eq('id', actionId);
        if (error) {
          console.error('Error updating post-bid action:', error);
          return;
        }
        const { data: updatedAction } = await supabase
          .from('post_bid_actions')
          .select('*')
          .eq('id', actionId)
          .single();
        if (updatedAction) {
          io.to(updatedAction.auction_id).emit('postBidActionUpdate', updatedAction);
          if (actionType === 'counter_offer') {
            io.to(updatedAction.auction_id).emit('counterOfferNotification', {
              actionId: updatedAction.id,
              counterAmount: counterAmount,
              auctionId: updatedAction.auction_id
            });
          } else if (actionType === 'accepted') {
            io.to(updatedAction.auction_id).emit('bidAcceptedNotification', {
              actionId: updatedAction.id,
              auctionId: updatedAction.auction_id
            });
            await handleSuccessfulTransaction(updatedAction.auction_id);
          } else if (actionType === 'rejected') {
            io.to(updatedAction.auction_id).emit('bidRejectedNotification', {
              actionId: updatedAction.id,
              auctionId: updatedAction.auction_id
            });
            await sendRejectionEmail(updatedAction.auction_id);
          }
        }
      } catch (error) {
        console.error('Error handling post-bid action update:', error);
      }
    });

    socket.on('respondToCounterOffer', async ({ actionId, response, message }) => {
      try {
        const { error } = await supabase
          .from('post_bid_actions')
          .update({
            status: 'completed',
            message: message,
            updated_at: new Date().toISOString()
          })
          .eq('id', actionId);
        if (error) {
          console.error('Error updating counter offer response:', error);
          return;
        }
        const { data: updatedAction } = await supabase
          .from('post_bid_actions')
          .select('*')
          .eq('id', actionId)
          .single();
        if (updatedAction) {
          io.to(updatedAction.auction_id).emit('counterOfferResponseNotification', {
            actionId: updatedAction.id,
            response: response,
            message: message,
            auctionId: updatedAction.auction_id
          });
          if (response === 'accepted') {
            await handleSuccessfulTransaction(updatedAction.auction_id);
          }
        }
      } catch (error) {
        console.error('Error handling counter offer response:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Health check endpoint for Render
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Let Next.js handle all other routes
  app.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      const { data, error } = await supabase
        .from('auctions')
        .select('count')
        .limit(1);
      if (error) {
        console.error('Supabase connection error:', error);
      } else {
        console.log('Supabase connection established successfully.');
      }
      await redisClient.connect();
      console.log('Connected to Redis successfully.');
      setInterval(async () => {
        try {
          if (redisClient.isOpen) {
            await redisClient.ping();
          }
        } catch (error) {
          console.log('Redis ping failed, attempting to reconnect...');
          try {
            await redisClient.connect();
          } catch (reconnectError) {
            console.error('Failed to reconnect to Redis:', reconnectError);
          }
        }
      }, 30000);
    } catch (error) {
      console.error('Unable to connect:', error);
    }
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  try {
    await redisClient.quit();
    console.log('Redis connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  try {
    await redisClient.quit();
    console.log('Redis connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Handle successful transaction
const handleSuccessfulTransaction = async (auctionId) => {
  try {
    const { data: auction, error: auctionError } = await supabase
      .from('auctions')
      .select('*')
      .eq('id', auctionId)
      .single();
    if (auctionError || !auction) {
      console.error('Error fetching auction for transaction:', auctionError);
      return;
    }
    let buyerEmail;
    try {
      const { data: buyer, error: buyerError } = await supabase.auth.admin.getUserById(auction.highest_bidder_id);
      if (buyerError || !buyer.user) {
        console.error('Error fetching buyer:', buyerError);
        buyerEmail = auction.buyer_email || `buyer-${auction.highest_bidder_id.slice(0, 8)}@example.com`;
      } else {
        buyerEmail = buyer.user.email;
        console.log('Found buyer email:', buyerEmail);
      }
    } catch (error) {
      console.error('Error in buyer email lookup:', error);
      buyerEmail = auction.buyer_email || `buyer-${auction.highest_bidder_id.slice(0, 8)}@example.com`;
    }
    let sellerEmail;
    try {
      const { data: seller, error: sellerError } = await supabase.auth.admin.getUserById(auction.seller_id);
      if (sellerError || !seller.user) {
        console.error('Error fetching seller:', sellerError);
        sellerEmail = auction.seller_email || `seller-${auction.seller_id.slice(0, 8)}@example.com`;
      } else {
        sellerEmail = seller.user.email;
        console.log('Found seller email:', sellerEmail);
      }
    } catch (error) {
      console.error('Error in seller email lookup:', error);
      sellerEmail = auction.seller_email || `seller-${auction.seller_id.slice(0, 8)}@example.com`;
    }
    const finalAmount = auction.highest_bid || auction.starting_price;
    const invoiceBuffer = await generateInvoicePDF(auction, { email: buyerEmail }, { email: sellerEmail }, finalAmount);
    await sendInvoiceEmail(buyerEmail, auction, invoiceBuffer, true);
    await sendInvoiceEmail(sellerEmail, auction, invoiceBuffer, false);
    io.to(auctionId).emit('transactionCompleted', {
      auctionId,
      finalAmount,
      buyerEmail: buyerEmail,
      sellerEmail: sellerEmail
    });
    console.log(`Transaction completed for auction ${auctionId}. Buyer: ${buyerEmail}, Seller: ${sellerEmail}`);
  } catch (error) {
    console.error('Error handling successful transaction:', error);
  }
};

// Send rejection email
const sendRejectionEmail = async (auctionId) => {
  try {
    const { data: auction, error: auctionError } = await supabase
      .from('auctions')
      .select('*')
      .eq('id', auctionId)
      .single();
    if (auctionError || !auction) {
      console.error('Error fetching auction for rejection email:', auctionError);
      return;
    }
    let buyerEmail;
    try {
      const { data: buyer, error: buyerError } = await supabase.auth.admin.getUserById(auction.highest_bidder_id);
      if (buyerError || !buyer.user) {
        console.error('Error fetching buyer for rejection:', buyerError);
        buyerEmail = `buyer-${auction.highest_bidder_id.slice(0, 8)}@example.com`;
      } else {
        buyerEmail = buyer.user.email;
        console.log('Found buyer email for rejection:', buyerEmail);
      }
    } catch (error) {
      console.error('Error in buyer email lookup for rejection:', error);
      buyerEmail = `buyer-${auction.highest_bidder_id.slice(0, 8)}@example.com`;
    }
    const subject = `Bid Rejected - ${auction.item_name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Bid Rejected</h2>
        <p>Dear Bidder,</p>
        <p>Unfortunately, your bid of <strong>$${auction.highest_bid?.toLocaleString() || auction.starting_price.toLocaleString()}</strong> for <strong>${auction.item_name}</strong> has been rejected by the seller.</p>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <h3>Auction Details:</h3>
          <p><strong>Item:</strong> ${auction.item_name}</p>
          <p><strong>Your Bid:</strong> $${auction.highest_bid?.toLocaleString() || auction.starting_price.toLocaleString()}</p>
          <p><strong>Status:</strong> Rejected</p>
        </div>
        <p>Don't worry! You can continue bidding on other auctions or try again with a different approach.</p>
        <p>Thank you for using our auction platform!</p>
        <br>
        <p style="color: #6b7280; font-size: 12px;">This is an automated message. Please do not reply.</p>
      </div>
    `;
    await sendEmail(buyerEmail, subject, html);
    console.log(`Rejection email sent to ${buyerEmail}`);
  } catch (error) {
    console.error('Error sending rejection email:', error);
  }
};

// Check if post-bid action exists
const checkPostBidActionExists = async (auctionId) => {
  try {
    const { data, error } = await supabase
      .from('post_bid_actions')
      .select('id')
      .eq('auction_id', auctionId)
      .single();
    return { exists: !!data, action: data, error };
  } catch (error) {
    return { exists: false, action: null, error };
  }
};

// Create post-bid action if needed
const createPostBidActionIfNeeded = async (auctionId, sellerId, bidderId) => {
  try {
    const { exists, action } = await checkPostBidActionExists(auctionId);
    if (exists) {
      console.log('Post-bid action already exists for auction:', auctionId);
      return action;
    }
    const { data: auctionData } = await supabase
      .from('auctions')
      .select('end_time, highest_bidder_id')
      .eq('id', auctionId)
      .single();
    if (!auctionData || !auctionData.highest_bidder_id || new Date(auctionData.end_time) > new Date()) {
      console.log('Auction not ready for post-bid action:', auctionId);
      return null;
    }
    const { data, error } = await supabase
      .from('post_bid_actions')
      .insert({
        auction_id: auctionId,
        seller_id: sellerId,
        bidder_id: bidderId,
        action_type: 'pending',
        status: 'pending'
      })
      .select()
      .single();
    if (error) {
      console.error('Error creating post-bid action:', error);
      return null;
    }
    console.log('Created new post-bid action:', data);
    return data;
  } catch (error) {
    console.error('Error in createPostBidActionIfNeeded:', error);
    return null;
  }
};

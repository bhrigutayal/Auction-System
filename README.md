# 🏛️ AuctionHub - Real-Time Online Auction System

A modern, full-stack online auction platform built with Next.js, Socket.IO, and Supabase. Experience real-time bidding, instant notifications, and secure transactions in a beautiful, responsive interface.

![AuctionHub Logo](auction-client/public/favicon.svg)

## ✨ Features

### 🎯 Core Auction Features
- **Real-time Bidding**: Live auction updates with Socket.IO
- **Countdown Timers**: Dynamic auction end countdowns
- **Bid History**: Complete transaction history for each auction
- **Auto-bidding**: Automatic bid increments based on seller settings
- **Auction Management**: Create, edit, and manage auctions easily

### 🔄 Advanced Bidding System
- **Counter-Offers**: Sellers can propose counter-offers to highest bidders
- **Bid Acceptance/Rejection**: Flexible seller decision-making
- **Post-Bid Actions**: Complete workflow from bid to transaction completion
- **Instant Notifications**: Real-time updates for all participants

### 🛡️ Security & Authentication
- **Supabase Auth**: Secure user authentication and authorization
- **JWT Tokens**: Secure session management
- **Role-based Access**: Sellers can't bid on their own auctions
- **Input Validation**: Comprehensive form validation and sanitization

### 📱 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Live notifications and status changes
- **Beautiful Interface**: Modern, intuitive design with Tailwind CSS
- **Accessibility**: WCAG compliant design patterns

### 📧 Communication System
- **Email Notifications**: Automated emails for important events
- **PDF Invoices**: Auto-generated invoices for successful transactions
- **In-app Notifications**: Toast notifications for immediate feedback

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (Supabase)    │
│                 │    │   (Socket.IO)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Real-time     │    │   Redis Cache   │    │   File Storage  │
│   Updates       │    │   (Upstash)     │    │   (Supabase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Socket.IO Client**: Real-time communication
- **React Hot Toast**: Beautiful notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Socket.IO**: Real-time bidirectional communication
- **Redis**: Caching and session management (Upstash)
- **Nodemailer**: Email functionality
- **PDFKit**: PDF generation

### Database & Services
- **Supabase**: PostgreSQL database with real-time features
- **Supabase Auth**: User authentication and management
- **Upstash Redis**: Redis-as-a-Service for caching

## 📁 Project Structure

```
Auction System/
├── 📁 auction-client/              # Frontend application
│   ├── 📁 src/
│   │   ├── 📁 app/                # Next.js App Router
│   │   │   ├── 📁 components/     # Reusable UI components
│   │   │   ├── 📁 auction/        # Auction detail pages
│   │   │   ├── 📁 create-auction/ # Auction creation
│   │   │   ├── 📁 login/          # Authentication
│   │   │   └── 📁 globals.css     # Global styles
│   │   ├── 📁 contexts/           # React contexts
│   │   └── 📁 lib/                # Utility functions
│   ├── 📁 public/                 # Static assets
│   └── package.json               # Frontend dependencies
├── 📁 deployment/                 # Deployment configuration
├── server.js                      # Backend server
├── package.json                   # Backend dependencies
├── Dockerfile                     # Container configuration
└── README.md                      # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Upstash Redis account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Auction-System
```

### 2. Backend Setup
```bash
cd "Auction System"
npm install
cp .env.example .env
```

Configure your `.env` file:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Redis Configuration (Upstash)
REDIS_URL=your_upstash_redis_url

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=3001
```

### 3. Frontend Setup
```bash
cd auction-client
npm install
cp .env.example .env.local
```

Configure your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### 4. Database Setup
Run the following SQL in your Supabase SQL editor:

```sql
-- Create post_bid_actions table
CREATE TABLE post_bid_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auction_id UUID REFERENCES auctions(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL,
  bidder_id UUID NOT NULL,
  action_type TEXT DEFAULT 'pending' CHECK (action_type IN ('pending', 'accepted', 'rejected', 'counter_offer')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
  counter_amount DECIMAL(10,2),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger for auction completion
CREATE OR REPLACE FUNCTION create_post_bid_action()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.end_time <= NOW() AND NEW.highest_bidder_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM post_bid_actions 
      WHERE auction_id = NEW.id
    ) THEN
      INSERT INTO post_bid_actions (auction_id, seller_id, bidder_id)
      VALUES (NEW.id, NEW.seller_id, NEW.highest_bidder_id);
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auction_ended_trigger
  AFTER UPDATE ON auctions
  FOR EACH ROW
  EXECUTE FUNCTION create_post_bid_action();
```

### 5. Start Development Servers
```bash
# Terminal 1 - Backend
cd "Auction System"
npm run dev

# Terminal 2 - Frontend
cd auction-client
npm run dev
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build the Docker image
docker build -t auctionhub .

# Run the container
docker run -p 3000:3000 auctionhub
```

### Render.com Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the provided Dockerfile
4. Set environment variables in Render dashboard
5. Deploy!

## 🔧 Configuration

### Environment Variables
- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_ANON_KEY**: Public Supabase key
- **SUPABASE_SERVICE_ROLE_KEY**: Private Supabase key
- **REDIS_URL**: Upstash Redis connection string
- **EMAIL_USER**: Gmail address for notifications
- **EMAIL_PASS**: Gmail app password
- **JWT_SECRET**: Secret key for JWT tokens

### Customization
- **Auction Duration**: Modify duration options in create-auction page
- **Bid Increments**: Adjust minimum bid increment logic
- **Email Templates**: Customize email content in server.js
- **UI Theme**: Modify Tailwind CSS classes for custom styling

## 📱 Usage

### For Buyers
1. **Browse Auctions**: View all available auctions
2. **Place Bids**: Real-time bidding with instant feedback
3. **Track Status**: Monitor your bids and auction progress
4. **Complete Transactions**: Accept/reject seller offers

### For Sellers
1. **Create Auctions**: Set up new auctions with custom parameters
2. **Monitor Bids**: Track bidding activity in real-time
3. **Make Decisions**: Accept, reject, or counter-offer bids
4. **Manage Transactions**: Handle post-auction communication

## 🧪 Testing

```bash
# Backend tests
cd "Auction System"
npm test

# Frontend tests
cd auction-client
npm test

# E2E tests
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@auctionhub.com

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Supabase** for the excellent backend-as-a-service
- **Socket.IO** for real-time communication
- **Tailwind CSS** for the utility-first CSS framework

---

<div align="center">
  <p>Made with ❤️ by the AuctionHub Team</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
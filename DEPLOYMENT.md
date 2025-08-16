# 🚀 Deployment Guide - AuctionHub

This guide will walk you through deploying your AuctionHub application on Render.com using Docker.

## 📋 Prerequisites

- GitHub repository with your AuctionHub code
- Render.com account
- Supabase project configured
- Upstash Redis account

## 🐳 Docker Setup

### 1. Build the Docker Image Locally (Optional Testing)

```bash
# From the root directory
docker build -t auctionhub .

# Test locally
docker run -p 3000:3000 auctionhub
```

### 2. Verify Dockerfile

Make sure your `Dockerfile` is in the root directory and contains:

```dockerfile
# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files for both frontend and backend
COPY auction-client/package*.json ./auction-client/
COPY "Auction System/package*.json" ./backend/

# Install dependencies for both
RUN cd auction-client && npm ci --only=production
RUN cd backend && npm ci --only=production

# Build the frontend
FROM base AS frontend-builder
WORKDIR /app/auction-client
COPY auction-client/ ./
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install production dependencies for backend
COPY "Auction System/package*.json" ./
RUN npm ci --only=production

# Copy backend source
COPY "Auction System/" ./

# Copy built frontend
COPY --from=frontend-builder /app/auction-client/.next ./auction-client/.next
COPY --from=frontend-builder /app/auction-client/public ./auction-client/public

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

## 🌐 Render.com Deployment

### Step 1: Connect Repository

1. Go to [Render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your AuctionHub code

### Step 2: Configure Service

**Basic Settings:**
- **Name**: `auctionhub` (or your preferred name)
- **Environment**: `Docker`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build & Deploy:**
- **Build Command**: Leave empty (Docker handles this)
- **Start Command**: Leave empty (Docker handles this)

### Step 3: Environment Variables

Add these environment variables in Render:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Redis Configuration (Upstash)
REDIS_URL=your_upstash_redis_url

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_key

# Server Configuration
PORT=3000
NODE_ENV=production
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for the build to complete (usually 5-10 minutes)

## 🔧 Post-Deployment Configuration

### 1. Update Frontend Environment

After deployment, update your frontend environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SOCKET_URL=https://your-render-app.onrender.com
```

### 2. Update CORS Settings

In your backend `server.js`, update CORS to allow your Render domain:

```javascript
app.use(cors({
  origin: [
    "https://your-render-app.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true
}));
```

### 3. Test the Application

1. Visit your Render app URL
2. Test user registration and login
3. Test auction creation and bidding
4. Verify real-time updates work

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Check for missing files in the build context

**Runtime Errors:**
- Verify environment variables are set correctly
- Check Supabase connection
- Verify Redis connection

**Real-time Issues:**
- Check Socket.IO configuration
- Verify CORS settings
- Check network connectivity

### Debug Commands

```bash
# Check build logs
docker logs <container_id>

# Access container shell
docker exec -it <container_id> /bin/sh

# Check environment variables
docker exec <container_id> env
```

## 📊 Monitoring

### Render Dashboard
- Monitor build status
- View deployment logs
- Check service health

### Application Logs
- Backend logs in Render dashboard
- Frontend errors in browser console
- Database queries in Supabase dashboard

## 🔄 Continuous Deployment

### Automatic Deploys
- Render automatically deploys on push to main branch
- Configure branch protection rules in GitHub
- Set up staging environment for testing

### Manual Deploys
- Use Render dashboard for manual deployments
- Rollback to previous versions if needed
- Test changes in staging first

## 🎯 Next Steps

After successful deployment:

1. **Set up custom domain** (optional)
2. **Configure SSL certificates** (automatic with Render)
3. **Set up monitoring and alerts**
4. **Configure backup strategies**
5. **Set up CI/CD pipeline**

## 📞 Support

If you encounter issues:

1. Check Render documentation
2. Review application logs
3. Verify environment configuration
4. Test locally with Docker
5. Contact Render support if needed

---

**Happy Deploying! 🚀**

Your AuctionHub application should now be live and accessible to users worldwide!

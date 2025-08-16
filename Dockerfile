# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files for both frontend and backend
COPY ../auction-client/package*.json ./auction-client/
COPY ../package*.json ./backend/

# Install dependencies for both
RUN cd auction-client && npm ci --only=production
RUN cd backend && npm ci --only=production

# Build the frontend
FROM base AS frontend-builder
WORKDIR /app/auction-client
COPY ../auction-client/ ./
RUN npm run build

# Final production image
FROM node:18-alpine AS production

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Copy backend dependencies and source
COPY --from=base /app/backend/node_modules ./node_modules
COPY --from=base /app/backend/package*.json ./
COPY ../src ./src
COPY ../server.js ./

# Copy built frontend
COPY --from=frontend-builder /app/auction-client/.next ./auction-client/.next
COPY --from=frontend-builder /app/auction-client/public ./auction-client/public
COPY --from=base /app/auction-client/node_modules ./auction-client/node_modules
COPY --from=base /app/auction-client/package*.json ./auction-client/

# Copy frontend source for server-side rendering
COPY ../auction-client/src ./auction-client/src
COPY ../auction-client/next.config.js ./auction-client/
COPY ../auction-client/tailwind.config.js ./auction-client/
COPY ../auction-client/postcss.config.js ./auction-client/

# Create a combined package.json for the production environment
RUN echo '{ \
  "name": "auction-system", \
  "version": "1.0.0", \
  "main": "server.js", \
  "scripts": { \
    "start": "node server.js", \
    "dev": "node server.js" \
  }, \
  "dependencies": { \
    "@supabase/supabase-js": "^2.55.0", \
    "cors": "^2.8.5", \
    "dotenv": "^17.2.1", \
    "express": "^5.1.0", \
    "jsonwebtoken": "^9.0.2", \
    "nodemailer": "^6.10.1", \
    "pdfkit": "^0.14.0", \
    "redis": "^5.8.1", \
    "socket.io": "^4.8.1" \
  } \
}' > package.json

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]
# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

# Set the working directory for the client app
WORKDIR /app/auction-client

# Copy package files
COPY auction-client/package*.json ./

# Remove any existing lock files and node_modules, then install fresh
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install --force

# Copy the rest of the client application code
COPY auction-client/ ./

# Build the Next.js application for production
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy the server's package files
COPY package*.json ./

# Clean install for server
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install --production --force

# Copy the server-side code and other necessary root files
COPY . .

# Copy the built Next.js application from the 'builder' stage
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]

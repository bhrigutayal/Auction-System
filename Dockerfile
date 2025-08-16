# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

# Set the working directory for the client app
WORKDIR /app/auction-client

# Copy package files and install dependencies for the client
COPY auction-client/package*.json ./
RUN npm install

# Copy the rest of the client application code
COPY auction-client/ ./

# Build the Next.js application for production
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

# Set the working directory for the entire application
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy the server's package files
COPY package*.json ./

# Install only production dependencies for the server
RUN npm install --production

# Copy the server-side code and other necessary root files
COPY . .

# Copy the built Next.js application from the 'builder' stage
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

# Expose the port the server will run on (using 8080 as a common default)
EXPOSE 8080

# The command to start the server
CMD ["node", "server.js"]

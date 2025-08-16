# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy ONLY package.json first (avoid copying package-lock.json)
COPY auction-client/package.json ./

# Install dependencies fresh for Linux platform
# This creates a new package-lock.json specific to Linux
RUN npm install

# Now copy the rest of the source code
COPY auction-client/src ./src
COPY auction-client/public ./public
COPY auction-client/next.config.* ./
COPY auction-client/tailwind.config.* ./
COPY auction-client/postcss.config.* ./
COPY auction-client/jsconfig.json ./jsconfig.json 2>/dev/null || echo '{"compilerOptions":{"baseUrl":".","paths":{"@/*":["./src/*"]}}}' > jsconfig.json

# Build the application
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install server dependencies
COPY package*.json ./
RUN npm install --production

# Copy server files
COPY server.js ./
COPY . .

# Copy built Next.js app from builder stage
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]
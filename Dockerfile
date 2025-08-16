# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy all files (including config files)
COPY auction-client/ ./

# Clean and install
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install

# Build
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --production

COPY . .
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]

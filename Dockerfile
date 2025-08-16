# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy package.json only first
COPY auction-client/package.json ./

# Clean and install dependencies for Linux
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install --no-optional

# Copy all source files
COPY auction-client/ ./

# Remove any package-lock.json that was copied (might contain Windows binaries)
RUN rm -f package-lock.json

# Ensure we have path configuration
RUN echo '{"compilerOptions":{"baseUrl":".","paths":{"@/*":["./src/*"]}},"include":["src/**/*"],"exclude":["node_modules"]}' > jsconfig.json

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

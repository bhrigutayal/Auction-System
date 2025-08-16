FROM node:20-alpine AS builder

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app/auction-client

# Copy package.json first
COPY auction-client/package.json ./

# Install dependencies with platform override
RUN npm install --platform=linux --arch=x64 --force

# Copy source code
COPY auction-client/ ./

# Remove any Windows lock file that was copied
RUN rm -f package-lock.json

# Create jsconfig for path aliases
RUN echo '{"compilerOptions":{"baseUrl":".","paths":{"@/*":["./src/*"]}}}' > jsconfig.json

# Build with verbose output to see any issues
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --production

COPY server.js ./
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]
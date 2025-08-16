# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy ONLY package.json first
COPY auction-client/package.json ./

# Install dependencies fresh for Linux
RUN npm install

# Copy all source files
COPY auction-client/ ./

# Create jsconfig.json for path aliases
RUN echo '{"compilerOptions":{"baseUrl":".","paths":{"@/*":["./src/*"]}}}' > jsconfig.json

# Ensure proper postcss config
RUN echo 'module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }' > postcss.config.js

# Build
RUN npm run build

# ==============================================================================
# STAGE 2: Production Server
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Install server dependencies
COPY package*.json ./
RUN npm install --production

# Copy server files
COPY server.js ./

# Copy built frontend
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]
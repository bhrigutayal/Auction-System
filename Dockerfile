# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy only package.json (avoid copying package-lock.json initially)
COPY auction-client/package.json ./

# Completely clean environment
RUN rm -rf node_modules package-lock.json ~/.npm
RUN npm cache clean --force

# Install with platform override and without optional dependencies
RUN npm install --platform=linux --arch=x64 --no-optional --force

# Now copy the source code
COPY auction-client/src ./src
COPY auction-client/public ./public
COPY auction-client/next.config.js ./next.config.js 2>/dev/null || true
COPY auction-client/jsconfig.json ./jsconfig.json 2>/dev/null || true
COPY auction-client/tsconfig.json ./tsconfig.json 2>/dev/null || true
COPY auction-client/tailwind.config.js ./tailwind.config.js 2>/dev/null || true
COPY auction-client/postcss.config.js ./postcss.config.js 2>/dev/null || true

# Create jsconfig.json if it doesn't exist
RUN if [ ! -f jsconfig.json ] && [ ! -f tsconfig.json ]; then \
    echo '{"compilerOptions":{"baseUrl":".","paths":{"@/*":["./src/*"]}},"include":["src/**/*"],"exclude":["node_modules"]}' > jsconfig.json; \
    fi

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

# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app/auction-client

# Copy package.json only first
COPY auction-client/package.json ./

# Remove lightningcss from package.json if it exists and install
RUN npm pkg delete dependencies.lightningcss || true
RUN npm pkg delete devDependencies.lightningcss || true
RUN npm pkg delete dependencies."@tailwindcss/postcss" || true
RUN npm pkg delete devDependencies."@tailwindcss/postcss" || true

# Clean and install dependencies
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install

# Copy all source files
COPY auction-client/ ./

# Remove any package-lock.json that was copied
RUN rm -f package-lock.json

# Create proper PostCSS config without lightningcss
RUN echo 'module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }' > postcss.config.js

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

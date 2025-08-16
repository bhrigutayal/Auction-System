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
=======
# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
# Using a specific version is better for reproducible builds
FROM node:20-alpine AS builder

# Set the working directory for the client app build
WORKDIR /app/auction-client

# Copy package.json ONLY. By ignoring the local package-lock.json,
# we ensure npm resolves dependencies for the correct (Linux) platform.
COPY auction-client/package.json ./

# Install all dependencies. This will generate a new, temporary
# package-lock.json inside the container that is correct for Linux,
# avoiding the platform error.
RUN npm install

# Now, copy all the source files for the client application
COPY auction-client/ ./

# Run the build command.
# Your postcss.config.js and jsconfig.json should be part of your source code.
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# This assumes your server.js has its own package.json at the root of your project.
# Copy its package files.
COPY package*.json ./

# Install ONLY the production dependencies needed to run the server.
RUN npm install --production

# Copy the server file and any other necessary files from your project root.
COPY server.js ./

# Copy the built Next.js app and public assets from the 'builder' stage.
# The destination paths match your original file structure.
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]
>>>>>>> f5bc24e05ab7e82da009980ddeabcba36f83bfeb

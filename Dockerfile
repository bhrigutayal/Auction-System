# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
# Using a specific version is better for reproducible builds
FROM node:20-alpine AS builder

# Set the working directory for the client app build
WORKDIR /app/auction-client

# Copy package.json and package-lock.json first.
# This leverages Docker's layer caching. The next step will only run
# if these files have changed.
COPY auction-client/package.json auction-client/package-lock.json* ./

# Install all dependencies. By running this inside the Linux container,
# npm will fetch the correct versions of packages (like lightningcss) for Linux,
# avoiding the platform error.
RUN npm install

# Now, copy all the source files for the client application
COPY auction-client/ ./

# Run the build command.
# Your postcss.config.js and jsconfig.json should be part of your source code,
# not generated here.
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

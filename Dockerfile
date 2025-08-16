# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
# Using a specific version is better for reproducible builds
FROM node:20-alpine AS builder

# On Render, environment variables are automatically available to the build process.
# We don't need to declare ARG or ENV for them here. The 'npm run build'
# command below will inherit them from the build environment.

# Set the working directory for the client app build
WORKDIR /app/auction-client

# Copy package.json ONLY. By ignoring the local package-lock.json,
# we ensure npm resolves dependencies for the correct (Linux) platform.
COPY auction-client/package.json ./

# Install all dependencies.
RUN npm install

# The build process requires this specific PostCSS plugin for Tailwind CSS v4.
RUN npm install @tailwindcss/postcss

# Now, copy all the source files for the client application
COPY auction-client/ ./

# Run the build command. The build process will now have access to the Supabase
# environment variables set in your Render dashboard.
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

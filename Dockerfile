# ==============================================================================
# STAGE 1: Build the Next.js Frontend
# ==============================================================================
# Using a specific version is better for reproducible builds
FROM node:20-alpine AS builder

# --- Build-time Environment Variables ---
# We MUST declare ARGs for the environment variables that are needed during the build.
# Render will automatically pass environment variables with matching names to these ARGs.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG REDIS_URL

# Set these arguments as environment variables within the build container
# so the 'npm run build' command can access them.
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV REDIS_URL=$REDIS_URL
# --- End of Environment Variables ---

# Set the working directory for the client app build
WORKDIR /app/auction-client

# Copy package.json ONLY.
COPY auction-client/package.json ./

# Install all dependencies.
RUN npm install

# The build process requires this specific PostCSS plugin for Tailwind CSS v4.
RUN npm install @tailwindcss/postcss

# Now, copy all the source files for the client application
COPY auction-client/ ./

# Run the build command. This will now succeed because the ENV variables are set.
RUN npm run build

# ==============================================================================
# STAGE 2: Prepare the Production Server
# ==============================================================================
FROM node:20-alpine AS runner

# --- Runtime Environment Variables ---
# We must also make the environment variables available to the final running application.
# We repeat the same pattern here for the runner stage.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG REDIS_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV REDIS_URL=$REDIS_URL
# --- End of Environment Variables ---

WORKDIR /app
ENV NODE_ENV=production

# This assumes your server.js has its own package.json at the root of your project.
COPY package*.json ./

# Install ONLY the production dependencies needed to run the server.
RUN npm install --production

# Copy the server file and any other necessary files from your project root.
COPY server.js ./

# Copy the built Next.js app and public assets from the 'builder' stage.
COPY --from=builder /app/auction-client/.next ./auction-client/.next
COPY --from=builder /app/auction-client/public ./auction-client/public

EXPOSE 8080
CMD ["node", "server.js"]

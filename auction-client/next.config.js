/** @type {import('next').NextConfig} */
const nextConfig = {
  // React's Strict Mode is a feature that helps identify potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  reactStrictMode: true,

  // You can configure how Next.js handles images here.
  // For example, if you were using images from an external source like Supabase Storage,
  // you would add its hostname to the remotePatterns array.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-supabase-project-id.supabase.co', // Replace with your actual Supabase project ID
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Environment variables that need to be accessible in the browser
  // must be prefixed with NEXT_PUBLIC_.
  // Example: NEXT_PUBLIC_SUPABASE_URL
  // These are configured in your .env.local file.
  env: {
    // Example:
    // NEXT_PUBLIC_ANALYTICS_ID: 'your-analytics-id',
  },
};

module.exports = nextConfig;

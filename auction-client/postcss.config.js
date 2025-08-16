/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // This is the only change needed
    autoprefixer: {},
  },
};

export default config;
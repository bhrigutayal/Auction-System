import type { Config } from "tailwindcss";

const config: Config = {
  // This section tells Tailwind to scan all files in your 'src' directory
  // with these extensions to find and generate the necessary CSS.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // The 'extend' block is where you can add custom styles or override
    // Tailwind's default theme without losing the defaults.
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  // Plugins allow you to add new utilities or components to Tailwind.
  plugins: [],
};
export default config;

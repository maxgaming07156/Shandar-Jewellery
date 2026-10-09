import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#641E2B", burgundy: "#45131F", gold: "#B89148", golddeep: "#8A6A2A",
        champagne: "#E8D7B5", ivory: "#FFF9F0", ink: "#292321", muted: "#766B65",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

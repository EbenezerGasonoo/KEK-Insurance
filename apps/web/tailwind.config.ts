import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-kek-display)", "Georgia", "serif"],
        body: ["var(--font-kek-body)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

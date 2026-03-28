import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        herbi: {
          orange: '#F7931E',
          'orange-light': '#FDB852',
          'orange-dark': '#D97B0B',
          blue: '#1A1A2E',
          'blue-light': '#2D2D4A',
          'blue-dark': '#12121F',
        },
      },
    },
  },
  plugins: [],
};
export default config;

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
          orange: '#F7A81D',
          'orange-light': '#FDB852',
          'orange-dark': '#D97B0B',
          blue: '#0050A2',
          'blue-light': '#1A6DC0',
          'blue-dark': '#003D7A',
          red: '#BE1522',
          gray: '#E7E7E8',
          'dark': '#30302E',
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

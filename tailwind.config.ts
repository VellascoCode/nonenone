import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        wonderBlue: "#4f46e5",
        wonderPink: "#ec4899",
        wonderPurple: "#8b5cf6",
        wonderDark: "#111827"
      },
      boxShadow: {
        glow: "0 10px 40px rgba(79, 70, 229, 0.3)"
      }
    }
  },
  plugins: []
};

export default config;

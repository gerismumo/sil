import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D91656", 
        black: "#000000",
        white: "#ffffff",
        grey: "#b0b0b0", 
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        default: "8px", 
        large: "16px",
      },
      container: {
        center: true,
        padding: "1rem", 
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",   
        lg: "1.25rem", 
        xl: "1.5rem",   
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", 
        button: "0 2px 4px rgba(0, 0, 0, 0.1)", 
      },
    },
  },
  plugins: [],
  darkMode: "class", 
} satisfies Config;

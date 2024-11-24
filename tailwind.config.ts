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
        primary: "#D91656", // Main brand color
        black: "#000000",
        white: "#ffffff",
        grey: "#b0b0b0", // Neutral grey
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        default: "8px", // Commonly used border radius
        large: "16px",
      },
      container: {
        center: true,
        padding: "1rem", // Consistent padding
      },
      fontSize: {
        sm: "0.875rem", // Small text
        base: "1rem",   // Default text
        lg: "1.25rem",  // Larger text
        xl: "1.5rem",   // Headings
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Card shadow
        button: "0 2px 4px rgba(0, 0, 0, 0.1)", // Button shadow
      },
    },
  },
  plugins: [],
  darkMode: "class", // Enable dark mode support via `class`
} satisfies Config;

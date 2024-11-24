import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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

        lightBackground: "#f9f9f9", 
        lightText: "#333333", 
        lightCard: "#ffffff", 

        
        darkBackground: "#121212", 
        darkText: "#E0E0E0", 
        darkCard: "#1E1E1E",

       
        sectionLightBackground: "#fafafa", 
        sectionDarkBackground: "#333333",
      },
      borderRadius: {
        default: "8px", 
        large: "16px",
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",   
        lg: "1.25rem", 
        xl: "1.5rem",   
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
        button: "0 2px 4px rgba(0, 0, 0, 0.1)", 
      },
    },
    screens: {
      xs: "480px",
      sm: "640px", 
      md: "768px", 
      lg: "1024px",
      xl: "1280px", 
      "2xl": "1536px", 
    },
  },
  plugins: [],
} satisfies Config;

"use client"
import useTheme from "@/lib/hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-lg shadow-button bg-primary text-white"
      onClick={toggleTheme}
    >
      Switch to {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}

export default ThemeToggle;

"use client"
import useTheme from "@/lib/hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="px-[15px] py-[6px] rounded-lg shadow-button bg-primary text-white"
      onClick={toggleTheme}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;

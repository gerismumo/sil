"use client"
import useTheme from "@/lib/hooks/useTheme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`text-[20px] ${theme === "dark" ? "text-white": "text-black"}`}
      onClick={toggleTheme}
    >
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
    </button>
  );
}

export default ThemeToggle;

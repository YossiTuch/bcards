import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const DarkModeButton = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("flowbite-theme-mode");
    return savedTheme === "dark";
  });

  useEffect(() => {
    // Update theme in localStorage and DOM
    const updateTheme = (dark: boolean) => {
      const theme = dark ? "dark" : "light";
      localStorage.setItem("flowbite-theme-mode", theme);
      document.documentElement.classList.toggle("dark", dark);
    };

    // Initial theme setup
    updateTheme(isDark);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <FaSun className="h-5 w-5" />
      ) : (
        <FaMoon className="h-5 w-5" />
      )}
    </button>
  );
};

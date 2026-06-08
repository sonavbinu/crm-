import React from "react";
import { useTheme } from "../../Context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-3 py-2 rounded=lg bg-slate-700 text-white"
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default ThemeToggle;

import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);

  const handleToggle = () => {
    setIsRotating(true);
    toggleTheme();
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <button
      className={`theme-toggle ${isRotating ? 'rotating' : ''}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;

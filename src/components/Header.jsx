import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  // Toggle Dark Mode Logic and persist to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-6 px-8 mb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-extrabold text-xl text-gray-800 dark:text-white">
          Where in the world?
        </Link>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 hover:opacity-75 transition-opacity"
        >
          {/* Simple Moon Icon (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={darkMode ? "white" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Header;
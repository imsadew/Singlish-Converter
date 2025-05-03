// scripts/theme.js
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Target the <html> element
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    // Icons for the toggle button
    const lightIcon = '☀️';
    const darkIcon = '🌙';

    // Define theme colors for the meta tag (adjust if your header color changes)
    const lightThemeColor = '#ffffff'; // Match light header bg
    const darkThemeColor = '#1f2937';  // Match dark header bg (gray-800)

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            themeToggle.innerHTML = lightIcon; // Use innerHTML for icons
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
            if (themeMeta) themeMeta.setAttribute('content', darkThemeColor);
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            themeToggle.innerHTML = darkIcon;
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            if (themeMeta) themeMeta.setAttribute('content', lightThemeColor);
            localStorage.setItem('theme', 'light');
        }
    }

    // Event listener for the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = htmlElement.classList.contains('dark');
            applyTheme(isDarkMode ? 'light' : 'dark');
        });
    } else {
        console.error("Theme toggle button not found!");
    }


    // Initial theme check on page load
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (prefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Default to light
        }
    }

    // Run theme initialization
    initializeTheme();

    // Optional: Listen for changes in system preference (only if no user preference saved)
    try {
         window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (!localStorage.getItem('theme')) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    } catch (e) {
        console.error("Error setting up media query listener:", e);
    }


})(); // IIFE to avoid polluting global scope
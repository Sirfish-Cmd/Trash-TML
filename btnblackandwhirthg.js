document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkmode");
    const root = document.documentElement;

    if (!darkModeToggle) {
        console.error("Dark mode toggle not found");
        return;
    }

    // Check for system dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function setDarkMode(isDark) {
        if (isDark) {
            root.classList.add('dark');
            document.body.style.backgroundColor = '#1a202c';
            document.body.style.color = '#ffffff';
        } else {
            root.classList.remove('dark');
            document.body.style.backgroundColor = '#ffffff';
            document.body.style.color = '#1a202c';
        }
    }

    function update() {
        setDarkMode(darkModeToggle.checked);
        updateStore();
    }

    function updateStore() {
        localStorage.setItem("darkMode", JSON.stringify(darkModeToggle.checked));
    }

    function loadStoredState() {
        const storedMode = localStorage.getItem("darkMode");
        if (storedMode !== null) {
            darkModeToggle.checked = JSON.parse(storedMode);
        } else {
            // If no stored preference, use system preference
            darkModeToggle.checked = prefersDark;
        }
        update();
    }

    // Listen for changes in system dark mode preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem("darkMode") === null) {
            darkModeToggle.checked = e.matches;
            update();
        }
    });

    darkModeToggle.addEventListener("change", update);
    loadStoredState();
});

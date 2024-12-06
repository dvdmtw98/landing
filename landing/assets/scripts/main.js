
// Update the theme icon based on the current theme
const updateThemeIcon = () => {
    const isDark = document.body.classList.contains("dark");

    const themeIcon = document.querySelector("#theme-icon");
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);
};

// Toggle between light and dark themes
const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
};

// Display the checkmark when a link is copied
const copySiteLink = () => {
    const linksSection = document.querySelector('.links');
    if (!linksSection) {
        return;
    }

    linksSection.addEventListener('click', (event) => {
        try {
            const copyButton = event.target.closest('.copy-btn');
            if (copyButton) {
                event.preventDefault();

                const linkCard = copyButton.closest('.link-card');
                if (linkCard) {
                    const url = linkCard.getAttribute('href');
                    if (url) {
                        navigator.clipboard.writeText(url);
                        createCheckMark();
                    } else {
                        console.error('No URL found to copy');
                    }
                }
            }
        } catch (error) {
            console.error(error);
            alert('Failed to copy to clipboard. Please try again.');
        }
    });
};

// Create a temporary checkmark with a circle around it
const createCheckMark = () => {
    const checkMarkContainer = document.querySelector('.checkmark-container');
    checkMarkContainer.classList.add('visible');

    // Hide the checkmark after the animation
    setTimeout(() => {
        checkMarkContainer.classList.remove('visible');
    }, 1000);
};

// Initialize theme from localStorage or system preference
const initializeSite = () => {
    const themeSwitcher = document.querySelector("#themeSwitcher");
    themeSwitcher.addEventListener("click", toggleTheme);

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    document.body.classList.toggle("dark", theme === "dark");
    updateThemeIcon();

    const year = new Date().getFullYear();
    document.querySelector(".year").textContent = year;

    copySiteLink();
};

initializeSite();

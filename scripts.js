
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

(function () {
    const toggle = document.getElementById("dark-mode-toggle");
    const modal = document.getElementById("theme-modal");
    const STORAGE_KEY = "theme";

    function applyTheme(isDark) {
        document.body.classList.toggle("dark-mode", isDark);
        if (toggle) {
            toggle.textContent = isDark ? "☀️" : "🌙";
            toggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }
    }

    function setTheme(isDark) {
        applyTheme(isDark);
        localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved ? saved === "dark" : prefersDark);

    if (toggle) {
        toggle.addEventListener("click", () => {
            setTheme(!document.body.classList.contains("dark-mode"));
        });
    }

    if (modal) {
        modal.hidden = false;
        modal.querySelectorAll(".theme-modal__btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                setTheme(btn.dataset.theme === "dark");
                modal.hidden = true;
            });
        });
    }
})();
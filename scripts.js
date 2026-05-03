
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

(function () {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    document.body.appendChild(dot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    const ease = 0.18;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.classList.add("is-visible");
    });

    document.addEventListener("mouseleave", () => dot.classList.remove("is-visible"));
    document.addEventListener("mouseenter", () => dot.classList.add("is-visible"));

    const hoverSelector = "a, button, .btn, .hamburger-icon, [onclick], input, textarea, select";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(hoverSelector)) dot.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(hoverSelector)) dot.classList.remove("is-hover");
    });

    function render() {
        dotX += (mouseX - dotX) * ease;
        dotY += (mouseY - dotY) * ease;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(render);
    }
    render();
})();
document.addEventListener("DOMContentLoaded", function () {
    const links = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll(".page-section"));
    const gotoButtons = Array.from(document.querySelectorAll("[data-goto]"));
    const filters = Array.from(document.querySelectorAll(".projects-filter-btn"));
    const items = Array.from(document.querySelectorAll(".projects-item"));
    const pageIds = sections.map(function (s) { return s.id; });

    /* ---------- Page navigation ---------- */

    function showPage(id, options) {
        const opts = options || {};
        const updateHash = opts.updateHash !== false;
        const scroll = opts.scroll !== false;

        id = (id || "").toLowerCase(); // also keeps old "#Projects" links working
        if (pageIds.indexOf(id) === -1) id = "about";

        sections.forEach(function (section) {
            section.classList.toggle("active", section.id === id);
        });

        links.forEach(function (link) {
            const isActive = link.dataset.page === id;
            link.classList.toggle("active", isActive);
            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        if (updateHash && location.hash.slice(1) !== id) {
            history.pushState(null, "", "#" + id);
        }

        if (scroll) window.scrollTo(0, 0);
    }

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            showPage(link.dataset.page);
        });
    });

    gotoButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            showPage(button.dataset.goto);
        });
    });

    // Back / forward buttons
    window.addEventListener("popstate", function () {
        showPage(location.hash.slice(1), { updateHash: false });
    });

    // Open the right section on first load (supports links like /#projects)
    showPage(location.hash.slice(1), { updateHash: false, scroll: false });

    /* ---------- Project filter ---------- */

    filters.forEach(function (button) {
        button.addEventListener("click", function () {
            filters.forEach(function (b) {
                const isActive = b === button;
                b.classList.toggle("active", isActive);
                b.setAttribute("aria-pressed", String(isActive));
            });

            const filterValue = button.dataset.filter;

            items.forEach(function (item) {
                // data-category can hold several values, e.g. "ai-ml web-development"
                const categories = item.dataset.category.split(" ");
                const show = filterValue === "all" || categories.indexOf(filterValue) !== -1;
                item.hidden = !show;
            });
        });
    });

    /* ---------- 3D tilt on skill tiles ---------- */

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canHover && !reduceMotion) {
        document.querySelectorAll(".tile").forEach(function (tile) {
            const face = tile.querySelector(".tile-face");

            tile.addEventListener("pointermove", function (event) {
                const rect = tile.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                face.style.setProperty("--ry", ((x - 0.5) * 24).toFixed(2) + "deg");
                face.style.setProperty("--rx", ((0.5 - y) * 24).toFixed(2) + "deg");
                face.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
                face.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
            });

            tile.addEventListener("pointerleave", function () {
                face.style.removeProperty("--rx");
                face.style.removeProperty("--ry");
            });
        });
    }

    /* ---------- Footer year ---------- */

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".page-section");
    const filters = document.querySelectorAll(".Projects-filter-btn");
    const items = document.querySelectorAll(".Projects-item");

    function showPage(id) {
        if (!id) id = 'about';
        let targetSection = document.getElementById(id);
        if (!targetSection) id = 'about';

        sections.forEach(section => {
            section.classList.toggle("active", section.id === id);
        });

        links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
        
        if(window.innerWidth < 1024) window.scrollTo(0, 0);
    }

    links.forEach(link => {
        link.onclick = function (event) {
            event.preventDefault();
            let pageId = link.getAttribute("href").slice(1);
            showPage(pageId);
        };
    });

    let initialPage = location.hash.slice(1) || "about";
    showPage(initialPage);

    
    filters.forEach(button => {
        button.onclick = function () {
            filters.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            let filterValue = button.dataset.filter;
            items.forEach(item => {
                if (filterValue === "all" || item.dataset.category === filterValue) {
                    item.style.display = "block";
                    item.style.animation = "fade 0.5s ease";
                } else {
                    item.style.display = "none";
                }
            });
        };
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".page-section");
  const filters = document.querySelectorAll(".portfolio-filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  function showPage(id) {
    sections.forEach(function (section) {
      if (section.id === id) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    links.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  links.forEach(function (link) {
    link.onclick = function (event) {
      event.preventDefault();
      let pageId = link.getAttribute("href").slice(1);
      showPage(pageId);
    };
  });

  let initialPage = location.hash.slice(1) || "about";
  showPage(initialPage);

  filters.forEach(function (button) {
    button.onclick = function () {
      filters.forEach(function (b) {
        b.classList.remove("active");
      });

      button.classList.add("active");

      let filterValue = button.dataset.filter;

      items.forEach(function (item) {
        if (filterValue === "all" || item.dataset.category === filterValue) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    };
  });
});

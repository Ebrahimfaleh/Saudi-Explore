document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  const langIcon = document.querySelector(".lang-icon");
  const langOptions = document.querySelector(".lang-options");

  if (langIcon && langOptions) {
    langIcon.addEventListener("click", () => {
      langOptions.classList.toggle("show");
    });
  }

  const preferredLang = localStorage.getItem("preferredLang") || "ar";
  applyLang(preferredLang);

  document.querySelectorAll("[data-lang-switch]").forEach(button => {
    button.addEventListener("click", () => {
      const selectedLang = button.getAttribute("data-lang-switch");
      applyLang(selectedLang);
      localStorage.setItem("preferredLang", selectedLang);
      langOptions.classList.remove("show");
    });
  });

  function applyLang(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.style.display = el.dataset.lang === lang ? "inline" : "none";
    });
  }
});
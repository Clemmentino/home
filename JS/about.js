document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("revealed");

  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      if (!mobileMenu.classList.contains("is-open")) {
        navbar.classList.remove("scrolled");
      }
    }
  });

  const mobileMenuButton = document.getElementById("mobile-menu-button");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
      if (mobileMenu.classList.contains("is-open")) {
        navbar.classList.add("scrolled");
        navbar.querySelector("nav").classList.add("open");
      } else {
        if (window.scrollY <= 50) {
          navbar.classList.remove("scrolled");
          navbar.querySelector("nav").classList.remove("open");
        }
      }
    });
  }

  const mobileNavLinks = mobileMenu.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("is-open")) {
        mobileMenu.classList.remove("is-open");
        if (window.scrollY <= 50) {
          navbar.classList.remove("scrolled");
          navbar.querySelector("nav").classList.remove("open");
        }
      }
    });
  });
});

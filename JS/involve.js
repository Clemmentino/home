document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("revealed");

    const navbar = document.getElementById("navbar");
    const mobileMenu = document.getElementById("mobile-menu");

    if (navbar && mobileMenu) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                if (!mobileMenu.classList.contains("is-open")) {
                    navbar.classList.remove("scrolled");
                }
            }
        });
    }


    const mobileMenuButton = document.getElementById("mobile-menu-button");

    if (mobileMenuButton && mobileMenu && navbar) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("is-open");
            if (mobileMenu.classList.contains("is-open")) {
                navbar.classList.add("scrolled");
                const navElement = navbar.querySelector("nav");
                if (navElement) {
                    navElement.classList.add("open");
                }
            } else {
                if (window.scrollY <= 50) {
                    navbar.classList.remove("scrolled");
                     const navElement = navbar.querySelector("nav");
                    if (navElement) {
                        navElement.classList.remove("open");
                    }
                }
            }
        });
    }

    if (mobileMenu) {
        const mobileNavLinks = mobileMenu.querySelectorAll("a");
        mobileNavLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (mobileMenu.classList.contains("is-open")) {
                    mobileMenu.classList.remove("is-open");
                    if (window.scrollY <= 50 && navbar) {
                        navbar.classList.remove("scrolled");
                         const navElement = navbar.querySelector("nav");
                        if (navElement) {
                             navElement.classList.remove("open");
                        }
                    }
                }
            });
        });
    }


   
    const volunteerForm = document.getElementById('volunteerForm');
    const thankYouMessage = document.getElementById('thankYouMessage');


    if (volunteerForm && thankYouMessage) { //  checks if the elements were found
        volunteerForm.addEventListener('submit', function(event) {
        
            event.preventDefault();

            
            volunteerForm.style.display = 'none';
            thankYouMessage.style.display = 'block'; 
        });
    }
    

});
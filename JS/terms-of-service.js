document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById("navbar");
    // Corrected ID: mobileMenuButton now correctly targets 'mobile-menu-toggle-button'
    const mobileMenuButton = document.getElementById("mobile-menu-toggle-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mainContent = document.getElementById("main-content"); // Get the main content div
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (navbar) {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    };

    const toggleMobileMenu = () => {
        if (!mobileMenu || !mobileMenuButton) return;

        const isOpen = mobileMenu.classList.contains("is-open");
        const menuIcon = mobileMenuButton.querySelector("svg"); // Get the SVG element

        if (isOpen) {
            mobileMenu.classList.remove("is-open");
            // Change icon back to hamburger
            if (menuIcon) {
                menuIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16m-7 6h7"></path>`;
            }
        } else {
            mobileMenu.classList.add("is-open");
            // Change icon to 'X'
            if (menuIcon) {
                menuIcon.innerHTML = `
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>`;
            }
        }
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenuButton) return;
        mobileMenu.classList.remove("is-open");
        // Ensure icon is hamburger when menu is closed
        const menuIcon = mobileMenuButton.querySelector("svg");
        if (menuIcon) {
            menuIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"></path>`;
        }
    };

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll handler for performance
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    // Attach event listener for mobile menu toggle button
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", toggleMobileMenu);
    }

    // Close mobile menu when a link or button inside it is clicked
    if (mobileMenu) {
        mobileMenu.querySelectorAll("a, button").forEach((item) => {
            item.addEventListener("click", closeMobileMenu);
        });
    }

    // Initial call to set navbar state on page load
    handleScroll();

    // FIX FOR "WHITE BLOCKING": Reveal main content on page load
    if (mainContent) {
        // Add the 'revealed' class to the body after a small delay
        // to allow CSS to be parsed and prevent initial flash of unstyled content.
        setTimeout(() => {
            document.body.classList.add('revealed');
        }, 100); // Adjust delay if needed
    }

    // This line is generally fine but often not strictly necessary if CSS handles overflow.
    // Kept as it was in your provided JS.
    document.body.style.overflowY = "auto";
});
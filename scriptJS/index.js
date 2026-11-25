function initLandingPage() {
    const menuLinks = document.querySelectorAll(".menu a");
    const contactForm = document.querySelector(".contact-form");
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    function closeMenu() {
        if (!menuToggle || !menu) return;
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu");
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            const isOpen = menu.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
        });

        document.addEventListener("click", function (event) {
            if (!navbar.contains(event.target)) {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // Smooth scroll
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const targetId = href.slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                event.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetTop,
                    behavior: "smooth"
                });
                closeMenu();
            }
        });
    });

    // Active menu item on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY + 80;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
                });
            }
        });

        // Sticky navbar
        if (window.scrollY > 20) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }
    });

    // Simple contact form validation
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                message: this.message.value.trim(),
                savedAt: new Date().toISOString()
            };

            localStorage.setItem("baznasContactForm", JSON.stringify(formData));

            alert("Data kontak tersimpan di browser.");
            this.reset();
        });
    }

    function loadSavedContact() {
        const saved = localStorage.getItem("baznasContactForm");
        if (!saved) return;
        const data = JSON.parse(saved);
        contactForm.name.value = data.name || "";
        contactForm.email.value = data.email || "";
        contactForm.message.value = data.message || "";
    }

    if (contactForm) {
        loadSavedContact();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLandingPage);
} else {
    initLandingPage();
}
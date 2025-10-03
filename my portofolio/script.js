document.addEventListener('DOMContentLoaded', () => {

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Jika href hanya '#', lakukan scroll ke paling atas
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px for a little more padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close nav menu if open (for mobile)
                const navLinks = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // --- ACTIVE NAVIGATION LINK ON SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    const headerHeight = document.querySelector('header').offsetHeight;

    const observerOptions = {
        root: null, // viewport
        rootMargin: `-${headerHeight + 1}px 0px -50% 0px`, // Adjust for header and a bit more
        threshold: 0 // As soon as target enters/leaves root
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to the current section's link
                const currentLink = document.querySelector(`.nav-links li a[href="#${entry.target.id}"]`);
                if (currentLink) {
                    currentLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- BURGER MENU TOGGLE FOR MOBILE ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); // Animasi burger icon
    });

    // --- SCROLL TO TOP LINK/BUTTON (Jika ingin menambah tombol scroll-to-top) ---
    // Anda bisa menambahkan ini di HTML dan CSS jika diperlukan.
    // Contoh:
    // const scrollTopBtn = document.createElement('button');
    // scrollTopBtn.textContent = 'Top';
    // scrollTopBtn.classList.add('scroll-to-top-btn'); // tambahkan gaya di CSS
    // document.body.appendChild(scrollTopBtn);

    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 300) { // Tampilkan setelah scroll 300px
    //         scrollTopBtn.style.display = 'block';
    //     } else {
    //         scrollTopBtn.style.display = 'none';
    //     }
    // });

    // scrollTopBtn.addEventListener('click', () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // });
});
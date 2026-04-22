document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const backToTop = document.getElementById('back-to-top');

    // Toggle Mobile Menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            
            const spans = mobileMenu.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                if (navLinks) navLinks.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('open');

                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Client Carousel Auto-Scroll Logic
    const track = document.getElementById('client-track');
    const dots = document.querySelectorAll('.dot');
    let currentIdx = 0;
    const slideCount = 5;

    function updateCarousel(index) {
        if (!track) return;
        currentIdx = index;
        track.style.transform = `translateX(-${currentIdx * 100}%)`;
        
        dots.forEach((dot, i) => {
            if (i === currentIdx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function autoScroll() {
        currentIdx = (currentIdx + 1) % slideCount;
        updateCarousel(currentIdx);
    }

    let scrollInterval = setInterval(autoScroll, 3000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(scrollInterval);
            updateCarousel(index);
            scrollInterval = setInterval(autoScroll, 3000);
        });
    });

    // Scroll Effects: Header & Back to Top
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.85)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            }
        }

        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
    });
});

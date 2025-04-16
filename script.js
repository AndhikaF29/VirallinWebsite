function initializeClientSlider() {
    const swiper = new Swiper("#clientSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".client-swiper-next",
            prevEl: ".client-swiper-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
}

// Panggil fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    initializeClientSlider();
    
    // Debug untuk gambar
    const images = document.querySelectorAll('.client-logo img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Error loading image:', this.src);
            // Ganti dengan placeholder jika gambar error
            this.src = 'https://via.placeholder.com/200x100?text=Logo';
        });
        console.log('Image source:', img.src);
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Animation on Scroll (Simple Version)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load

    // Inisialisasi penghitung
    animateCounter(document.querySelector('.client-counter .counter-number'), 0, 150, 2000); // 150 dalam 2 detik
    animateCounter(document.querySelectorAll('.client-counter .counter-number')[1], 0, 98, 2000); // 98%
    animateCounter(document.querySelectorAll('.client-counter .counter-number')[2], 0, 25, 2000); // 25+

    // Animasi untuk problem cards
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach((card, index) => {
        // Tambahkan delay untuk animasi bertahap
        setTimeout(() => {
            card.classList.add('animated');
        }, index * 200);
        
        // Tambahkan event listener untuk hover effect
        card.addEventListener('mouseenter', function() {
            this.querySelector('.problem-icon').style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.problem-icon').style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Animasi untuk tombol CTA
    const ctaButton = document.querySelector('.pulse-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Tambahkan scroll reveal jika AOS library tersedia
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
} 

    function animateCount(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            element.textContent = currentCount + (element.id === 'clients-count' ? '+' : element.id === 'satisfaction-rate' ? '%' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    document.addEventListener('DOMContentLoaded', () => {
        animateCount(document.getElementById('clients-count'), 1, 150, 2000); // 150+
        animateCount(document.getElementById('satisfaction-rate'), 1, 98, 2000); // 98%
        animateCount(document.getElementById('experience-years'), 1, 5, 2000); // 25+
    });

    function animateCount(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            element.textContent = currentCount + (element.id === 'active-clients' ? '+' : element.id === 'satisfaction-rate' ? '%' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    document.addEventListener('DOMContentLoaded', () => {
        animateCount(document.getElementById('active-clients'), 0, 150, 2000); // 150+
        animateCount(document.getElementById('satisfaction-rating'), 0, 98, 2000); // 98%
        animateCount(document.getElementById('experience-tahun'), 0, 5, 2000); // 25+
    });
// ============================================
// SCRIPT MODERNO CON ANIMACIONES ESPECTACULARES
// ============================================

// --- 0. PRELOADER & DARK MODE (Ejecución Inmediata) ---
// Recuperar preferencia de Dark Mode
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    // Esconder Preloader
    const preloader = document.getElementById('global-preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 800); // 800ms mínimo de logo latiendo para WOW factor
    }

    // Inicializar VanillaTilt si existe
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".card-hover, .doctor-card, .pricing-card, .service-item"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
    }

    // Dark Mode Toggle Logic
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const isDark = document.documentElement.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Cambiar icono
            const icon = darkModeBtn.querySelector('i');
            if (isDark) {
                icon.className = 'fa-solid fa-sun';
            } else {
                icon.className = 'fa-solid fa-moon';
            }
        });

        // Sincronizar icono inicial
        if (document.documentElement.classList.contains('dark-mode')) {
            darkModeBtn.querySelector('i').className = 'fa-solid fa-sun';
        }
    }

    // ============================================
    // 1. CURSOR PERSONALIZADO
    // ============================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Efecto hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card-hover, .tab-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // ============================================
    // 2. INICIALIZAR AOS (ANIMACIONES AL SCROLL)
    // ============================================
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic',
        delay: 0,
    });

    // ============================================
    // 3. HERO SLIDER CON SWIPER
    // ============================================
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        on: {
            slideChange: function () {
                // Reiniciar animaciones en el nuevo slide
                const activeSlide = this.slides[this.activeIndex];
                const heroContent = activeSlide.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.animation = 'none';
                    setTimeout(() => {
                        heroContent.style.animation = '';
                    }, 10);
                }
            }
        }
    });

    // ============================================
    // 4. GALERÍA SLIDER
    // ============================================
    const gallerySwiper = new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            }
        },
        on: {
            slideChange: function () {
                // Efecto parallax en las imágenes
                this.slides.forEach((slide, index) => {
                    const img = slide.querySelector('img');
                    if (img) {
                        const offset = (index - this.activeIndex) * 20;
                        img.style.transform = `translateY(${offset}px)`;
                    }
                });
            }
        }
    });

    // ============================================
    // 5. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Ocultar/mostrar navbar al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // 6. NAVEGACIÓN SUAVE Y ACTIVE STATE
    // ============================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scroll para los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // 7. ANIMACIÓN DE NÚMEROS (COUNTER)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number, .stat-number-inline');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    // Observar cuando los números entran en viewport
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.textContent;
                if (number === '0') {
                    animateCounter(entry.target);
                }
                numberObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        numberObserver.observe(stat);
    });

    // ============================================
    // 8. TABS FUNCTIONALITY
    // ============================================
    window.openTab = function (evt, tabName) {
        // Ocultar todos los contenidos
        const tabContents = document.getElementsByClassName('tab-content');
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = 'none';
            tabContents[i].classList.remove('active');
        }

        // Quitar clase active de los botones
        const tabButtons = document.getElementsByClassName('tab-btn');
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }

        // Mostrar el contenido activo
        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.style.display = 'block';
            activeTab.classList.add('active');

            // Animación de entrada
            activeTab.style.animation = 'fadeInTab 0.5s ease-out';
        }

        // Activar el botón
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add('active');
        }
    }

    // ============================================
    // 9. EFECTO MAGNÉTICO EN BOTONES
    // ============================================
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // 10. PARALLAX EFFECT EN HERO
    // ============================================
    const heroSlides = document.querySelectorAll('.swiper-slide');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-slider').offsetHeight;

        if (scrolled < heroHeight) {
            heroSlides.forEach(slide => {
                const background = slide.querySelector('.slide-background');
                if (background) {
                    const speed = 0.5;
                    background.style.transform = `translateY(${scrolled * speed}px)`;
                }
            });
        }
    });

    // ============================================
    // 11. SCROLL TO TOP BUTTON
    // ============================================
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // 12. CHATBOT TOGGLE
    // ============================================
    window.toggleChat = function () {
        // Aquí se integraría con el sistema de chatbot real
        // Por ahora, mostramos una animación
        const chatbot = document.querySelector('.chatbot-toggle');
        chatbot.style.animation = 'none';
        setTimeout(() => {
            chatbot.style.animation = 'pulse 0.5s ease';
        }, 10);

        // Simulación de apertura de chat
        alert('💬 Chat de atención al cliente\n\nAquí se abriría la ventana del chatbot con integración a WhatsApp API o sistema de chat en vivo.');
    }

    // ============================================
    // 13. EFECTO HOVER EN CARDS (Reemplazado por VanillaTilt)
    // ============================================
    /* Desactivado manual porque ahora usamos la librería externa muchisimo mas fluida (VanillaTilt) arriba */


    // ============================================
    // 14. LAZY LOADING DE IMÁGENES
    // ============================================
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // ============================================
    // 15. ANIMACIÓN DE TEXTO GRADIENTE
    // ============================================
    const gradientTexts = document.querySelectorAll('.gradient-text, .gradient-text-light');

    gradientTexts.forEach(text => {
        text.addEventListener('mouseenter', () => {
            text.style.animation = 'gradientShift 2s ease infinite';
        });
    });

    // ============================================
    // 16. PREVENIR FLASH DE CONTENIDO SIN ESTILOS
    // ============================================
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    });

    // ============================================
    // 17. PERFORMANCE: THROTTLE SCROLL EVENTS
    // ============================================
    let ticking = false;

    function onScroll() {
        updateActiveNav();

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Aquí van las funciones que se ejecutan en scroll
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // ============================================
    // 18. MOBILE MENU (Para futura implementación)
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // ============================================
    // 19. CONSOLE MESSAGE (Easter Egg)
    // ============================================
    console.log('%c🏥 Clínica Maternidad La Floresta', 'color: #0066ff; font-size: 20px; font-weight: bold;');
    console.log('%cDesarrollado con ❤️ para brindar la mejor experiencia', 'color: #ff6b9d; font-size: 14px;');

    // ============================================
    // 20. INICIALIZACIÓN COMPLETA
    // ============================================
    console.log('✅ Todas las animaciones y efectos han sido inicializados correctamente');

});

// ============================================
// UTILIDADES ADICIONALES
// ============================================

// Función para detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Desactivar animaciones automáticas si el usuario lo prefiere
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Función para detectar el tipo de dispositivo
function isMobile() {
    return window.innerWidth <= 768;
}

// Optimización para móviles
if (isMobile()) {
    // Reducir efectos complejos en móviles para mejor rendimiento
    const particles = document.querySelector('.particles-background');
    if (particles) {
        particles.style.display = 'none';
    }
}

// ============================================
// CONTADOR EN VIVO DE BEBÉS NACIDOS HOY
// ============================================
const babiesTodayCounter = document.getElementById('babiesToday');
if (babiesTodayCounter) {
    // Simular contador en vivo (en producción esto vendría de una API)
    const targetCount = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5 bebés hoy
    let currentCount = 0;
    const duration = 2000; // 2 segundos
    const increment = targetCount / (duration / 16); // 60fps

    const updateCounter = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            babiesTodayCounter.textContent = Math.floor(currentCount);
            requestAnimationFrame(updateCounter);
        } else {
            babiesTodayCounter.textContent = targetCount;
        }
    };

    // Iniciar contador cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(babiesTodayCounter);
}

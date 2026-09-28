document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       LOADER
    ========================================= */

    setTimeout(function () {
        const loader = document.querySelector('.loader');

        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500);


    /* =========================================
       ELEMENTS
    ========================================= */

    const navbar = document.querySelector('.navbar');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const statNumbers = document.querySelectorAll('.stat-number');

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    const themeToggle = document.querySelector('.theme-toggle');


    /* =========================================
       THEME TOGGLE
    ========================================= */

    if (themeToggle) {

        const savedTheme = localStorage.getItem('theme') || 'dark';

        document.documentElement.setAttribute('data-theme', savedTheme);

        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {

            const currentTheme =
                document.documentElement.getAttribute('data-theme');

            const newTheme =
                currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute(
                'data-theme',
                newTheme
            );

            localStorage.setItem('theme', newTheme);

            updateThemeIcon(newTheme);
        });
    }


    function updateThemeIcon(theme) {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');

        if (!icon) return;

        if (theme === 'light') {

            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');

        } else {

            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }


    /* =========================================
       HERO TYPING EFFECT
    ========================================= */

    const titles = [
        'AI Engineer |',
        'Data Analyst |',
        'Android Developer |'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1500;

    const typingText = document.querySelector('.typing-text');


    function typeEffect() {

        if (!typingText) return;

        const currentTitle = titles[titleIndex];

        if (isDeleting) {

            typingText.textContent =
                currentTitle.substring(0, charIndex - 1);

            charIndex--;

        } else {

            typingText.textContent =
                currentTitle.substring(0, charIndex + 1);

            charIndex++;
        }


        let timer =
            isDeleting ? deletingSpeed : typingSpeed;


        if (!isDeleting &&
            charIndex === currentTitle.length) {

            timer = pauseTime;
            isDeleting = true;

        } else if (
            isDeleting &&
            charIndex === 0
        ) {

            isDeleting = false;

            titleIndex =
                (titleIndex + 1) % titles.length;

            timer = 500;
        }


        setTimeout(typeEffect, timer);
    }


    if (typingText) {
        typeEffect();
    }


    /* =========================================
       PARTICLE BACKGROUND
    ========================================= */

    const canvas = document.getElementById('particles');

    if (canvas) {

        const ctx = canvas.getContext('2d');

        let particles = [];


        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }


        function createParticles() {

            particles = [];

            const particleCount =
                Math.floor(
                    (canvas.width * canvas.height) / 15000
                );


            for (let i = 0; i < particleCount; i++) {

                particles.push({

                    x: Math.random() * canvas.width,

                    y: Math.random() * canvas.height,

                    radius: Math.random() * 2 + 0.5,

                    vx: (Math.random() - 0.5) * 0.5,

                    vy: (Math.random() - 0.5) * 0.5,

                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        }


        function drawParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            particles.forEach(p => {

                p.x += p.vx;
                p.y += p.vy;


                if (p.x < 0)
                    p.x = canvas.width;

                if (p.x > canvas.width)
                    p.x = 0;

                if (p.y < 0)
                    p.y = canvas.height;

                if (p.y > canvas.height)
                    p.y = 0;


                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(0, 212, 170, ${p.alpha})`;

                ctx.fill();
            });


            particles.forEach((p1, i) => {

                particles.slice(i + 1).forEach(p2 => {

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;

                    const dist =
                        Math.sqrt(dx * dx + dy * dy);


                    if (dist < 120) {

                        ctx.beginPath();

                        ctx.moveTo(
                            p1.x,
                            p1.y
                        );

                        ctx.lineTo(
                            p2.x,
                            p2.y
                        );


                        ctx.strokeStyle =
                            `rgba(0, 212, 170, ${
                                0.15 * (1 - dist / 120)
                            })`;

                        ctx.lineWidth = 0.5;

                        ctx.stroke();
                    }
                });
            });


            requestAnimationFrame(drawParticles);
        }


        resizeCanvas();
        createParticles();
        drawParticles();


        window.addEventListener('resize', () => {

            resizeCanvas();
            createParticles();
        });
    }


    /* =========================================
       SCROLL EVENTS
    ========================================= */

    window.addEventListener('scroll', function () {

        const scrollY = window.scrollY;


        /* Navbar */

        if (navbar) {

            if (scrollY > 50) {

                navbar.classList.add('scrolled');

            } else {

                navbar.classList.remove('scrolled');
            }
        }


        /* Scroll Progress */

        if (scrollProgressBar) {

            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;


            const scrolled =
                windowHeight > 0
                    ? (scrollY / windowHeight) * 100
                    : 0;


            scrollProgressBar.style.width =
                scrolled + '%';
        }


        /* Active Navigation */

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute('id');


            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove('active');


                    if (
                        link.getAttribute('href') ===
                        '#' + sectionId
                    ) {

                        link.classList.add('active');
                    }
                });
            }
        });


        /* Skill Animation */

        const skillsGrid =
            document.querySelector('.skills-grid');


        if (isInViewport(skillsGrid)) {

            skillBars.forEach(bar => {

                const width =
                    bar.getAttribute('data-width');

                if (width) {

                    bar.style.width =
                        width + '%';
                }
            });
        }


        /* Statistics */

        const aboutCard =
            document.querySelector('.about-card');


        if (isInViewport(aboutCard)) {

            animateStats();
        }
    });


    /* =========================================
       VIEWPORT CHECK
    ========================================= */

    function isInViewport(element) {

        if (!element) return false;

        const rect =
            element.getBoundingClientRect();


        return (
            rect.top <
            (window.innerHeight ||
                document.documentElement.clientHeight) &&

            rect.bottom > 0
        );
    }


    /* =========================================
       STATISTICS ANIMATION
    ========================================= */

    let statsAnimated = false;


    function animateStats() {

        if (statsAnimated) return;

        statsAnimated = true;


        statNumbers.forEach(stat => {

            const target =
                parseInt(
                    stat.getAttribute('data-target')
                );


            const duration = 2000;

            const increment =
                target / (duration / 16);

            let current = 0;


            const updateCount = () => {

                current += increment;


                if (current < target) {

                    stat.textContent =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCount
                    );

                } else {

                    stat.textContent =
                        target;
                }
            };


            updateCount();
        });
    }


    /* =========================================
       PROJECT FILTER
    ========================================= */

    filterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            filterBtns.forEach(b =>
                b.classList.remove('active')
            );


            btn.classList.add('active');


            const filter =
                btn.getAttribute('data-filter');


            projectCards.forEach(card => {

                const category =
                    card.getAttribute('data-category') || '';


                if (
                    filter === 'all' ||
                    category.includes(filter)
                ) {

                    card.style.display = 'block';


                    setTimeout(() => {

                        card.style.opacity = '1';

                        card.style.transform =
                            'translateY(0)';

                    }, 50);


                } else {

                    card.style.opacity = '0';

                    card.style.transform =
                        'translateY(20px)';


                    setTimeout(() => {

                        card.style.display = 'none';

                    }, 300);
                }
            });
        });
    });


    /* =========================================
       TECH STACK CATEGORY FILTER
       
       Categories:
       - languages
       - frontend
       - backend
       - database
       - ai
       - cloud
       - mobile
       - tools
    ========================================= */

    const techFilterBtns =
        document.querySelectorAll('.tech-filter-btn');

    const techItems =
        document.querySelectorAll('.tech-item');


    techFilterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            /* Remove active state */

            techFilterBtns.forEach(button => {
                button.classList.remove('active');
            });


            /* Activate selected category */

            btn.classList.add('active');


            const filter =
                btn.getAttribute('data-filter');


            techItems.forEach(item => {

                const category =
                    item.getAttribute('data-category') || '';


                if (
                    filter === 'all' ||
                    category.includes(filter)
                ) {

                    item.style.display = 'flex';


                    setTimeout(() => {

                        item.style.opacity = '1';

                        item.style.transform =
                            'translateY(0)';

                    }, 50);

                } else {

                    item.style.opacity = '0';

                    item.style.transform =
                        'translateY(15px)';


                    setTimeout(() => {

                        item.style.display = 'none';

                    }, 250);
                }
            });
        });
    });


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    if (hamburger && navLinksContainer) {

        hamburger.addEventListener('click', () => {

            hamburger.classList.toggle('active');

            navLinksContainer.classList.toggle('active');
        });


        navLinks.forEach(link => {

            link.addEventListener('click', () => {

                hamburger.classList.remove('active');

                navLinksContainer.classList.remove('active');
            });
        });
    }


    /* =========================================
       INTERSECTION OBSERVER
    ========================================= */

    const observerOptions = {

        threshold: 0.1,

        rootMargin:
            '0px 0px -50px 0px'
    };


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            '1';

                        entry.target.style.transform =
                            'translateY(0)';
                    }
                });

            },
            observerOptions
        );


    document
        .querySelectorAll('.glass-card')
        .forEach((card, index) => {

            card.style.opacity = '0';

            card.style.transform =
                'translateY(30px)';

            card.style.transition =
                'all 0.6s ease ' +
                (index * 0.1) +
                's';


            observer.observe(card);
        });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener('click', function (e) {

                e.preventDefault();


                const target =
                    document.querySelector(
                        this.getAttribute('href')
                    );


                if (target) {

                    target.scrollIntoView({

                        behavior: 'smooth',

                        block: 'start'
                    });
                }
            });
        });


    /* =========================================
       HERO ANIMATION
    ========================================= */

    const heroContent =
        document.querySelector('.hero-content');

    const heroImage =
        document.querySelector('.hero-image');


    if (heroContent) {

        heroContent.style.opacity = '0';

        heroContent.style.transform =
            'translateX(-50px)';

        heroContent.style.transition =
            'all 1s ease';


        setTimeout(() => {

            heroContent.style.opacity = '1';

            heroContent.style.transform =
                'translateX(0)';

        }, 300);
    }


    if (heroImage) {

        heroImage.style.opacity = '0';

        heroImage.style.transform =
            'translateX(50px)';

        heroImage.style.transition =
            'all 1s ease';


        setTimeout(() => {

            heroImage.style.opacity = '1';

            heroImage.style.transform =
                'translateX(0)';

        }, 600);
    }


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener('keydown', function (e) {

        if (e.key === 'Escape') {

            if (hamburger) {
                hamburger.classList.remove('active');
            }

            if (navLinksContainer) {
                navLinksContainer.classList.remove('active');
            }
        }
    });

});

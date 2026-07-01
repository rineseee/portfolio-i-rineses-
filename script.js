/* ========================================
   PORTFOLIO SCRIPT
   Clean, consolidated, performant
   ======================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================================
   THEME MANAGER
   ======================================== */
(function initTheme() {
    const STORAGE_KEY = 'portfolio-theme';
    const html = document.documentElement;
    const toggle = document.getElementById('theme-toggle');

    const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
    html.setAttribute('data-theme', saved);
    if (toggle) toggle.setAttribute('aria-pressed', saved === 'light' ? 'true' : 'false');

    if (toggle) {
        toggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem(STORAGE_KEY, next);
            toggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
})();

/* ========================================
   MOBILE MENU
   ======================================== */
(function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('show');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
})();

/* ========================================
   CONSOLIDATED SCROLL HANDLER
   Single RAF loop for all scroll effects
   ======================================== */
(function initScrollHandlers() {
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    if (prefersReducedMotion) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;

            // Header blur state
            if (header) header.classList.toggle('scrolled', scrollY > 50);

            // Subtle parallax on hero (skip for reduced motion)
            if (heroContent && !prefersReducedMotion && scrollY < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
            }

            // Active nav link detection
            const scrollPos = scrollY + 100;
            sections.forEach(section => {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
                    });
                }
            });

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ========================================
   SMOOTH SCROLL ON NAV CLICKS
   ======================================== */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
})();

/* ========================================
   SECTION & CARD REVEAL ON SCROLL
   Single IntersectionObserver for both
   ======================================== */
(function initRevealAnimations() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            if (!prefersReducedMotion) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('section').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    document.querySelectorAll('.card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
})();

/* ========================================
   STAGGER ANIMATION FOR LIST ITEMS
   ======================================== */
(function initStagger() {
    document.querySelectorAll('.card-container, .skill-list').forEach(container => {
        container.querySelectorAll('li, .card').forEach((item, i) => {
            item.style.animationDelay = `${i * 0.1}s`;
        });
    });
})();

/* ========================================
   FLOATING BACKGROUND ICONS
   Uses DocumentFragment for performance
   ======================================== */
(function initFloatingIcons() {
    const servicesIcons = ['</>', '{ }', '#', '<>', '()', '&&', '!==', 'let', 'const', 'import', 'return', 'class', '[ ]', '=>{}'];
    const skillsIcons = ['</>', '{}', '#', '()', '<>', '!==', 'let', 'const', 'import', 'sql', '&&', 'api', 'auth'];

    function createIcons(selector, iconList, count, durationBase, sizeMin, sizeRange) {
        const container = document.querySelector(selector);
        if (!container) return;

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.textContent = iconList[i % iconList.length];
            span.style.top = (Math.random() * 100).toFixed(1) + '%';
            span.style.left = (Math.random() * 100).toFixed(1) + '%';
            span.style.animationDuration = (durationBase + Math.random() * durationBase).toFixed(1) + 's';
            span.style.fontSize = (sizeMin + Math.random() * sizeRange).toFixed(2) + 'rem';
            span.setAttribute('aria-hidden', 'true');
            fragment.appendChild(span);
        }
        container.appendChild(fragment);
    }

    createIcons('.floating-icons-services', servicesIcons, 15, 8, 1.5, 2);
    createIcons('.floating-icons-skills', skillsIcons, 18, 6, 1.5, 1.5);
})();

/* ========================================
   CARD 3D TILT EFFECT
   ======================================== */
(function initCardTilt() {
    if (prefersReducedMotion) return;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${y * 0.02}deg) rotateY(${-x * 0.02}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
})();

/* ========================================
   ABOUT IMAGE 3D HOVER
   ======================================== */
(function initImageHover() {
    if (prefersReducedMotion) return;

    const img = document.querySelector('.about-image img');
    if (!img) return;

    img.parentElement.style.perspective = '1000px';
    img.addEventListener('mousemove', e => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        img.style.transform = `scale(1.05) rotateX(${y * 0.1}deg) rotateY(${-x * 0.1}deg)`;
    });
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });
})();

/* ========================================
   BUTTON RIPPLE EFFECT
   ======================================== */
(function initRipple() {
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple-anim{0%{width:0;height:0;opacity:1}100%{width:400px;height:400px;opacity:0}}';
    document.head.appendChild(style);

    document.querySelectorAll('.btn, .project-btn, .social-links a').forEach(btn => {
        btn.addEventListener('click', e => {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            Object.assign(ripple.style, {
                position: 'absolute',
                left: (e.clientX - rect.left) + 'px',
                top: (e.clientY - rect.top) + 'px',
                width: '0', height: '0',
                background: 'rgba(255,255,255,0.45)',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(-50%,-50%)',
                animation: 'ripple-anim 0.6s ease-out'
            });
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 620);
        });
    });
})();

/* ========================================
   TOUCH FEEDBACK
   ======================================== */
(function initTouchFeedback() {
    document.querySelectorAll('.card, .skill-list li, .btn').forEach(el => {
        el.addEventListener('touchstart', () => { el.style.transform = 'scale(0.98)'; }, { passive: true });
        el.addEventListener('touchend', () => { el.style.transform = ''; }, { passive: true });
    });
})();

/* ========================================
   PAGE TITLE ATTENTION TRICK
   ======================================== */
(function initTitleBehavior() {
    const title = document.title;
    window.addEventListener('blur', () => { document.title = '👋 Come back...'; });
    window.addEventListener('focus', () => { document.title = title; });
})();

/* ========================================
   CONTACT FORM — mailto
   ======================================== */
(function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name    = document.getElementById('cf-name').value.trim();
        const subject = document.getElementById('cf-subject').value.trim();
        const message = document.getElementById('cf-message').value.trim();

        if (!name || !subject || !message) return;

        const body = `Hi Rinesa,\n\n${message}\n\nBest regards,\n${name}`;
        const mailto = `mailto:rineskraasniqi@gmail.com`
            + `?subject=${encodeURIComponent(subject)}`
            + `&body=${encodeURIComponent(body)}`;

        window.location.href = mailto;
    });
})();

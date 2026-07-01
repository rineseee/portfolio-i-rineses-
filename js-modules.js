/* ========================================
   JAVASCRIPT MODULES
   Refactored from monolithic script.js
   ======================================== */

// ===== THEME MODULE =====
class ThemeManager {
  constructor(toggleSelector, storageKey = 'portfolio-theme') {
    this.toggle = document.querySelector(toggleSelector);
    this.storageKey = storageKey;
    this.DARK_THEME = 'dark';
    this.LIGHT_THEME = 'light';

    if (this.toggle) {
      this.init();
    }
  }

  init() {
    this.initTheme();
    this.toggle.addEventListener('click', () => this.toggleTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME, false);
      }
    });
  }

  initTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? this.DARK_THEME : this.DARK_THEME);
    this.setTheme(theme, false);
  }

  setTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME;
    this.setTheme(newTheme);
  }

  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || this.DARK_THEME;
  }
}

// ===== NAVIGATION MODULE =====
class NavigationManager {
  constructor(navLinksSelector, menuToggleSelector, sectionSelector) {
    this.navLinks = document.querySelectorAll(navLinksSelector + ' a');
    this.navLinksContainer = document.querySelector(navLinksSelector);
    this.menuToggle = document.querySelector(menuToggleSelector);
    this.sections = document.querySelectorAll(sectionSelector);

    if (this.navLinks.length > 0) {
      this.init();
    }
  }

  init() {
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    // Navigation link clicks
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          this.navigateTo(href);
          this.closeMenu();
        }
      });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => this.updateActiveLink());
    this.updateActiveLink();
  }

  toggleMenu() {
    if (this.navLinksContainer) {
      this.navLinksContainer.classList.toggle('show');
    }
  }

  closeMenu() {
    if (this.navLinksContainer) {
      this.navLinksContainer.classList.remove('show');
    }
  }

  navigateTo(target) {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  updateActiveLink() {
    const scrollPosition = window.pageYOffset + 100;

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        this.navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// ===== SCROLL MODULE =====
class ScrollManager {
  constructor(headerSelector, backToTopSelector, config = {}) {
    this.header = document.querySelector(headerSelector);
    this.backToTopBtn = document.querySelector(backToTopSelector);
    this.config = {
      scrollThreshold: config.scrollThreshold || 50,
      backToTopThreshold: config.backToTopThreshold || 300,
    };

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    if (this.backToTopBtn) {
      this.backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToTop();
      });
    }
  }

  handleScroll() {
    const scrollPos = window.pageYOffset;

    // Update header state
    if (this.header) {
      if (scrollPos > this.config.scrollThreshold) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }

    // Update back-to-top visibility
    if (this.backToTopBtn) {
      if (scrollPos > this.config.backToTopThreshold) {
        this.backToTopBtn.classList.add('show');
      } else {
        this.backToTopBtn.classList.remove('show');
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getScrollPosition() {
    return window.pageYOffset;
  }
}

// ===== SECTION REVEAL MODULE =====
class SectionRevealManager {
  constructor(sectionSelector, cardSelector, config = {}) {
    this.sections = document.querySelectorAll(sectionSelector);
    this.cards = document.querySelectorAll(cardSelector);
    this.config = {
      threshold: config.threshold || 0.15,
      rootMargin: config.rootMargin || '0px 0px -100px 0px',
    };

    this.init();
  }

  init() {
    const observerOptions = {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections and cards
    this.sections.forEach((section) => {
      section.style.opacity = '0';
      observer.observe(section);
    });

    this.cards.forEach((card) => {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }
}

// ===== FLOATING ICONS MODULE =====
class FloatingIconsManager {
  constructor(containerSelector, iconList, count = 20, config = {}) {
    this.container = document.querySelector(containerSelector);
    this.iconList = iconList;
    this.count = count;
    this.config = config;

    if (this.container) {
      this.init();
    }
  }

  init() {
    for (let i = 0; i < this.count; i++) {
      const span = document.createElement('span');
      span.textContent = this.iconList[Math.floor(Math.random() * this.iconList.length)];
      span.style.top = Math.random() * 100 + '%';
      span.style.left = Math.random() * 100 + '%';
      span.style.animationDuration = (this.config.minDuration || 8) + Math.random() * (this.config.maxDuration || 8) + 's';
      span.style.fontSize = (this.config.minSize || 1.5) + Math.random() * (this.config.maxSize || 2) + 'rem';

      this.container.appendChild(span);
    }
  }
}

// ===== PARALLAX MODULE =====
class ParallaxManager {
  constructor(elementSelector, speed = 0.5) {
    this.element = document.querySelector(elementSelector);
    this.speed = speed;

    if (this.element) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.update(), { passive: true });
  }

  update() {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      this.element.style.transform = `translateY(${scrolled * this.speed}px)`;
    }
  }
}

// ===== IMAGE HOVER 3D MODULE =====
class ImageHover3DManager {
  constructor(imageSelector) {
    this.image = document.querySelector(imageSelector);

    if (this.image) {
      this.init();
    }
  }

  init() {
    const container = this.image.parentElement;
    container.style.perspective = '1000px';

    this.image.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.image.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  onMouseMove(e) {
    const rect = this.image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) * 0.1;
    const rotateY = (centerX - x) * 0.1;

    this.image.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave() {
    this.image.style.transform = 'scale(1) rotateX(0) rotateY(0)';
  }
}

// ===== CARD TILT MODULE =====
class CardTiltManager {
  constructor(cardSelector) {
    this.cards = document.querySelectorAll(cardSelector);

    this.cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.onMouseLeave(card));
    });
  }

  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) * 0.02;
    const rotateY = (centerX - x) * 0.02;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  }
}

// Export modules
if (typeof window !== 'undefined') {
  window.Modules = {
    ThemeManager,
    NavigationManager,
    ScrollManager,
    SectionRevealManager,
    FloatingIconsManager,
    ParallaxManager,
    ImageHover3DManager,
    CardTiltManager,
  };
}

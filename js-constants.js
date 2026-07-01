/* ========================================
   APPLICATION CONSTANTS
   Configuration and constants in one place
   ======================================== */

const APP_CONFIG = {
  // Timing Configuration
  TIMING: {
    FAST: 150,
    BASE: 300,
    SLOW: 500,
  },

  // Scroll Configuration
  SCROLL: {
    STICKY_THRESHOLD: 50,
    REVEAL_THRESHOLD: 0.15,
    REVEAL_MARGIN: '0px 0px -100px 0px',
    PARALLAX_SPEED: 0.5,
  },

  // Responsive Breakpoints
  BREAKPOINTS: {
    TABLET: 768,
    MOBILE: 480,
    SMALL_MOBILE: 320,
  },

  // Storage Keys
  STORAGE: {
    THEME_KEY: 'portfolio-theme',
  },

  // Theme Settings
  THEME: {
    DARK: 'dark',
    LIGHT: 'light',
    DEFAULT: 'dark',
  },

  // Animation Configuration
  ANIMATION: {
    STAGGER_BASE: 0.1,
    FLOAT_DURATION: 20,
    RIPPLE_DURATION: 600,
  },

  // Z-Index Hierarchy
  Z_INDEX: {
    HIDE: -1,
    AUTO: 0,
    BASE: 1,
    DROPDOWN: 10,
    STICKY: 20,
    FIXED: 30,
    MODAL_BACKDROP: 40,
    MODAL: 50,
    TOOLTIP: 70,
    NOTIFICATION: 80,
  },

  // Selectors
  SELECTORS: {
    HEADER: '.header',
    MENU_TOGGLE: '#menu-toggle',
    NAV_LINKS: '.nav-links',
    THEME_TOGGLE: '#theme-toggle',
    CARDS: '.card',
    SKILL_ITEMS: '.skill-list li',
    SECTIONS: 'section[id]',
    BACK_TO_TOP: '.back-to-top',
    ABOUT_IMAGE: '.about-image img',
    FLOATING_ICONS_SERVICES: '.floating-icons-services',
    FLOATING_ICONS_SKILLS: '.floating-icons-skills',
  },

  // Icon Configuration
  ICONS: {
    CODE: ['</>', '{ }', '#', '<>', '()', '&&', '!==', 'let', 'const', 'import', 'return', 'class', '[ ]', '=>{}'],
    SKILLS: ['</>', '{}', '#', '()', '<>', '!==', 'let', 'const', 'import', 'sql', '&&', 'api', 'auth'],
    ICONS_COUNT: {
      SERVICES: 20,
      SKILLS: 25,
    },
  },

  // Transition Durations
  TRANSITIONS: {
    THEME_CHANGE: 300,
    SCROLL_BLUR: 50,
    HEADER_STATE: 300,
  },

  // Observer Options
  OBSERVERS: {
    SECTION_REVEAL: {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    },
    FLOATING_ICON: {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    },
  },

  // Animation Delays (in milliseconds)
  ANIMATION_DELAYS: {
    STAGGER_INCREMENT: 100,
    STAGGER_VALUES: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
  },
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}

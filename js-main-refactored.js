/* ========================================
   REFACTORED MAIN APPLICATION FILE
   Clean, modular initialization
   Uses modules and utilities
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  initializeApplication();
});

function initializeApplication() {
  // 1. Theme Management
  const theme = new window.Modules.ThemeManager(
    '#theme-toggle',
    'portfolio-theme'
  );

  // 2. Navigation Management
  const navigation = new window.Modules.NavigationManager(
    '.nav-links',
    '#menu-toggle',
    'section[id]'
  );

  // 3. Scroll Management
  const scroll = new window.Modules.ScrollManager(
    '.header',
    '.back-to-top',
    {
      scrollThreshold: 50,
      backToTopThreshold: 300,
    }
  );

  // 4. Section Reveal Animations
  const sectionReveal = new window.Modules.SectionRevealManager(
    'section',
    '.card',
    {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  // 5. Floating Icons - Services
  const floatingIconsServices = new window.Modules.FloatingIconsManager(
    '.floating-icons-services',
    ['</>', '{ }', '#', '<>', '()', '&&', '!==', 'let', 'const', 'import', 'return', 'class', '[ ]', '=>{}'],
    20,
    {
      minDuration: 8,
      maxDuration: 8,
      minSize: 1.5,
      maxSize: 2,
    }
  );

  // 6. Floating Icons - Skills
  const floatingIconsSkills = new window.Modules.FloatingIconsManager(
    '.floating-icons-skills',
    ['</>', '{}', '#', '()', '<>', '!==', 'let', 'const', 'import', 'sql', '&&', 'api', 'auth'],
    25,
    {
      minDuration: 6,
      maxDuration: 6,
      minSize: 1.5,
      maxSize: 1.5,
    }
  );

  // 7. Parallax Scroll Effect
  const parallax = new window.Modules.ParallaxManager(
    '.hero-content',
    0.5
  );

  // 8. About Image 3D Effect
  const imageHover = new window.Modules.ImageHover3DManager(
    '.about-image img'
  );

  // 9. Card Tilt Effects
  const cardTilt = new window.Modules.CardTiltManager('.card');

  // 10. Click Ripple Effects
  initializeRippleEffects();

  // 11. Reduced Motion Support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // Store managers globally for debugging
  if (process.env.DEBUG) {
    window.app = {
      theme,
      navigation,
      scroll,
      sectionReveal,
      floatingIconsServices,
      floatingIconsSkills,
      parallax,
      imageHover,
      cardTilt,
    };
  }
}

/**
 * Initialize click ripple effects for buttons
 */
function initializeRippleEffects() {
  const buttons = document.querySelectorAll('.btn, .project-btn, .social-links a');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.background = 'rgba(255, 255, 255, 0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';

      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Ripple animation keyframes
 * Note: Make sure this is in your CSS
 */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-animation {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 400px;
      height: 400px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeApplication };
}

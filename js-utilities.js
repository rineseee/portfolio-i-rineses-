/* ========================================
   UTILITY FUNCTIONS
   Reusable helper functions for common operations
   ======================================== */

// ===== DOM UTILITIES =====
const DOM = {
  /**
   * Query single element
   * @param {string} selector - CSS selector
   * @returns {Element|null}
   */
  query: (selector) => document.querySelector(selector),

  /**
   * Query all elements
   * @param {string} selector - CSS selector
   * @returns {NodeList}
   */
  queryAll: (selector) => document.querySelectorAll(selector),

  /**
   * Add class to element
   * @param {Element} el - Target element
   * @param {string} className - Class name
   */
  addClass: (el, className) => {
    if (el) el.classList.add(className);
  },

  /**
   * Remove class from element
   * @param {Element} el - Target element
   * @param {string} className - Class name
   */
  removeClass: (el, className) => {
    if (el) el.classList.remove(className);
  },

  /**
   * Toggle class on element
   * @param {Element} el - Target element
   * @param {string} className - Class name
   * @returns {boolean} - Whether class is now present
   */
  toggle: (el, className) => {
    return el ? el.classList.toggle(className) : false;
  },

  /**
   * Check if element has class
   * @param {Element} el - Target element
   * @param {string} className - Class name
   * @returns {boolean}
   */
  hasClass: (el, className) => {
    return el ? el.classList.contains(className) : false;
  },

  /**
   * Set or get attribute
   * @param {Element} el - Target element
   * @param {string} attr - Attribute name
   * @param {string} value - Attribute value (optional)
   * @returns {string|undefined}
   */
  attr: (el, attr, value = undefined) => {
    if (!el) return undefined;
    if (value === undefined) return el.getAttribute(attr);
    el.setAttribute(attr, value);
  },
};

// ===== EVENT UTILITIES =====
const Events = {
  /**
   * Debounce function execution
   * @param {Function} fn - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function}
   */
  debounce: (fn, delay = 300) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        fn(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  },

  /**
   * Throttle function execution
   * @param {Function} fn - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function}
   */
  throttle: (fn, limit = 300) => {
    let inThrottle;
    return function throttledFunction(...args) {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  },

  /**
   * Execute function only once
   * @param {Function} fn - Function to execute once
   * @returns {Function}
   */
  once: (fn) => {
    let executed = false;
    return function onceFunction(...args) {
      if (!executed) {
        fn(...args);
        executed = true;
      }
    };
  },

  /**
   * Add event listener with delegation
   * @param {Element} parent - Parent element
   * @param {string} eventType - Event type
   * @param {string} selector - Target selector
   * @param {Function} handler - Event handler
   */
  delegate: (parent, eventType, selector, handler) => {
    parent.addEventListener(eventType, (e) => {
      if (e.target.matches(selector)) {
        handler.call(e.target, e);
      }
    });
  },

  /**
   * Safe event listener with optional handler
   * @param {Element} el - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  on: (el, event, handler) => {
    if (el) el.addEventListener(event, handler);
  },

  /**
   * Remove event listener
   * @param {Element} el - Target element
   * @param {string} event - Event type
   * @param {Function} handler - Event handler
   */
  off: (el, event, handler) => {
    if (el) el.removeEventListener(event, handler);
  },
};

// ===== ANIMATION UTILITIES =====
const Animation = {
  /**
   * Check if animations should be reduced
   * @returns {boolean}
   */
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Request animation frame with polyfill
   * @param {Function} callback - Animation callback
   * @returns {number}
   */
  requestFrame: (callback) => {
    return window.requestAnimationFrame(callback);
  },

  /**
   * Cancel animation frame
   * @param {number} id - Animation frame ID
   */
  cancelFrame: (id) => {
    window.cancelAnimationFrame(id);
  },

  /**
   * Get computed animation duration
   * @param {Element} el - Target element
   * @returns {number} - Duration in milliseconds
   */
  getDuration: (el) => {
    const computed = window.getComputedStyle(el);
    const duration = computed.animationDuration;
    return parseFloat(duration) * 1000;
  },
};

// ===== SCROLL UTILITIES =====
const Scroll = {
  /**
   * Get current scroll position
   * @returns {number}
   */
  getPosition: () => {
    return window.pageYOffset || document.documentElement.scrollTop;
  },

  /**
   * Smooth scroll to element
   * @param {string|Element} target - Target selector or element
   * @param {number} duration - Duration in milliseconds
   */
  smoothTo: (target, duration = 300) => {
    const element = typeof target === 'string' ? DOM.query(target) : target;
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth' });
  },

  /**
   * Scroll to top
   * @param {number} duration - Duration in milliseconds
   */
  toTop: (duration = 300) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /**
   * Check if element is in viewport
   * @param {Element} el - Target element
   * @param {number} offset - Offset in pixels
   * @returns {boolean}
   */
  isInViewport: (el, offset = 0) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight - offset) &&
      rect.bottom >= offset
    );
  },

  /**
   * Get distance from top of viewport
   * @param {Element} el - Target element
   * @returns {number}
   */
  getDistanceFromTop: (el) => {
    return el.getBoundingClientRect().top;
  },
};

// ===== STORAGE UTILITIES =====
const Storage = {
  /**
   * Get value from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value
   * @returns {any}
   */
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  /**
   * Set value in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  /**
   * Remove value from localStorage
   * @param {string} key - Storage key
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Storage error:', e);
    }
  },
};

// ===== MATH UTILITIES =====
const Math = {
  /**
   * Clamp value between min and max
   * @param {number} value - Value to clamp
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number}
   */
  clamp: (value, min, max) => {
    return Math.max(min, Math.min(max, value));
  },

  /**
   * Linear interpolation
   * @param {number} a - Start value
   * @param {number} b - End value
   * @param {number} t - Time (0-1)
   * @returns {number}
   */
  lerp: (a, b, t) => {
    return a + (b - a) * t;
  },

  /**
   * Map value from one range to another
   * @param {number} value - Value to map
   * @param {number} inMin - Input min
   * @param {number} inMax - Input max
   * @param {number} outMin - Output min
   * @param {number} outMax - Output max
   * @returns {number}
   */
  map: (value, inMin, inMax, outMin, outMax) => {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  },
};

// ===== TIME UTILITIES =====
const Time = {
  /**
   * Sleep/wait for specified milliseconds
   * @param {number} ms - Milliseconds to wait
   * @returns {Promise}
   */
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Get current timestamp
   * @returns {number}
   */
  now: () => {
    return Date.now();
  },

  /**
   * Format milliseconds to readable time
   * @param {number} ms - Milliseconds
   * @returns {string}
   */
  format: (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${seconds % 60}s`;
  },
};

// Export utilities
if (typeof window !== 'undefined') {
  window.Utils = {
    DOM,
    Events,
    Animation,
    Scroll,
    Storage,
    Math,
    Time,
  };
}

// ========================================
// THEME SWITCHER — Light / Dark Mode
// View Transitions API + Circular Reveal
// ========================================

const STORAGE_KEY = 'portfolio-theme';
const REVEAL_DURATION = 550;
const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let isTransitioning = false;
let iconAnimationTimer = null;

function getStoredTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function getPreferredTheme() {
  const saved = getStoredTheme();
  if (saved) return saved;
  return colorSchemeQuery.matches ? 'light' : 'dark';
}

function getThemeToggleLabel(theme) {
  const isIndonesian = document.documentElement.lang === 'id';
  if (isIndonesian) {
    return theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap';
  }

  return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
}

function syncToggleState(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.setAttribute('aria-pressed', String(theme === 'light'));
  toggle.setAttribute('aria-label', getThemeToggleLabel(theme));
}

function applyTheme(theme, { persist = true } = {}) {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    localStorage.setItem(STORAGE_KEY, theme);
  }
  syncToggleState(theme);
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

function triggerToggleIconAnimation(toggle) {
  if (!toggle) return;

  toggle.classList.remove('is-animating');
  if (iconAnimationTimer) {
    window.clearTimeout(iconAnimationTimer);
  }

  // Force reflow so consecutive clicks can replay the animation.
  toggle.offsetWidth;
  toggle.classList.add('is-animating');
  iconAnimationTimer = window.setTimeout(() => {
    toggle.classList.remove('is-animating');
  }, REVEAL_DURATION);
}

function resolveRevealOrigin(event) {
  if (typeof event?.clientX === 'number' && typeof event?.clientY === 'number') {
    return { x: event.clientX, y: event.clientY };
  }

  const fallbackTarget =
    event?.currentTarget instanceof Element
      ? event.currentTarget
      : document.getElementById('theme-toggle');

  if (fallbackTarget) {
    const rect = fallbackTarget.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  return {
    x: window.innerWidth - 32,
    y: 32,
  };
}

function getRevealRadius(x, y) {
  return Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
}

function captureRevealPalette() {
  const styles = getComputedStyle(document.documentElement);
  const paletteKeys = [
    'bg-primary',
    'bg-secondary',
    'bg-card',
    'bg-card-rgb',
    'accent-rgb',
    'green-rgb',
    'border-rgb',
    'text-muted-rgb',
  ];

  return paletteKeys.reduce((palette, key) => {
    palette[key] = styles.getPropertyValue(`--${key}`).trim();
    return palette;
  }, {});
}

function createRevealOverlay(palette, x, y, radius) {
  const overlay = document.createElement('div');
  overlay.className = 'theme-reveal-overlay';

  Object.entries(palette).forEach(([key, value]) => {
    overlay.style.setProperty(`--overlay-${key}`, value);
  });

  overlay.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
  return overlay;
}

async function runFallbackReveal(nextTheme, x, y) {
  const radius = getRevealRadius(x, y);
  const palette = captureRevealPalette();
  const overlay = createRevealOverlay(palette, x, y, radius);

  document.body.appendChild(overlay);
  overlay.getBoundingClientRect();

  applyTheme(nextTheme);

  try {
    const animation = overlay.animate(
      {
        clipPath: [
          `circle(${radius}px at ${x}px ${y}px)`,
          `circle(0px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: REVEAL_DURATION,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      }
    );

    await animation.finished;
  } catch {
    // If clip-path animation fails, at least keep the theme switch functional.
  } finally {
    overlay.remove();
  }
}

/**
 * Toggle with View Transitions API circular reveal.
 * Falls back to instant switch if API not supported.
 */
async function toggleWithReveal(event) {
  if (isTransitioning) return;

  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  const toggle = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
  const { x, y } = resolveRevealOrigin(event);

  triggerToggleIconAnimation(toggle);

  if (reducedMotionQuery.matches) {
    applyTheme(next);
    return;
  }

  isTransitioning = true;

  try {
    if (document.startViewTransition) {
      const endRadius = getRevealRadius(x, y);
      const transition = document.startViewTransition(() => {
        applyTheme(next);
      });

      await transition.ready;

      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: REVEAL_DURATION,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );

      await animation.finished;
      return;
    }

    await runFallbackReveal(next, x, y);
  } catch {
    await runFallbackReveal(next, x, y);
  } finally {
    isTransitioning = false;
  }
}

export function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Apply saved / OS preference on load (no animation)
  const savedTheme = getStoredTheme();
  const initial = savedTheme || getPreferredTheme();
  applyTheme(initial, { persist: Boolean(savedTheme) });

  // Click handler with circular reveal
  toggle.addEventListener('click', toggleWithReveal);

  // Listen for OS theme changes
  const handleColorSchemeChange = (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark', { persist: false });
    }
  };

  if (typeof colorSchemeQuery.addEventListener === 'function') {
    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
  } else {
    colorSchemeQuery.addListener(handleColorSchemeChange);
  }

  window.addEventListener('languagechange', () => {
    syncToggleState(getCurrentTheme());
  });
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

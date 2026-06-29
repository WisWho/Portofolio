// ========================================
// THEME SWITCHER Light / Dark Mode
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



/**
 * Toggle theme with a soft CSS fade to avoid lag from View Transitions on heavy pages.
 */
function toggleWithReveal(event) {
  if (isTransitioning) return;

  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  const toggle = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;

  triggerToggleIconAnimation(toggle);

  isTransitioning = true;
  
  // Add class to enable CSS transitions
  document.documentElement.classList.add('theme-transitioning');
  
  applyTheme(next);
  
  // Remove transition class after fade completes (400ms)
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
    isTransitioning = false;
  }, 400);
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

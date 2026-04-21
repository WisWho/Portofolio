// ========================================
// ANIMATIONS & INTERACTIONS
// ========================================

let typingTimeoutId = null;
let activeTypingSession = 0;

// Typing animation for hero text
export function initTypingAnimation(elementId, texts, speed = 80, deleteSpeed = 40, pauseTime = 2000) {
  const element = document.getElementById(elementId);
  if (!element || !texts.length) return;

  if (typingTimeoutId) {
    window.clearTimeout(typingTimeoutId);
  }

  const sessionId = ++activeTypingSession;
  element.textContent = '';

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (sessionId !== activeTypingSession) return;

    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let timeout = isDeleting ? deleteSpeed : speed;

    if (!isDeleting && charIndex === currentText.length) {
      timeout = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      timeout = 500;
    }

    typingTimeoutId = window.setTimeout(type, timeout);
  }

  type();
}

// Scroll-triggered fade-in animations
export function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // For staggered card animations
        if (entry.target.classList.contains('project-card') || 
            entry.target.classList.contains('skill-category')) {
          entry.target.classList.add('animate-in');
        }
      }
    });
  }, observerOptions);

  // Apply to sections
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Apply to project cards with staggered delay
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Apply to skill categories with staggered delay
  document.querySelectorAll('.skill-category').forEach((cat, index) => {
    cat.style.transitionDelay = `${index * 0.08}s`;
    observer.observe(cat);
  });
}

// Loading screen animation
export function initLoadingScreen() {
  return new Promise((resolve) => {
    const lines = [
      document.getElementById('load-line-1'),
      document.getElementById('load-line-2'),
      document.getElementById('load-line-3'),
      document.getElementById('load-line-4'),
    ];

    let delay = 400;
    lines.forEach((line, i) => {
      if (line) {
        setTimeout(() => {
          line.classList.add('visible');
        }, delay + i * 500);
      }
    });

    // Fade out loading screen
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          resolve();
        }, 600);
      } else {
        resolve();
      }
    }, delay + lines.length * 500 + 800);
  });
}

// Active nav link updater on scroll
export function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('.section, .hero-section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
          // Hero maps to home
          if (id === 'hero') {
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
              }
            });
          }
        }
      });
    },
    {
      rootMargin: '-30% 0px -70% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Navbar scroll effect and hide/show
export function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  });
}

// Mobile nav toggle
export function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (!toggle || !links) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function closeNav() {
    toggle.classList.remove('active');
    links.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.contains('active');
    if (isActive) {
      closeNav();
    } else {
      toggle.classList.add('active');
      links.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  overlay.addEventListener('click', closeNav);

  // Close nav on link click
  links.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

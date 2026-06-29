// ========================================
// MAIN ENTRY POINT
// ========================================

import Lenis from 'lenis';
import { initHero3D } from './hero3d.js';
import { getProjects } from './projects.js';
import {
  initTypingAnimation,
  initScrollAnimations,
  initLoadingScreen,
  initActiveNavOnScroll,
  initNavbarScroll,
  initMobileNav,
} from './animations.js';
import { getCopy, getCurrentLanguage, getSkillCategoryLabels, getTypingTexts, applyStaticTranslations, initLanguageToggle } from './i18n.js';
import { initThemeToggle } from './theme.js';
import { certificatesData } from './certificates.js';

// ---- Skill Data with Icons (using devicon CDN) ----
const baseSkillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
      // { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    ],
  },
  {
    name: 'Tools & OS',
    skills: [
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      // { name: 'CLI / Terminal', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      // { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      {name:'github', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'},
      // {name:'npm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original.svg'},
      // {name:'yarn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg'},
      {name:'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'},
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
];



// ---- Skills Tab Switching ----
window.switchSkillTab = function (tabId) {
  const btnSkills = document.getElementById('tab-btn-skills');
  const btnCerts = document.getElementById('tab-btn-certs');
  const gridSkills = document.getElementById('skills-grid');
  const gridCerts = document.getElementById('certs-grid');

  if (!btnSkills || !btnCerts || !gridSkills || !gridCerts) return;

  const currentTab = btnSkills.classList.contains('active') ? 'skills' : 'certs';
  if (currentTab === tabId) return; // Already active

  const outGrid = currentTab === 'skills' ? gridSkills : gridCerts;
  const inGrid = tabId === 'skills' ? gridSkills : gridCerts;

  // Toggle button styles immediately
  if (tabId === 'skills') {
    btnSkills.classList.add('active');
    btnCerts.classList.remove('active');
  } else {
    btnCerts.classList.add('active');
    btnSkills.classList.remove('active');
  }

  // Animate Out
  outGrid.classList.remove('active-tab');
  outGrid.classList.add('fade-out-tab');

  // Wait for fade out to complete, then display block the next one
  setTimeout(() => {
    outGrid.style.display = 'none';
    outGrid.classList.remove('fade-out-tab');

    inGrid.style.display = 'grid'; // Need to be grid before fading in
    
    // Force reflow
    void inGrid.offsetWidth;

    // Animate In
    inGrid.classList.add('active-tab');
  }, 250); // Matches the 0.25s CSS transition
};

// ---- Certificate Modal ----
window.openCertModal = function (imgSrc) {
  if (!imgSrc) return;
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-image');
  if (modal && modalImg) {
    modalImg.src = imgSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeCertModal = function () {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const LANGUAGE_FADE_DURATION = 400;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let languageFadeOutTimer = null;
let languageFadeInTimer = null;
let languageTransitionId = 0;

function getVisibleLanguageTargets() {
  return [...document.querySelectorAll('.language-swap-target')].filter(
    (element) =>
      !element.classList.contains('hidden') &&
      getComputedStyle(element).display !== 'none'
  );
}

function clearLanguageFade(targets = document.querySelectorAll('.language-swap-target')) {
  window.clearTimeout(languageFadeOutTimer);
  window.clearTimeout(languageFadeInTimer);
  document.body.classList.remove('is-language-switching');

  targets.forEach((target) => {
    target.classList.remove('is-language-fading-out', 'is-language-fading-in');
  });
}

// ---- Render Project Cards ----
function renderProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const ui = getCopy();
  const localizedProjects = getProjects(getCurrentLanguage());

  grid.innerHTML = localizedProjects
    .map(
      (project) => `
      <div class="project-card" data-project="${project.id}">
        <div class="project-card-image">
          ${
            project.image
              ? `<img src="${project.image}" alt="${project.title}" />`
              : `<span class="project-placeholder-icon"><i class="ph ph-image" style="font-size: 3rem;"></i></span>`
          }
        </div>
        <div class="project-card-tags">
          ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join(' ')}
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-desc">${project.description}</p>
          <div class="project-card-links">
            ${
              project.liveUrl && project.liveUrl !== '#'
                ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary btn-sm">
                    <i class="ph ph-globe"></i> ${ui.projectUi.liveDemo}
                   </a>`
                : ''
            }
            ${
              project.githubUrl && project.githubUrl !== '#'
                ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline btn-sm">
                    <i class="ph ph-github-logo"></i> ${ui.projectUi.sourceCode}
                   </a>`
                : ''
            }
          </div>
        </div>
      </div>
    `
    )
    .join('');
}

// ---- Render Skills ----
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const labels = getSkillCategoryLabels();
  const localizedCategories = baseSkillCategories.map((category, index) => ({
    ...category,
    name: labels[index] || category.name,
  }));

  grid.innerHTML = localizedCategories
    .map(
      (category) => `
      <div class="skill-category">
        <div class="skill-category-header">${category.name}</div>
        <div class="skill-category-body">
          ${category.skills
            .map(
              (skill) => `
              <div class="skill-item" title="${skill.name}">
                <span class="skill-icon">
                  <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
                </span>
                ${skill.name}
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');
}

let isCertsExpanded = false;
window.toggleCerts = function() {
  isCertsExpanded = !isCertsExpanded;
  renderCertificates();
};

// ---- Render Certificates ----
function renderCertificates() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  const ui = getCopy();
  const MAX_VISIBLE = 3;
  const visibleCerts = isCertsExpanded ? certificatesData : certificatesData.slice(0, MAX_VISIBLE);

  let html = visibleCerts
    .map(
      (cert) => `
      <div class="cert-card" ${cert.image ? `onclick="openCertModal('${cert.image}')"` : ''}>
        ${cert.image ? `
        <div class="cert-image-wrapper">
          <img src="${cert.image}" alt="${cert.title}" class="cert-image" loading="lazy" />
        </div>
        ` : ''}
        <div class="cert-header">
          <i class="ph ${cert.icon} cert-icon"></i>
        </div>
        <h3 class="cert-title">${cert.title}</h3>
        <span class="cert-issuer">${cert.issuer}</span>
        <span class="cert-date">${cert.date}</span>
      </div>
    `
    )
    .join('');

  if (certificatesData.length > MAX_VISIBLE) {
    const btnText = isCertsExpanded ? ui.skills.showLess : ui.skills.showMore;
    const icon = isCertsExpanded ? 'ph-caret-up' : 'ph-caret-down';
    
    html += `
      <div class="certs-action-btn">
        <button class="btn btn-outline" onclick="toggleCerts()">
          ${btnText} <i class="ph ${icon}"></i>
        </button>
      </div>
    `;
  }

  grid.innerHTML = html;
}

function refreshProjectDetailIfNeeded() {
  const detailView = document.getElementById('project-detail-view');
  if (!detailView || !window.location.hash.startsWith('#/project/')) return;

  const projectId = window.location.hash.replace('#/project/', '');
  detailView.innerHTML = renderProjectDetail(projectId);
  detailView.querySelectorAll('.fade-in').forEach((section) => {
    section.classList.add('visible');
  });
}

function refreshLanguageContent({ animate = false, refreshScroll = false } = {}) {
  const applyChanges = () => {
    applyStaticTranslations();
    renderProjectCards();
    renderSkills();
    renderCertificates();
    refreshProjectDetailIfNeeded();
    initTypingAnimation('typing-text', getTypingTexts());

    if (refreshScroll) {
      initScrollAnimations();
    }
  };

  if (!animate || reducedMotionQuery.matches) {
    clearLanguageFade();
    applyChanges();
    return;
  }

  const targets = getVisibleLanguageTargets();
  if (!targets.length) {
    applyChanges();
    return;
  }

  const transitionId = ++languageTransitionId;
  clearLanguageFade();

  document.body.classList.add('is-language-switching');

  targets.forEach((target) => {
    target.classList.add('is-language-fading-out');
  });

  // Match the reference fade pattern: fade out first, swap text, then fade in.
  targets[0]?.offsetWidth;

  languageFadeOutTimer = window.setTimeout(() => {
    if (transitionId !== languageTransitionId) return;

    applyChanges();
    const nextTargets = getVisibleLanguageTargets();

    nextTargets.forEach((target) => {
      target.classList.remove('is-language-fading-out');
      target.classList.add('is-language-fading-in');
    });

    languageFadeInTimer = window.setTimeout(() => {
      if (transitionId !== languageTransitionId) return;
      clearLanguageFade(nextTargets);
    }, LANGUAGE_FADE_DURATION);
  }, LANGUAGE_FADE_DURATION);
}

let lenis;

// ---- Smooth Scroll (Lenis) ----
function initLenis() {
  lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ---- Smooth Scroll for Nav Links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Skip router links
      if (href.startsWith('#/')) return;

      e.preventDefault();
      // Handle #home specially
      if (href === '#home') {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        if (lenis) lenis.scrollTo(target);
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---- Initialize Everything ----
async function init() {
  initLenis();
  // Theme toggle (before hero3D so data-theme is set)
  initThemeToggle();
  initLanguageToggle();
  window.addEventListener('languagechange', () => {
    refreshLanguageContent({ animate: true, refreshScroll: true });
  });
  refreshLanguageContent();

  // Loading screen
  await initLoadingScreen();

  // Three.js hero
  initHero3D('hero-canvas');

  // Typing animation
  initTypingAnimation('typing-text', getTypingTexts());

  // Animations
  initScrollAnimations();
  initActiveNavOnScroll();
  initNavbarScroll();
  initMobileNav();
  initSmoothScroll();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

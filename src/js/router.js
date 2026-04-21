// ========================================
// SIMPLE HASH ROUTER
// ========================================

import { renderProjectDetail } from './projectDetail.js';
import { initScrollAnimations } from './animations.js';

export function initRouter() {
  const homeView = document.getElementById('home-view');
  const detailView = document.getElementById('project-detail-view');

  function handleRoute() {
    const hash = window.location.hash;

    if (hash.startsWith('#/project/')) {
      const projectId = hash.replace('#/project/', '');
      showProjectDetail(projectId);
    } else {
      showHome();
    }
  }

  function showProjectDetail(projectId) {
    // Fade out home
    homeView.style.opacity = '0';
    homeView.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      homeView.classList.add('hidden');
      detailView.classList.remove('hidden');
      detailView.innerHTML = renderProjectDetail(projectId);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Animate in
      detailView.style.opacity = '0';
      detailView.style.transform = 'translateY(10px)';
      requestAnimationFrame(() => {
        detailView.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        detailView.style.opacity = '1';
        detailView.style.transform = 'translateY(0)';
      });

      // Init scroll animations for detail sections
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          },
          { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
        );
        detailView.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
      }, 100);
    }, 300);
  }

  function showHome() {
    detailView.style.opacity = '0';
    detailView.style.transform = 'translateY(10px)';

    setTimeout(() => {
      detailView.classList.add('hidden');
      detailView.innerHTML = '';
      homeView.classList.remove('hidden');

      homeView.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      homeView.style.opacity = '1';
      homeView.style.transform = 'translateY(0)';
    }, 300);
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleRoute);

  // Handle initial route
  handleRoute();
}

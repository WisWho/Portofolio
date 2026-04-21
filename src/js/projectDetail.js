// ========================================
// PROJECT DETAIL PAGE RENDERER
// ========================================

import { getCopy, getCurrentLanguage } from './i18n.js';
import { getProjects } from './projects.js';

export function renderProjectDetail(projectId) {
  const ui = getCopy();
  const project = getProjects(getCurrentLanguage()).find((p) => p.id === projectId);
  if (!project) return '';

  return `
    <div class="container">
      <button class="detail-back" onclick="window.location.hash = ''">
        <i class="ph ph-arrow-left"></i> ${ui.projectUi.backToProjects}
      </button>

      <div class="detail-header">
        <h1 class="detail-title">${project.title}</h1>
        <div class="detail-tags">
          ${project.tags.map((t) => `<span class="detail-tag">${t}</span>`).join('')}
        </div>
        <div class="detail-links">
          <a href="${project.liveUrl}" class="btn btn-primary btn-sm" target="_blank">
            <span class="btn-icon"><i class="ph ph-arrow-right"></i></span> ${ui.projectUi.liveDemo}
          </a>
          <a href="${project.githubUrl}" class="btn btn-outline btn-sm" target="_blank">
            <span class="btn-icon"><i class="ph ph-code"></i></span> ${ui.projectUi.sourceCode}
          </a>
        </div>
      </div>

      <div class="detail-section fade-in">
        <h2 class="detail-section-title"><i class="ph ph-notebook"></i> Detail Project</h2>
        <p style="font-size: 1.1rem; line-height: 1.8;">${project.description}</p>
      </div>
    </div>
  `;
}

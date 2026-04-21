// ========================================
// PROJECT DATA
// ========================================

import { projectTranslations } from './projectTranslations.js';

const baseProjects = [
  {
    id: 'push-sos',
    title: 'PUSH (Press for Urgent Safety Help)',
    description: 'An ESP32-based emergency button system. When pressed, the device sends a distress signal containing its precise location. Pressing it again marks the incident as handled by the authorities and logs it into history.',
    tags: ['ESP32', 'IoT', 'MicroPython'],
    image: '/projects/PUSH.webp',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'home-monitoring',
    title: 'Smart Home Monitoring',
    description: 'An ESP32-based smart home system for monitoring room temperature and humidity in real time. The system also features remote control capabilities for turning home lights on or off.',
    tags: ['ESP32', 'IoT', 'Sensors', 'Home Automation', 'MicroPython'],
    image: '/projects/Home_Monitoring.webp',
    liveUrl: '#',
    githubUrl: '#',
  }
];

export const projects = baseProjects;

export function getProjects(language = 'en') {
  if (language === 'en' || !projectTranslations[language]) {
    return baseProjects;
  }

  const translations = projectTranslations[language];

  return baseProjects.map((project) => {
    const localizedProject = translations[project.id];
    if (!localizedProject) {
      return project;
    }

    return {
      ...project,
      ...localizedProject,
    };
  });
}

// ========================================
// I18N — English / Indonesian
// ========================================

const STORAGE_KEY = 'portfolio-language';
const SUPPORTED_LANGUAGES = ['en', 'id'];

const copy = {
  en: {
    metaDescription:
      'Portfolio of Yusuf Muhibuddin, a passionate junior developer specializing in web development. View projects, skills, and get in touch.',
    nav: {
      home: 'home',
      projects: 'projects',
      about: 'about-me',
      skills: 'skills',
      contact: 'contacts',
    },
    loadingLines: [
      '$ initializing portfolio...',
      '$ loading assets...',
      '$ compiling components...',
      '$ ready. welcome, visitor.',
    ],
    hero: {
      intro: 'Hello, I am',
      subtitle:
        'I\'m a <span class="text-accent">Junior Developer</span> who turns ideas into functional, beautiful digital experiences. I love crafting clean code and exploring new technologies.',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
      status:
        'Currently working on <span class="text-accent">Portfolio</span>',
      scroll: 'scroll down',
      typing: [
        'Yusuf Muhibuddin',
        'a Web Developer',
        'a Problem Solver',
        'a Creative Coder',
      ],
    },
    shellLabels: {
      projects: '$ ls ./projects',
      about: '$ cat about_me.json',
      skills: '$ stack --list',
      contact: '$ ping yusuf.dev',
    },
    sectionTitles: {
      projects: 'projects',
      about: 'about-me',
      skills: 'skills',
      contact: 'contacts',
    },
    projectsDescription:
      "Here are some of the projects I've worked on. Each one taught me something valuable about development and design.",
    about: {
      paragraphs: [
        'Hey there! I\'m <span class="text-accent">Yusuf Muhibuddin</span>, a passionate junior developer from Indonesia who loves turning complex problems into simple, beautiful solutions.',
        'My journey into coding started from pure curiosity - tinkering with HTML pages, breaking things, and figuring out how to fix them. That curiosity has evolved into a deep passion for building digital experiences that people actually enjoy using.',
        'When I\'m not coding, you can find me exploring new tech stacks, contributing to open-source projects, or diving into design inspiration. I believe that great software isn\'t just about writing code - it\'s about understanding people and solving real problems.',
        'I\'m always open to learning new things and collaborating on exciting projects. If you have an idea, let\'s build it together!',
      ],
      funFactsTitle: 'fun-facts',
      funFacts: [
        'I enjoy playing Minecraft in my free time',
        'I\'m more productive at night (night owl coder)',
        'Coffee is my debugging companion',
        'I love reading tech blogs and documentation',
        'Problem-solving puzzles are my thing',
      ],
      terminalLines: [
        { label: 'Name', value: 'Yusuf Muhibuddin' },
        { label: 'Role', value: 'Junior Developer' },
        { label: 'Location', value: 'Indonesia' },
        { label: 'Education', value: 'Self-taught + Formal' },
        { label: 'Focus', value: 'Web Development' },
        { label: 'Status', value: 'Open to work', valueClass: 't-accent' },
      ],
    },
    skills: {
      categories: ['Languages', 'Frameworks', 'Tools', 'Databases'],
    },
    contact: {
      paragraphs: [
        "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
        'The best way to reach me is via email or social media. I usually respond within 24 hours.',
      ],
      cardTitle: 'Message me here',
    },
    footer: {
      description: 'Junior Developer & Web Enthusiast',
      label: 'Media',
      copyright: '© 2026 Yusuf Muhibuddin. All rights reserved.',
    },
    projectUi: {
      viewDetails: 'View Details',
      backToProjects: 'back to projects',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      problem: 'The Problem',
      role: 'My Role',
      process: 'The Process',
      solution: 'Solution & Impact',
      impact: 'Measurable Impact',
    },
    language: {
      switcherLabel: 'Language switcher',
      indonesianLabel: 'Switch language to Indonesian',
      englishLabel: 'Switch language to English',
      navToggleLabel: 'Toggle navigation',
    },
  },
  id: {
    metaDescription:
      'Portofolio Yusuf Muhibuddin, seorang junior developer yang berfokus pada web development. Lihat proyek, skill, dan hubungi saya.',
    nav: {
      home: 'beranda',
      projects: 'proyek',
      about: 'tentang-saya',
      skills: 'skill',
      contact: 'kontak',
    },
    loadingLines: [
      '$ menginisialisasi portofolio...',
      '$ memuat aset...',
      '$ menyusun komponen...',
      '$ siap. selamat datang, pengunjung.',
    ],
    hero: {
      intro: 'Halo, saya',
      subtitle:
        'Saya adalah <span class="text-accent">Junior Developer</span> yang mengubah ide menjadi pengalaman digital yang fungsional dan menarik. Saya suka meracik kode yang rapi dan terus mengeksplorasi teknologi baru.',
      ctaProjects: 'Lihat Proyek',
      ctaContact: 'Hubungi Saya',
      status:
        'Sedang mengerjakan <span class="text-accent">Portfolio</span>',
      scroll: 'gulir ke bawah',
      typing: [
        'Yusuf Muhibuddin',
        'seorang Web Developer',
        'seorang Problem Solver',
        'seorang Creative Coder',
      ],
    },
    shellLabels: {
      projects: '$ ls ./proyek',
      about: '$ cat tentang_saya.json',
      skills: '$ stack --list',
      contact: '$ ping yusuf.dev',
    },
    sectionTitles: {
      projects: 'proyek',
      about: 'tentang-saya',
      skills: 'skill',
      contact: 'kontak',
    },
    projectsDescription:
      'Berikut beberapa proyek yang pernah saya kerjakan. Masing-masing memberi saya pelajaran berharga tentang pengembangan dan desain.',
    about: {
      paragraphs: [
        'Halo! Saya <span class="text-accent">Yusuf Muhibuddin</span>, seorang junior developer dari Indonesia yang senang mengubah masalah kompleks menjadi solusi yang sederhana dan enak dipakai.',
        'Perjalanan saya di dunia coding dimulai dari rasa penasaran - utak-atik halaman HTML, merusak sesuatu, lalu mencari cara untuk memperbaikinya. Rasa penasaran itu berkembang menjadi ketertarikan yang serius untuk membangun pengalaman digital yang benar-benar menyenangkan digunakan.',
        'Saat sedang tidak ngoding, biasanya saya mengeksplorasi tech stack baru, melihat proyek open-source, atau mencari inspirasi desain. Buat saya, software yang bagus bukan cuma soal menulis kode - tapi juga memahami orang dan menyelesaikan masalah yang nyata.',
        'Saya selalu terbuka untuk belajar hal baru dan berkolaborasi di proyek yang seru. Kalau kamu punya ide, ayo kita bangun bareng!',
      ],
      funFactsTitle: 'fakta-seru',
      funFacts: [
        'Saya suka main Minecraft di waktu luang',
        'Saya lebih produktif saat malam hari (night owl coder)',
        'Kopi adalah teman setia saat debugging',
        'Saya suka membaca blog dan dokumentasi teknologi',
        'Puzzle pemecahan masalah memang kesukaan saya',
      ],
      terminalLines: [
        { label: 'Nama', value: 'Yusuf Muhibuddin' },
        { label: 'Peran', value: 'Junior Developer' },
        { label: 'Lokasi', value: 'Indonesia' },
        { label: 'Pendidikan', value: 'Otodidak + Formal' },
        { label: 'Fokus', value: 'Web Development' },
        { label: 'Status', value: 'Terbuka untuk kerja', valueClass: 't-accent' },
      ],
    },
    skills: {
      categories: ['Bahasa', 'Framework', 'Tools', 'Database'],
    },
    contact: {
      paragraphs: [
        'Saya selalu tertarik mendengar proyek atau peluang baru. Kalau kamu punya pertanyaan atau cuma ingin menyapa, jangan ragu untuk menghubungi saya!',
        'Cara terbaik untuk menghubungi saya adalah lewat email atau media sosial. Biasanya saya membalas dalam waktu 24 jam.',
      ],
      cardTitle: 'Kirim pesan di sini',
    },
    footer: {
      description: 'Junior Developer & Penggemar Web',
      label: 'Media',
      copyright: '© 2026 Yusuf Muhibuddin. Semua hak dilindungi.',
    },
    projectUi: {
      viewDetails: 'Lihat Detail',
      backToProjects: 'kembali ke proyek',
      liveDemo: 'Demo Langsung',
      sourceCode: 'Kode Sumber',
      problem: 'Masalah Utama',
      role: 'Peran Saya',
      process: 'Proses Pengerjaan',
      solution: 'Solusi & Dampak',
      impact: 'Dampak yang Terukur',
    },
    language: {
      switcherLabel: 'Pengalih bahasa',
      indonesianLabel: 'Ubah bahasa ke Indonesia',
      englishLabel: 'Ubah bahasa ke Inggris',
      navToggleLabel: 'Buka navigasi',
    },
  },
};

function getPreferredLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED_LANGUAGES.includes(saved)) {
    return saved;
  }

  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
}

let currentLanguage = getPreferredLanguage();

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setHTML(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.innerHTML = value;
  }
}

function renderTerminalLines(lines) {
  return lines
    .map(
      (line) => `
        <div class="terminal-line">
          <span class="t-green"><i class="ph ph-arrow-right"></i></span>
          <span class="t-white">${line.label}:</span>
          <span class="${line.valueClass || ''}">${line.value}</span>
        </div>
      `
    )
    .join('');
}

function syncThemeToggleLabel() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'dark';
  const label =
    currentLanguage === 'id'
      ? currentTheme === 'dark'
        ? 'Ganti ke tema terang'
        : 'Ganti ke tema gelap'
      : currentTheme === 'dark'
        ? 'Switch to light theme'
        : 'Switch to dark theme';

  themeToggle.setAttribute('aria-label', label);
}

function syncLanguageFab() {
  const fab = document.getElementById('language-fab');
  if (!fab) return;

  const languageCopy = copy[currentLanguage].language;
  fab.setAttribute('aria-label', languageCopy.switcherLabel);

  fab.querySelectorAll('.language-option').forEach((button) => {
    const language = button.dataset.language;
    const isActive = language === currentLanguage;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  const idButton = fab.querySelector('[data-language="id"]');
  const enButton = fab.querySelector('[data-language="en"]');

  if (idButton) {
    idButton.setAttribute('aria-label', languageCopy.indonesianLabel);
    idButton.title = languageCopy.indonesianLabel;
  }

  if (enButton) {
    enButton.setAttribute('aria-label', languageCopy.englishLabel);
    enButton.title = languageCopy.englishLabel;
  }
}

export function getCurrentLanguage() {
  return currentLanguage;
}

export function getCopy() {
  return copy[currentLanguage];
}

export function setLanguage(language, { persist = true } = {}) {
  if (!SUPPORTED_LANGUAGES.includes(language) || language === currentLanguage) {
    return false;
  }

  currentLanguage = language;
  if (persist) {
    localStorage.setItem(STORAGE_KEY, language);
  }

  document.documentElement.lang = language;
  document.body.setAttribute('data-language', language);
  syncLanguageFab();
  window.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  return true;
}

export function getTypingTexts() {
  return copy[currentLanguage].hero.typing;
}

export function getSkillCategoryLabels() {
  return copy[currentLanguage].skills.categories;
}

export function applyStaticTranslations() {
  const ui = copy[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.body.setAttribute('data-language', currentLanguage);

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', ui.metaDescription);
  }

  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.setAttribute('aria-label', ui.language.navToggleLabel);
  }

  syncThemeToggleLabel();

  setText('nav-home-label', ui.nav.home);
  setText('nav-projects-label', ui.nav.projects);
  setText('nav-about-label', ui.nav.about);
  setText('nav-skills-label', ui.nav.skills);
  setText('nav-contact-label', ui.nav.contact);

  setText('load-line-1', ui.loadingLines[0]);
  setText('load-line-2', ui.loadingLines[1]);
  setText('load-line-3', ui.loadingLines[2]);
  setText('load-line-4', ui.loadingLines[3]);

  setText('hero-intro', ui.hero.intro);
  setHTML('hero-subtitle', ui.hero.subtitle);
  setText('hero-projects-label', ui.hero.ctaProjects);
  setText('hero-contact-label', ui.hero.ctaContact);
  setHTML('hero-status-text', ui.hero.status);
  setText('scroll-down-label', ui.hero.scroll);

  setText('projects-title-label', ui.sectionTitles.projects);
  setText('about-title-label', ui.sectionTitles.about);
  setText('skills-title-label', ui.sectionTitles.skills);
  setText('contact-title-label', ui.sectionTitles.contact);
  setText('projects-description', ui.projectsDescription);

  setHTML('about-text-1', ui.about.paragraphs[0]);
  setHTML('about-text-2', ui.about.paragraphs[1]);
  setHTML('about-text-3', ui.about.paragraphs[2]);
  setHTML('about-text-4', ui.about.paragraphs[3]);
  setText('fun-facts-label', ui.about.funFactsTitle);
  setText('fact-1-text', ui.about.funFacts[0]);
  setText('fact-2-text', ui.about.funFacts[1]);
  setText('fact-3-text', ui.about.funFacts[2]);
  setText('fact-4-text', ui.about.funFacts[3]);
  setText('fact-5-text', ui.about.funFacts[4]);
  setHTML('about-terminal-body', renderTerminalLines(ui.about.terminalLines));

  setText('contact-text-1', ui.contact.paragraphs[0]);
  setText('contact-text-2', ui.contact.paragraphs[1]);
  setText('contact-card-title', ui.contact.cardTitle);

  setText('footer-desc', ui.footer.description);
  setText('footer-label', ui.footer.label);
  setText('footer-copyright', ui.footer.copyright);

  const projectsSection = document.getElementById('projects');
  const aboutSection = document.getElementById('about');
  const skillsSection = document.getElementById('skills');
  const contactSection = document.getElementById('contact');

  if (projectsSection) projectsSection.dataset.shellLabel = ui.shellLabels.projects;
  if (aboutSection) aboutSection.dataset.shellLabel = ui.shellLabels.about;
  if (skillsSection) skillsSection.dataset.shellLabel = ui.shellLabels.skills;
  if (contactSection) contactSection.dataset.shellLabel = ui.shellLabels.contact;

  syncLanguageFab();
}

export function initLanguageToggle() {
  const fab = document.getElementById('language-fab');
  if (!fab) return;

  syncLanguageFab();

  fab.addEventListener('click', (event) => {
    const button = event.target.closest('.language-option');
    if (!button) return;

    setLanguage(button.dataset.language);
  });
}

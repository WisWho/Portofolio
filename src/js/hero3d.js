// ========================================
// 2D CANVAS HERO BACKGROUND (High Performance)
// Replaced Three.js with native 2D Canvas API
// ========================================

export function initHero3D(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // 1. Detect if mobile for performance tuning
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

  // Theme palettes (using rgba for canvas)
  const themes = {
    dark: {
      particle: '152, 195, 121', // #98C379
      line: '92, 99, 112',       // #5C6370
      accent: '199, 120, 221',   // #C778DD
    },
    light: {
      particle: '39, 174, 96',   // #27ae60
      line: '176, 176, 184',     // #b0b0b8
      accent: '155, 89, 182',    // #9b59b6
    },
  };

  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  let t = themes[currentTheme] || themes.dark;

  // Configuration
  let width, height;
  const particleCount = isMobile ? 40 : 100;
  const connectionDistance = isMobile ? 100 : 150;
  const mouseDistance = 150;
  let particles = [];
  
  // Mouse interaction
  const mouse = { x: null, y: null, radius: mouseDistance };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
  }

  window.addEventListener('resize', resize);
  
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 2 + 1; // 1px - 3px
      this.isAccent = Math.random() > 0.8; // 20% accent colored particles
    }

    update() {
      // Move
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse repulsion (only active on desktop)
      if (!isMobile && mouse.x != null && mouse.y != null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const maxSpeed = 3;
          
          this.vx -= forceDirectionX * force * 0.5;
          this.vy -= forceDirectionY * force * 0.5;

          // Limit speed
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
          }
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.isAccent ? t.accent : t.particle}, 0.8)`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - (distance / connectionDistance);
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = `rgba(${t.line}, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  let animationFrameId;
  let isVisible = true;

  // Use IntersectionObserver to pause animation when out of view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        animate();
      }
    });
  }, { threshold: 0 });
  observer.observe(canvas);

  function animate() {
    if (!isVisible) return; // Pause animation
    
    animationFrameId = requestAnimationFrame(animate);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and Draw
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();
  }

  // Handle Theme Change
  window.addEventListener('themechange', (e) => {
    currentTheme = e.detail.theme || 'dark';
    t = themes[currentTheme] || themes.dark;
  });

  // Init
  resize();
  
  // Cleanup capability if needed
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    observer.disconnect();
  };
}
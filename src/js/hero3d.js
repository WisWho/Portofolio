// ========================================
// THREE.JS 3D HERO BACKGROUND
// ========================================

import * as THREE from 'three';

export function initHero3D(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Theme color palettes
  const themes = {
    dark: {
      fog: 0x282C33,
      green: 0x98C379,
      cyan: 0x56B6C2,
      purple: 0xC778DD,
      dim: 0x5C6370,
      consoleBg: 0x282C33,
      consoleBorder: 0x98C379,
      particleColor: 0x98C379,
      lineColor: 0x5C6370,
    },
    light: {
      fog: 0xf5f5f7,
      green: 0x27ae60,
      cyan: 0x2980b9,
      purple: 0x9b59b6,
      dim: 0x8a8a9a,
      consoleBg: 0xffffff,
      consoleBorder: 0x27ae60,
      particleColor: 0x9b59b6,
      lineColor: 0xb0b0b8,
    },
  };

  // Scene
  const scene = new THREE.Scene();
  scene.background = null; // Transparent to let CSS bg show
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  scene.fog = new THREE.FogExp2(themes[currentTheme].fog, 0.035);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 20);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ---- Materials ----
  const greenWireMat = new THREE.MeshBasicMaterial({
    color: 0x98C379,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });

  const cyanWireMat = new THREE.MeshBasicMaterial({
    color: 0x56B6C2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });

  const purpleWireMat = new THREE.MeshBasicMaterial({
    color: 0xC778DD,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  const dimWireMat = new THREE.MeshBasicMaterial({
    color: 0x5C6370,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });

  // ---- Floating Geometries ----
  const geometries = [];
  const floatingObjects = [];

  // Create varied geometric shapes
  const shapes = [
    { geo: new THREE.IcosahedronGeometry(1.2, 0), mat: greenWireMat },
    { geo: new THREE.OctahedronGeometry(0.9, 0), mat: cyanWireMat },
    { geo: new THREE.TorusGeometry(0.8, 0.3, 8, 12), mat: purpleWireMat },
    { geo: new THREE.TetrahedronGeometry(0.7, 0), mat: greenWireMat },
    { geo: new THREE.BoxGeometry(0.8, 0.8, 0.8), mat: cyanWireMat },
    { geo: new THREE.DodecahedronGeometry(0.6, 0), mat: purpleWireMat },
    { geo: new THREE.TorusKnotGeometry(0.5, 0.15, 32, 8), mat: greenWireMat },
    { geo: new THREE.IcosahedronGeometry(0.5, 1), mat: dimWireMat },
    { geo: new THREE.ConeGeometry(0.5, 1.2, 6), mat: cyanWireMat },
    { geo: new THREE.CylinderGeometry(0.3, 0.5, 1, 6), mat: dimWireMat },
  ];

  // Spread objects in a 3D space
  const objectCount = 25;
  for (let i = 0; i < objectCount; i++) {
    const shape = shapes[i % shapes.length];
    const mesh = new THREE.Mesh(shape.geo, shape.mat);

    // Random positions in a wide space
    mesh.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 30 - 5
    );

    // Random initial rotation
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    // Random scale
    const scale = 0.5 + Math.random() * 1.2;
    mesh.scale.set(scale, scale, scale);

    // Store animation properties
    mesh.userData = {
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.005,
      },
      floatSpeed: 0.2 + Math.random() * 0.5,
      floatAmplitude: 0.3 + Math.random() * 0.8,
      initialY: mesh.position.y,
      phase: Math.random() * Math.PI * 2,
    };

    scene.add(mesh);
    floatingObjects.push(mesh);
  }

  // ---- Floating Console Windows ----
  const consoleWindows = [];
  const codeSnippets = [
    'const init = () => {\n  loadModules();\n  startRenderer();\n};',
    'function deploy() {\n  build();\n  test();\n  ship();\n}',
    'class App {\n  constructor() {\n    this.state = {};\n  }\n}',
    'export default {\n  port: 3000,\n  env: "dev"\n};',
  ];

  for (let i = 0; i < 4; i++) {
    const consoleGroup = new THREE.Group();

    // Console frame
    const frameGeo = new THREE.PlaneGeometry(3.5, 2.2);
    const frameMat = new THREE.MeshBasicMaterial({
      color: 0x282C33,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    consoleGroup.add(frame);

    // Console border
    const borderGeo = new THREE.EdgesGeometry(frameGeo);
    const borderMat = new THREE.LineBasicMaterial({
      color: 0x98C379,
      transparent: true,
      opacity: 0.4,
    });
    const border = new THREE.LineSegments(borderGeo, borderMat);
    consoleGroup.add(border);

    // Position consoles around the edges
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const radius = 12 + Math.random() * 5;
    consoleGroup.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 8,
      -5 - Math.random() * 10
    );

    consoleGroup.rotation.y = -angle * 0.3;
    consoleGroup.rotation.x = (Math.random() - 0.5) * 0.3;

    consoleGroup.userData = {
      rotSpeed: (Math.random() - 0.5) * 0.003,
      floatSpeed: 0.15 + Math.random() * 0.2,
      floatAmplitude: 0.4,
      initialY: consoleGroup.position.y,
      phase: Math.random() * Math.PI * 2,
    };

    scene.add(consoleGroup);
    consoleWindows.push(consoleGroup);
  }

  // ---- Particle Grid / Nodes ----
  const particleCount = 150;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 50;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x98C379,
    size: 0.08,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---- Connection Lines ----
  const linePositions = [];
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 5) {
        linePositions.push(
          particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2],
          particlePositions[j * 3], particlePositions[j * 3 + 1], particlePositions[j * 3 + 2]
        );
      }
    }
  }

  if (linePositions.length > 0) {
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5C6370,
      transparent: true,
      opacity: 0.1,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);
  }

  // ---- Mouse Interaction ----
  const mouse = { x: 0, y: 0 };
  let targetCameraX = 0;
  let targetCameraY = 0;

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCameraX = mouse.x * 2;
    targetCameraY = mouse.y * 1;
  });

  // ---- Animation Loop ----
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Camera parallax
    camera.position.x += (targetCameraX - camera.position.x) * 0.02;
    camera.position.y += (targetCameraY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Animate floating objects
    for (const obj of floatingObjects) {
      const d = obj.userData;
      obj.rotation.x += d.rotSpeed.x;
      obj.rotation.y += d.rotSpeed.y;
      obj.rotation.z += d.rotSpeed.z;
      obj.position.y = d.initialY + Math.sin(elapsed * d.floatSpeed + d.phase) * d.floatAmplitude;
    }

    // Animate console windows
    for (const cw of consoleWindows) {
      const d = cw.userData;
      cw.rotation.y += d.rotSpeed;
      cw.position.y = d.initialY + Math.sin(elapsed * d.floatSpeed + d.phase) * d.floatAmplitude;
    }

    // Slowly rotate particles
    particles.rotation.y += 0.0003;
    particles.rotation.x += 0.0001;

    renderer.render(scene, camera);
  }

  animate();

  // ---- Resize Handler ----
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ---- Theme Change Handler ----
  window.addEventListener('themechange', (e) => {
    const t = themes[e.detail.theme] || themes.dark;

    // Update fog
    scene.fog.color.setHex(t.fog);

    // Update wireframe materials
    greenWireMat.color.setHex(t.green);
    cyanWireMat.color.setHex(t.cyan);
    purpleWireMat.color.setHex(t.purple);
    dimWireMat.color.setHex(t.dim);

    // Update particles
    particleMat.color.setHex(t.particleColor);

    // Update console windows
    for (const cw of consoleWindows) {
      cw.children.forEach((child) => {
        if (child.isMesh && child.material) {
          child.material.color.setHex(t.consoleBg);
        }
        if (child.isLineSegments && child.material) {
          child.material.color.setHex(t.consoleBorder);
        }
      });
    }
  });
}

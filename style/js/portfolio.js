/**
 * JARVIS Portfolio - Optimized JavaScript
 * Author: Guilherme Gonçalves
 * Version: 2.0 - Performance Optimized
 */

(function() {
  'use strict';

  // ─── DOM References ─────────────────────────────────────
  const DOM = {
    splash: document.getElementById('splash-screen'),
    video: document.getElementById('intro-video'),
    audio: document.getElementById('splash-audio'),
    skip: document.getElementById('splash-skip'),
    portfolio: document.getElementById('portfolio'),
    heroVideo: document.getElementById('hero-video'),
    langToggle: document.getElementById('lang-toggle'),
    langLabel: document.getElementById('lang-label'),
    printBtn: document.getElementById('print-btn'),
    printOverlay: document.getElementById('print-overlay'),
    printClose: document.getElementById('print-close'),
    canvas: document.getElementById('hud-canvas'),
    topbar: document.getElementById('topbar'),
    topbarNav: document.querySelector('.topbar-nav'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn')
  };

  // ─── State ───────────────────────────────────────────────
  let state = {
    lang: 'pt',
    particles: [],
    animFrame: null,
    splashTimer: null,
    isVisible: true
  };

  // ─── Config ──────────────────────────────────────────────
  const CONFIG = {
    splashDuration: 4000,
    particleCount: 60,
    particleSpeed: 0.4,
    connectionDistance: 100,
    fadeThreshold: 0.15
  };

  // ─── Utilities ───────────────────────────────────────────
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── Splash Screen ───────────────────────────────────────
  function initSplash() {
    const video = DOM.video;
    const audio = DOM.audio;

    const showPortfolio = () => {
      clearTimeout(state.splashTimer);

      // Stop audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      DOM.splash.classList.add('fade-out');
      DOM.portfolio.classList.remove('hidden');

      setTimeout(() => {
        DOM.splash.style.display = 'none';
        initAll();
      }, 800);
    };

    state.splashTimer = setTimeout(showPortfolio, CONFIG.splashDuration);

    video.addEventListener('ended', showPortfolio);
    video.addEventListener('error', showPortfolio);

    DOM.skip.addEventListener('click', showPortfolio);

    // Try to play audio (may be blocked by browser autoplay policies)
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Audio autoplay was prevented, user will need to interact first
        console.log('Audio autoplay blocked by browser');
      });
    }
  }

  // ─── Language Toggle ─────────────────────────────────────
  function initLanguage() {
    DOM.langToggle.addEventListener('click', () => {
      state.lang = state.lang === 'pt' ? 'en' : 'pt';
      document.documentElement.dataset.lang = state.lang;
      DOM.langLabel.textContent = state.lang.toUpperCase();
      updateTexts();
    });
  }

  function updateTexts() {
    $$('[data-pt]').forEach(el => {
      el.textContent = el.dataset[state.lang] || el.dataset.pt;
    });
  }

  // ─── Canvas Particle System ───────────────────────────────
  function initCanvas() {
    const canvas = DOM.canvas;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function createParticles() {
      const count = Math.min(CONFIG.particleCount, Math.floor(window.innerWidth / 20));
      state.particles = [];

      for (let i = 0; i < count; i++) {
        state.particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
          vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.15
        });
      }
    }

    createParticles();

    function animate() {
      if (!state.isVisible) {
        state.animFrame = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = state.particles;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONFIG.connectionDistance * CONFIG.connectionDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / CONFIG.connectionDistance) * 0.12;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      state.animFrame = requestAnimationFrame(animate);
    }

    animate();
  }

  // ─── Scroll Animations ───────────────────────────────────
  function initScrollAnimations() {
    const fadeElements = $$('.fade-in');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animateSkills(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: CONFIG.fadeThreshold,
        rootMargin: '0px 0px -50px 0px'
      });

      fadeElements.forEach(el => observer.observe(el));
    } else {
      fadeElements.forEach(el => el.classList.add('visible'));
    }

    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function animateSkills(container) {
    const fills = container.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      const pct = fill.dataset.pct || 0;
      fill.style.width = pct + '%';
    });
  }

  // ─── Print CV ────────────────────────────────────────────
  function initPrint() {
    DOM.printBtn.addEventListener('click', () => {
      DOM.printOverlay.classList.add('active');
    });

    DOM.printClose.addEventListener('click', closePrintOverlay);

    DOM.printOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.printOverlay) closePrintOverlay();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePrintOverlay();
    });

    function closePrintOverlay() {
      DOM.printOverlay.classList.remove('active');
    }
  }

  // ─── Performance: Tab Visibility ─────────────────────────
  function initPerformance() {
    document.addEventListener('visibilitychange', () => {
      state.isVisible = !document.hidden;
    });
  }

  // ─── Mobile Header Hide/Show ──────────────────────────────
  function initMobileHeader() {
    let lastScroll = 0;
    const header = DOM.topbar;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add('hidden-header');
      } else {
        header.classList.remove('hidden-header');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ─── Mobile Menu Toggle ──────────────────────────────────
  function initMobileMenu() {
    const btn = DOM.mobileMenuBtn;
    const nav = DOM.topbarNav;

    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
      btn.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        btn.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        btn.classList.remove('active');
      }
    });
  }

  // ─── Initialize All ─────────────────────────────────────
  function initAll() {
    initScrollAnimations();
    initPrint();
    initMobileHeader();
    initMobileMenu();
    initPerformance();

    // Start hero video
    if (DOM.heroVideo) {
      DOM.heroVideo.play().catch(() => {});
    }
  }

  // ─── Start Application ───────────────────────────────────
  function init() {
    initSplash();
    initLanguage();
    initCanvas();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

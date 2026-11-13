/**
 * @license
 * Sreenithi V - Personal Portfolio Website
 * Vanilla JavaScript interactions & accessibility handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initActiveSectionTracking();
  initScrollAnimations();
  initCopyEmail();
  initProjectModals();
  initSocialPlaceholderModal();
  initDynamicYear();
  initBackToTop();
  initBackgroundEffects();
});

/* --------------------------------------------------------------------------
   0. Theme Switcher (Warm Ivory Cream & Obsidian Dark)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const sunIcon = themeBtn.querySelector('.sun-icon');
  const moonIcon = themeBtn.querySelector('.moon-icon');

  function updateIcons(theme) {
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      themeBtn.setAttribute('title', 'Switch to Warm Ivory Theme');
      themeBtn.setAttribute('aria-label', 'Switch to Warm Ivory Theme');
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      themeBtn.setAttribute('title', 'Switch to Obsidian Dark Theme');
      themeBtn.setAttribute('aria-label', 'Switch to Obsidian Dark Theme');
    }
  }

  // Check stored theme or default to warm ivory
  const savedTheme = localStorage.getItem('sv_portfolio_theme') || 'warm';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateIcons(savedTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'warm' : 'dark';
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('sv_portfolio_theme', nextTheme);
    updateIcons(nextTheme);
    showToast(nextTheme === 'dark' ? 'Switched to Obsidian Dark theme' : 'Switched to Warm Ivory theme');
  });
}

/* --------------------------------------------------------------------------
   1. Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header blur enhancement on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (!toggleBtn || !drawer) return;

  function closeDrawer() {
    drawer.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  function openDrawer() {
    drawer.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close when clicking mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open') && 
        !drawer.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Active Section Highlighting via IntersectionObserver
   -------------------------------------------------------------------------- */
function initActiveSectionTracking() {
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-drawer .mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop links
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });

        // Update mobile links
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   2B. Scroll Progress Bar & Reveal-on-Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const progressBar = document.getElementById('scroll-progress-bar');

  // 1. Scroll Progress Bar
  const handleScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = `${scrollPercent}%`;
    }
  };

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  // 2. Check Reduced Motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 3. Mark key elements with reveal-on-scroll and staggered delays
  const groupSelectors = [
    { selector: '.section-header', stagger: false },
    { selector: '.about-narrative', stagger: false },
    { selector: '.about-exploring-card', stagger: false },
    { selector: '.strengths-grid .strength-card', stagger: true },
    { selector: '.languages-box', stagger: false },
    { selector: '.skills-grid .skill-category-card', stagger: true },
    { selector: '.projects-grid .project-card', stagger: true },
    { selector: '.research-card', stagger: false },
    { selector: '.patents-grid .patent-card', stagger: true },
    { selector: '.timeline-container .timeline-item', stagger: true },
    { selector: '.education-grid .education-card', stagger: true },
    { selector: '.certifications-grid .cert-card', stagger: true },
    { selector: '.activities-grid .activity-card', stagger: true },
    { selector: '.contact-grid .contact-card-item', stagger: true }
  ];

  const revealTargets = [];

  groupSelectors.forEach(group => {
    const elements = document.querySelectorAll(group.selector);
    elements.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      if (group.stagger) {
        const staggerIndex = (index % 6) + 1;
        el.classList.add(`stagger-${staggerIndex}`);
      }
      revealTargets.push(el);
    });
  });

  // 4. Reveal Observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  revealTargets.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  // 5. Interactive Boxes Light Sheen on Research and Patent Cards
  const boxCards = document.querySelectorAll('.box-effect-container');
  boxCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Copy Email to Clipboard with Toast Notice
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'sreenithivenkatesan09@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        showToast('Click email to open Gmail: ' + email);
      }
    });
  }
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  toast.classList.add('is-visible');

  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3500);
}


/* --------------------------------------------------------------------------
   5. Project Details Modals
   -------------------------------------------------------------------------- */
const PROJECT_DATA = {
  threat: {
    title: 'AI-Based Cyber Threat Prediction System',
    type: 'Cybersecurity | Research | Web Application',
    tech: ['Python', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    image: 'assets/images/cyber-threat.jpg',
    description: 'Designed and developed a web-based system that analyzes cyber threats and improves security monitoring through authentication, dashboards, and database integration. The work was formally published as a research paper in IJSART (International Journal of Scientific Archive for Research and Technology).',
    highlights: [
      'Cyber threat analysis and security event monitoring workflows.',
      'Role-based authentication system with secure session management.',
      'Interactive centralized dashboard for visualizing threat telemetry.',
      'Relational database integration (MySQL) for structured log storage.',
      'Formally published academic research work in IJSART.'
    ],
    disclaimer: 'Formally published in the International Journal of Scientific Archive for Research and Technology (IJSART).'
  },
  tracker: {
    title: 'Task Tracker',
    type: 'Web Application | Productivity Tool',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Vite'],
    image: 'assets/images/task-tracker.jpg',
    description: 'Built a responsive web application for efficient daily task management. Users can add, update, delete, and mark tasks as completed. The application uses local storage persistence and a clean interactive user interface.',
    highlights: [
      'Create and add custom categorized tasks with priority indicators.',
      'Inline update and editing of existing tasks.',
      'Instant deletion and clean task removal.',
      'Toggle and mark tasks as completed with visual status updates.',
      'Local storage persistence preserving user task state across sessions.',
      'Fully responsive interface optimized for mobile and desktop screens.'
    ],
    disclaimer: 'Open source repository available on GitHub at https://github.com/Sreenithi-V09/Task-Tracker.'
  },
  news: {
    title: 'News Hub',
    type: 'Web Application | Information Portal',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'assets/images/news-hub.jpg',
    description: 'Developed a modern, responsive news application delivering real-time updates with categorized news, smooth navigation, dynamic content fetching, and a user-friendly interface across devices.',
    highlights: [
      'Dynamic news content fetching and card rendering.',
      'Categorized news sections across tech, business, and current events.',
      'Real-time update functionality with active search and filtering.',
      'Highly responsive editorial layout crafted for all device sizes.',
      'Smooth navigation with fast interactive category switching.'
    ],
    disclaimer: 'Built as an interactive frontend news curation application with responsive layout dynamics.'
  },
  bakery: {
    title: 'Bakery Website',
    type: 'Business Website | E-Commerce Showcase',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'assets/images/bakery-web.jpg',
    description: 'Designed a responsive bakery website documenting business requirements, homepage planning, product catalogue, sample pricing, contact workflow, mobile-friendly design, testing, and a future-enhancement roadmap.',
    highlights: [
      'Comprehensive homepage planning and brand aesthetic design.',
      'Artisanal product catalogue with categorization and descriptive cards.',
      'Sample product pricing tables with clear visual hierarchy.',
      'Customer enquiry and ordering workflow with form validation.',
      'Mobile-friendly responsive architecture tested across viewports.',
      'Structured testing plan and future e-commerce enhancement roadmap.'
    ],
    disclaimer: 'Practical business web architecture project highlighting end-to-end frontend development.'
  },
  medical: {
    title: 'Medical Chatbot Using Generative AI',
    type: 'Artificial Intelligence | LLM Exploration',
    tech: ['Python', 'Large Language Model Concepts', 'UI Design'],
    image: 'assets/images/medical-ai.jpg',
    description: 'Built an AI-powered chatbot capable of providing healthcare-related responses using LLM concepts and Python, paired with a clean, user-friendly interface for non-technical users.',
    highlights: [
      'Conversational AI interface delivering structured informational responses.',
      'Integration of Generative AI and prompt engineering principles in Python.',
      'Healthcare-focused dialogue flows designed for clarity and empathy.',
      'User-friendly interaction paired with clear medical disclaimers.'
    ],
    disclaimer: 'For educational purposes only. This chatbot does not replace professional medical advice.'
  },
  portfolio: {
    title: 'Personal Portfolio Website',
    type: 'Web Development | Personal Branding',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    image: 'assets/images/portfolio-arch.jpg',
    description: 'Designed and developed a responsive personal portfolio website to professionally showcase technical skills, projects, and achievements with a clean, modern interface.',
    highlights: [
      'Personal branding reflecting verified academic, internship, and research achievements.',
      'Responsive interface tested across desktop, tablet, and mobile breakpoints.',
      'Project presentation with interactive modal dialogs and live links.',
      'Professional information showcase with dark/light themes and accessibility.'
    ],
    disclaimer: 'Zero third-party framework overhead, crafted with pure semantic HTML5, CSS3, and vanilla JavaScript.'
  }
};

function initProjectModals() {
  const detailButtons = document.querySelectorAll('[data-open-project]');
  const projectModal = document.getElementById('project-detail-modal');

  if (!projectModal) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-open-project');
      const data = PROJECT_DATA[projectKey];
      if (!data) return;

      const titleEl = projectModal.querySelector('.modal-project-title');
      const typeEl = projectModal.querySelector('.modal-project-type');
      const descEl = projectModal.querySelector('.modal-project-desc');
      const imgEl = projectModal.querySelector('.modal-project-img');
      const techEl = projectModal.querySelector('.modal-project-tech');
      const highlightsEl = projectModal.querySelector('.modal-project-highlights');
      const disclaimerEl = projectModal.querySelector('.modal-project-disclaimer');

      if (titleEl) titleEl.textContent = data.title;
      if (typeEl) typeEl.textContent = data.type;
      if (descEl) descEl.textContent = data.description;
      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.title;
      }
      if (disclaimerEl) disclaimerEl.textContent = data.disclaimer;

      if (techEl) {
        techEl.innerHTML = data.tech
          .map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`)
          .join('');
      }

      if (highlightsEl) {
        highlightsEl.innerHTML = data.highlights
          .map(h => `<li>${escapeHtml(h)}</li>`)
          .join('');
      }

      showModal(projectModal);
    });
  });
}



/* --------------------------------------------------------------------------
   7. Social Placeholder Helper Modal
   -------------------------------------------------------------------------- */
function initSocialPlaceholderModal() {
  const placeholderLinks = document.querySelectorAll('[data-placeholder-social]');
  const socialModal = document.getElementById('social-placeholder-modal');

  if (!socialModal) return;

  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.getAttribute('data-placeholder-social') || 'Social Profile';
      const targetPlatformEl = socialModal.querySelector('.platform-target-name');
      if (targetPlatformEl) targetPlatformEl.textContent = platform;
      showModal(socialModal);
    });
  });
}

/* --------------------------------------------------------------------------
   8. Generic Modal Helpers
   -------------------------------------------------------------------------- */
let activeModal = null;
let lastFocusedElement = null;

function showModal(modalEl) {
  if (!modalEl) return;
  lastFocusedElement = document.activeElement;
  activeModal = modalEl;

  modalEl.classList.add('is-visible');
  document.body.style.overflow = 'hidden';

  const closeBtn = modalEl.querySelector('.modal-close-btn');
  closeBtn?.focus();

  // Attach backdrop and close handlers
  const handleOverlayClick = (e) => {
    if (e.target === modalEl) {
      hideModal(modalEl);
    }
  };

  const closeBtns = modalEl.querySelectorAll('[data-modal-close]');
  closeBtns.forEach(btn => {
    btn.onclick = () => hideModal(modalEl);
  });

  modalEl.onclick = handleOverlayClick;
}

function hideModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('is-visible');
  document.body.style.overflow = '';
  activeModal = null;
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Global modal escape listener & tab trap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeModal) {
    hideModal(activeModal);
  }
});

/* --------------------------------------------------------------------------
   9. Dynamic Year & Back to Top
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initBackToTop() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (!topBtn) return;

  topBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Utility function for safe HTML strings */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* --------------------------------------------------------------------------
   10. Atmospheric Background Effects (Cursor Spotlight & Ambient Canvas)
   -------------------------------------------------------------------------- */
function initBackgroundEffects() {
  const spotlight = document.getElementById('bg-cursor-spotlight');
  const canvas = document.getElementById('bg-ambient-canvas');

  // 1. Interactive Cursor Spotlight Follower
  if (spotlight && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight * 0.3;
    let currentX = mouseX;
    let currentY = mouseY;
    let isTracking = false;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isTracking) {
        isTracking = true;
        spotlight.classList.add('is-active');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      spotlight.classList.remove('is-active');
      isTracking = false;
    });

    function updateSpotlight() {
      if (isTracking) {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        spotlight.style.setProperty('--cursor-x', `${currentX.toFixed(1)}px`);
        spotlight.style.setProperty('--cursor-y', `${currentY.toFixed(1)}px`);
      }
      requestAnimationFrame(updateSpotlight);
    }
    requestAnimationFrame(updateSpotlight);
  }

  // 2. Ambient Particles & Constellation Canvas
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Respect reduced motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let width = 0;
  let height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  window.addEventListener('resize', () => {
    resize();
  }, { passive: true });

  // Theme palettes matching Warm Linen (Terracotta/Amethyst) & Obsidian Dark (Violet/Ember)
  function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      return [
        { r: 168, g: 85, b: 247 },  // Luminous violet
        { r: 192, g: 132, b: 252 }, // Soft lavender
        { r: 129, g: 140, b: 248 }, // Electric indigo
        { r: 251, g: 146, b: 60 }   // Sunset ember
      ];
    }
    return [
      { r: 179, g: 94, b: 66 },   // Terracotta / Sienna
      { r: 200, g: 122, b: 91 },  // Warm coral
      { r: 126, g: 34, b: 206 },  // Amethyst purple
      { r: 212, g: 163, b: 115 }  // Warm sand
    ];
  }

  let themeColors = getThemeColors();

  // Watch for theme attribute toggles to seamlessly update particle hues
  const themeObserver = new MutationObserver(() => {
    themeColors = getThemeColors();
    particles.forEach(p => {
      p.color = themeColors[Math.floor(Math.random() * themeColors.length)];
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Generate lightweight ambient nodes (~28 for clean, distraction-free aesthetic)
  const particleCount = Math.min(Math.max(Math.floor(window.innerWidth / 50), 18), 32);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.15 - Math.random() * 0.25, // Gentle upward atmospheric drift
      radius: 1.2 + Math.random() * 1.5,
      alpha: 0.15 + Math.random() * 0.35,
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02
    });
  }

  let lastTime = performance.now();

  function animate(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (!document.hidden) {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between near nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 95;
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.12 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.pulse += p.pulseSpeed;

        // Wrap around viewport boundaries smoothly
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;
        const clampedAlpha = Math.max(0.08, Math.min(0.5, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${clampedAlpha})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

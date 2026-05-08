/**
 * VIDYA MANDIR SCHOOL — MODULAR JAVASCRIPT
 * Author: Premium Templates | Version: 2.0
 * Modules: Navbar, Mega Menu, Mobile Sidebar, Swiper, Counters, Gallery, AOS
 */

/* ============================================================
   UTILITY: DOM helpers
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   MODULE 1 — NAVBAR (Scroll + Sticky behaviour)
   ============================================================ */
const NavbarModule = (() => {
  const navbar = $('#navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on page load
})();

/* ============================================================
   MODULE 2 — MOBILE SIDEBAR
   ============================================================ */
const SidebarModule = (() => {
  const sidebar    = $('#mobile-sidebar');
  const overlay    = $('#sidebar-overlay');
  const hamburger  = $('#hamburger');
  const closeBtn   = $('#sidebar-close');
  if (!sidebar) return;

  const openSidebar = () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Close on sidebar link click
  $$('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });

  // Escape key closes sidebar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });
})();

/* ============================================================
   MODULE 3 — HERO SWIPER SLIDER
   ============================================================ */
const HeroSliderModule = (() => {
  if (!document.querySelector('.hero-swiper')) return;

  new Swiper('.hero-swiper', {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.hero-swiper .swiper-button-next',
      prevEl: '.hero-swiper .swiper-button-prev',
    },
    on: {
      slideChange() {
        // Re-trigger Ken Burns animation on each slide
        const activeSlide = this.slides[this.activeIndex];
        const bg = activeSlide?.querySelector('.hero-slide__bg');
        if (bg) {
          bg.style.animation = 'none';
          // Force reflow
          void bg.offsetWidth;
          bg.style.animation = '';
        }
      },
    },
  });
})();

/* ============================================================
   MODULE 4 — TESTIMONIALS SWIPER
   ============================================================ */
const TestimonialsSliderModule = (() => {
  if (!document.querySelector('.testimonials-swiper')) return;

  new Swiper('.testimonials-swiper', {
    loop: true,
    speed: 700,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.testimonials-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640:  { slidesPerView: 1, spaceBetween: 20 },
      768:  { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 28 },
    },
  });
})();

/* ============================================================
   MODULE 5 — ANIMATED COUNTERS (Intersection Observer)
   ============================================================ */
const CounterModule = (() => {
  const counters = $$('[data-target]');
  if (!counters.length) return;

  /**
   * Eases a counter from 0 to target value over ~2s
   * @param {HTMLElement} el
   * @param {number} target
   */
  const animateCounter = (el, target) => {
    const duration = 2000; // ms
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current.toLocaleString('en-IN');

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ============================================================
   MODULE 6 — GALLERY FILTER + LIGHTBOX
   ============================================================ */
const GalleryModule = (() => {
  const filterBtns   = $$('.filter-btn');
  const galleryItems = $$('.gallery-item');
  const lightbox     = $('#lightbox');
  const lightboxImg  = $('#lightbox-img');
  const lightboxClose = $('#lightbox-close');

  if (!filterBtns.length) return;

  /* --- Filter Logic --- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        const show = filter === '*' || item.dataset.category === filter;
        item.style.opacity    = show ? '1' : '0.2';
        item.style.transform  = show ? 'scale(1)'   : 'scale(0.95)';
        item.style.pointerEvents = show ? 'all'    : 'none';
      });
    });
  });

  /* --- Lightbox Logic --- */
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (!src || !lightbox) return;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox(); });
})();

/* ============================================================
   MODULE 7 — BACK TO TOP BUTTON
   ============================================================ */
const BackToTopModule = (() => {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   MODULE 8 — NEWSLETTER FORM (UI feedback)
   ============================================================ */
const NewsletterModule = (() => {
  const form = $('#newsletter-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const input  = form.querySelector('input[type="email"]');
    const btn    = form.querySelector('button[type="submit"]');
    const origTxt = btn.innerHTML;

    btn.innerHTML     = '<i class="fas fa-check"></i> Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
    btn.disabled      = true;
    input.value       = '';

    setTimeout(() => {
      btn.innerHTML     = origTxt;
      btn.style.background  = '';
      btn.disabled      = false;
    }, 3000);
  });
})();

/* ============================================================
   MODULE 9 — ACTIVE NAV LINK on scroll (Spy)
   ============================================================ */
const NavSpyModule = (() => {
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   MODULE 10 — AOS Initialization
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 750,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
  }
});

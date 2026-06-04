/**
 * Glädje & Harmoni — Global JavaScript
 * Navbar, smooth scroll, cookie-samtycke, analytics-placeholder
 */

(function () {
  'use strict';

  /* =========================================================
     Navbar – sticky + scroll-klass + burgermeny
  ========================================================= */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Lägg till scrolled-klass
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Burgermeny
    const burger = navbar.querySelector('.navbar__burger');
    const mobileMenu = navbar.querySelector('.navbar__mobile-menu');
    if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
        const open = burger.classList.toggle('open');
        mobileMenu.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });

      // Stäng vid klick på länk
      mobileMenu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        })
      );
    }
  }

  /* =========================================================
     Smooth scrolling för ankarlänkar
  ========================================================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 72; // navbar-höjd
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* =========================================================
     Cookie-samtycke (GDPR)
  ========================================================= */
  const COOKIE_KEY = 'gh_cookie_consent';

  function initCookieBanner() {
    if (localStorage.getItem(COOKIE_KEY)) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-samtycke');
    banner.innerHTML = `
      <div class="cookie-banner__inner">
        <p class="cookie-banner__text">
          Vi använder cookies för att förbättra din upplevelse och analysera trafik.
          Läs mer i vår <a href="/privacy.html">integritetspolicy</a>.
        </p>
        <div class="cookie-banner__actions">
          <button class="btn btn--ghost btn--sm" id="cookie-reject">Nödvändiga</button>
          <button class="btn btn--primary btn--sm" id="cookie-accept">Acceptera alla</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    // Visa med liten fördröjning
    setTimeout(() => banner.classList.add('visible'), 600);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'all');
      hideBanner();
      initAnalytics();
    });
    document.getElementById('cookie-reject').addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'necessary');
      hideBanner();
    });

    function hideBanner() {
      banner.classList.remove('visible');
      setTimeout(() => banner.remove(), 400);
    }
  }

  /* =========================================================
     Analytics – placeholder (aktiveras efter samtycke)
  ========================================================= */
  function initAnalytics() {
    // Ersätt med verklig analytics (Plausible, Matomo, etc.)
    if (window.GH_ANALYTICS_LOADED) return;
    window.GH_ANALYTICS_LOADED = true;
    console.info('[Glädje & Harmoni] Analytics aktiverat');
    // window._paq = window._paq || [];
    // _paq.push(['trackPageView']);
  }

  // Om användaren redan samtyckt, starta analytics
  const consent = localStorage.getItem(COOKIE_KEY);
  if (consent === 'all') initAnalytics();

  /* =========================================================
     Fade-in on scroll (Intersection Observer)
  ========================================================= */
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.benefit, .card, .trust-stat').forEach(el => {
      observer.observe(el);
    });
  }

  /* =========================================================
     Artikel-filtrering på articles.html
  ========================================================= */
  function initArticleFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-cat]');
    const articleCards = document.querySelectorAll('.article-card[data-cat]');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        articleCards.forEach(card => {
          const show = cat === 'all' || card.dataset.cat === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* =========================================================
     Artikel-sökning på articles.html
  ========================================================= */
  function initArticleSearch() {
    const searchInput = document.querySelector('.search-input');
    const articleCards = document.querySelectorAll('.article-card');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      articleCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = !q || text.includes(q) ? '' : 'none';
      });
    });
  }

  /* =========================================================
     Räknare-animation (hero stats)
  ========================================================= */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();
        const initial = 0;

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(initial + (target - initial) * ease).toLocaleString('sv-SE');
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  /* =========================================================
     Init
  ========================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initCookieBanner();
    initFadeIn();
    initArticleFilter();
    initArticleSearch();
    initCounters();
  });

})();

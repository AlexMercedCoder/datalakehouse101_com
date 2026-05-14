/* knowledge.js — Shared JS for DataLakehouse101 Knowledge Base pages */

(function () {
  'use strict';

  /* ── Reading Progress Bar ───────────────────────────────── */
  const progressBar = document.getElementById('reading-progress');
  function updateProgress() {
    if (!progressBar) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = pct.toFixed(2) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── Sticky TOC Scroll-Spy ──────────────────────────────── */
  const tocLinks = document.querySelectorAll('.toc-sidebar a[href^="#"]');
  const sections = [];
  tocLinks.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) sections.push({ link, target });
  });

  function updateTOC() {
    const scrollY = window.scrollY + 100;
    let active = null;
    sections.forEach(({ link, target }) => {
      link.classList.remove('active');
      if (target.offsetTop <= scrollY) active = link;
    });
    if (active) active.classList.add('active');
  }
  window.addEventListener('scroll', updateTOC, { passive: true });
  updateTOC();

  /* ── Smooth Anchor Scroll ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.site-nav')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Estimated Reading Time ─────────────────────────────── */
  const articleBody = document.querySelector('.article-body');
  const readingTimeEl = document.getElementById('reading-time');
  if (articleBody && readingTimeEl) {
    const words = articleBody.innerText.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 238);
    readingTimeEl.textContent = minutes + ' min read';
  }

  /* ── External Link Indicator ────────────────────────────── */
  document.querySelectorAll('.article-body a[href^="http"]').forEach(link => {
    if (!link.closest('.cta-section')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();

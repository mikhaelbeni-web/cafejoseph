// Fade-up on entering the viewport for elements marked [data-reveal] (skipped when motion is reduced).
if (document.documentElement.classList.contains('motion-ok') && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    (el as HTMLElement).style.transitionDelay = `${(Number((el as HTMLElement).dataset.reveal) || 0) * 80}ms`;
    io.observe(el);
  });
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}

// Day / night switch. Default follows Paris time (set inline in <head>); a click overrides it for this visit.
const root = document.documentElement;
const meta = document.querySelector<HTMLMetaElement>('[data-theme-color]');

function sync() {
  const night = root.dataset.time === 'night';
  meta?.setAttribute('content', night ? '#0e1b1f' : '#f4eee3');
  document.querySelectorAll<HTMLButtonElement>('[data-time-toggle]').forEach((b) => {
    const label = night ? b.dataset.toDay! : b.dataset.toNight!;
    b.setAttribute('aria-label', label);
    b.setAttribute('aria-pressed', String(night));
    const span = b.querySelector('[data-time-label]');
    if (span) span.textContent = label;
  });
}
sync();
document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest('[data-time-toggle]');
  if (!btn) return;
  const next = root.dataset.time === 'night' ? 'day' : 'night';
  root.dataset.time = next;
  try { sessionStorage.setItem('cj-time', next); } catch { /* private mode */ }
  sync();
  window.dispatchEvent(new CustomEvent('cj:time', { detail: next }));
});

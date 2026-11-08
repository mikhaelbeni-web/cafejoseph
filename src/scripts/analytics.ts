// Cookie-free audience measurement (Vercel Web Analytics) + named events on key actions.
// Loads only on the deployed site; does nothing locally.
declare global { interface Window { va?: (...a: unknown[]) => void; vaq?: unknown[] } }
const local = ['localhost', '127.0.0.1'].includes(location.hostname);
if (!local) {
  window.va = window.va || function (...a: unknown[]) { (window.vaq = window.vaq || []).push(a); };
  const s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);
}
document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-track]');
  if (el && window.va) window.va('event', { name: el.dataset.track });
});
export {};

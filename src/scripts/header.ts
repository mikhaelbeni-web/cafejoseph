// Header state on scroll + full-screen menu (focus trap, Escape, scroll lock, image on hover).
const header = document.querySelector<HTMLElement>('[data-header]');
const overlay = document.querySelector<HTMLElement>('[data-overlay]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = overlay?.querySelector<HTMLButtonElement>('[data-menu-close]');

const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

let lastFocus: HTMLElement | null = null;
function open() {
  if (!overlay) return;
  lastFocus = document.activeElement as HTMLElement;
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  openBtn?.setAttribute('aria-expanded', 'true');
  document.documentElement.style.overflow = 'hidden';
  setTimeout(() => closeBtn?.focus(), 50);
}
function close() {
  if (!overlay || overlay.hidden) return;
  overlay.classList.remove('is-open');
  openBtn?.setAttribute('aria-expanded', 'false');
  document.documentElement.style.overflow = '';
  const done = () => { overlay.hidden = true; };
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? done() : setTimeout(done, 800);
  lastFocus?.focus();
}
openBtn?.addEventListener('click', open);
closeBtn?.addEventListener('click', close);
overlay?.addEventListener('click', (e) => {
  const a = (e.target as Element).closest('a');
  if (a && a.getAttribute('href')?.includes('#')) close();
});
document.addEventListener('keydown', (e) => {
  if (!overlay || overlay.hidden) return;
  if (e.key === 'Escape') { close(); return; }
  if (e.key !== 'Tab') return;
  const items = [...overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter((el) => el.offsetParent !== null);
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
overlay?.querySelectorAll<HTMLElement>('[data-ov-img]').forEach((a) => {
  const show = () => overlay.querySelectorAll<HTMLElement>('[data-ov-pic]').forEach((img) => img.classList.toggle('is-on', img.dataset.ovPic === a.dataset.ovImg));
  a.addEventListener('mouseenter', show);
  a.addEventListener('focus', show);
});

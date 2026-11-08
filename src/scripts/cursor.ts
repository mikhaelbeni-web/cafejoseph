// "Curseur gourmand": the dish photo follows the pointer over a menu list (fine pointers only).
const fine = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 901px)');
const motion = document.documentElement.classList.contains('motion-ok');

export function initCursor(list: HTMLElement, media: HTMLElement) {
  const img = media.querySelector('img')!;
  let x = 0, y = 0, cx = 0, cy = 0, vx = 0, raf = 0, active = false;
  const loop = () => {
    const k = motion ? 0.16 : 1;
    const nx = cx + (x - cx) * k, ny = cy + (y - cy) * k;
    vx = nx - cx; cx = nx; cy = ny;
    const rot = Math.max(-12, Math.min(12, vx * 0.6));
    media.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${rot}deg) scale(${active ? 1 : 0.6})`;
    raf = active || Math.abs(vx) > 0.1 ? requestAnimationFrame(loop) : 0;
  };
  list.addEventListener('pointermove', (e) => {
    if (!fine.matches) return;
    x = e.clientX; y = e.clientY;
    if (!raf) { if (!active) { cx = x; cy = y; } raf = requestAnimationFrame(loop); }
  });
  list.querySelectorAll<HTMLElement>('[data-photo]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      if (!fine.matches) return;
      const src = row.dataset.photo!;
      if (img.getAttribute('src') !== src) img.src = src;
      active = true; media.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(loop);
    });
    row.addEventListener('pointerleave', () => { active = false; media.classList.remove('is-on'); });
  });
  // Preload photos after the page is idle, so the first hover is instant.
  const preload = () => list.querySelectorAll<HTMLElement>('[data-photo]').forEach((r) => { const i = new Image(); i.src = r.dataset.photo!; });
  'requestIdleCallback' in window ? requestIdleCallback(preload) : setTimeout(preload, 1500);
}

document.querySelectorAll<HTMLElement>('[data-cursor-list]').forEach((list) => {
  const media = list.closest('section, main')?.querySelector<HTMLElement>('[data-cursor-media]');
  if (media) initCursor(list, media);
});

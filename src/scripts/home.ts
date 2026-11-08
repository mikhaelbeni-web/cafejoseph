// Home page choreography (GSAP + ScrollTrigger). Loaded on the home page only.
// Rules: info is never hidden behind animation; one easing family; nothing runs when motion is reduced.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power3.out' });
const motion = document.documentElement.classList.contains('motion-ok');
const rtl = document.documentElement.dir === 'rtl';
const pad = (n: number) => String(n).padStart(2, '0');

if (motion) {
  const mm = gsap.matchMedia();

  // 1. Hero plate turns as the page scrolls; follows the pointer a little on desktop.
  const heroRot = document.querySelector('[data-hero-plate]');
  if (heroRot) {
    gsap.to(heroRot, { rotation: rtl ? -80 : 80, ease: 'none', scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  }
  mm.add('(min-width: 900px) and (pointer: fine)', () => {
    const el = document.querySelector('.hero-plate');
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 1.4 });
    const yTo = gsap.quickTo(el, 'y', { duration: 1.4 });
    const move = (e: PointerEvent) => { xTo((e.clientX / innerWidth - 0.5) * 36); yTo((e.clientY / innerHeight - 0.5) * 24); };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  });

  // 2. "Du midi à 2 h": pinned, the clock runs from noon to 2 am and the colours follow the light.
  mm.add('(min-width: 900px)', () => {
    const day = document.querySelector<HTMLElement>('[data-day]');
    if (!day) return;
    const tones = JSON.parse(day.dataset.tones!);
    const moments = gsap.utils.toArray<HTMLElement>('[data-day-moment]', day);
    const clock = day.querySelector<HTMLElement>('[data-day-clock]')!;
    const sun = day.querySelector<SVGCircleElement>('[data-day-sun]')!;
    const keys = [12 * 60, 17 * 60, 20 * 60 + 30, 23 * 60 + 30, 26 * 60];
    const n = moments.length;
    const vars = (t: { bg: string; fg: string; soft: string; gold: string }) => ({ '--day-bg': t.bg, '--day-fg': t.fg, '--day-soft': t.soft, '--day-gold': t.gold });
    const setClock = (time: number) => {
      const seg = Math.min(Math.floor(time), keys.length - 2);
      const f = Math.min(1, Math.max(0, time - seg));
      const minutes = keys[seg] + (keys[seg + 1] - keys[seg]) * f;
      const m = Math.round(minutes / 5) * 5;
      clock.textContent = `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`;
      const a = Math.PI * (1 - (minutes - keys[0]) / (keys[keys.length - 1] - keys[0]));
      sun.setAttribute('cx', String(200 + 190 * Math.cos(a)));
      sun.setAttribute('cy', String(200 - 190 * Math.sin(a)));
    };
    gsap.set(moments, { autoAlpha: 0 });
    gsap.set(moments[0], { autoAlpha: 1 });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: day, pin: day.querySelector('[data-day-pin]'), start: 'top top', end: () => `+=${innerHeight * 3.2}`, scrub: 0.5, invalidateOnRefresh: true },
      onUpdate: () => setClock(tl.time()),
    });
    for (let i = 0; i < n - 1; i++) {
      // Explicit start values: GSAP cannot read the initial custom properties reliably.
      tl.fromTo(day, vars(tones[i]), { ...vars(tones[i + 1]), duration: 1, immediateRender: false }, i);
      tl.to(moments[i], { autoAlpha: 0, y: -40, duration: 0.3, ease: 'power2.in' }, i + 0.35);
      tl.fromTo(moments[i + 1], { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' }, i + 0.6);
      const img = moments[i + 1].querySelector('img');
      if (img) tl.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 0.9 }, i + 0.6);
    }
    tl.to({}, { duration: 1 }, n - 1); // last moment holds while the clock reaches 2 am
    setClock(0);
    return () => gsap.set(day, vars(tones[0]));
  });

  // 3. Signatures: plates spin in, turn, spin out.
  mm.add('(min-width: 900px)', () => {
    const sec = document.querySelector<HTMLElement>('[data-sig]');
    if (!sec) return;
    const items = gsap.utils.toArray<HTMLElement>('[data-sig-item]', sec);
    const plates = items.map((i) => i.querySelector('[data-sig-plate]'));
    const texts = items.map((i) => i.querySelector('.sig-text'));
    const counter = sec.querySelector('[data-sig-current]')!;
    const dir = rtl ? -1 : 1;
    gsap.set(items, { autoAlpha: 1 });
    items.forEach((_, i) => {
      if (i === 0) return;
      gsap.set(plates[i], { xPercent: 75 * dir, yPercent: 8, rotation: -150 * dir, scale: 0.7, autoAlpha: 0 });
      gsap.set(texts[i], { autoAlpha: 0, y: 70 });
    });
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: sec, pin: sec.querySelector('[data-sig-pin]'), start: 'top top', end: () => `+=${innerHeight * (items.length - 0.4)}`, scrub: 0.6, invalidateOnRefresh: true },
      onUpdate: () => { counter.textContent = pad(Math.min(items.length, Math.floor(tl.time() + 0.25) + 1)); },
    });
    tl.to('[data-sig-dial]', { rotation: -140 * dir, duration: items.length }, 0);
    items.forEach((_, i) => {
      tl.to(plates[i], { rotation: 35 * dir, duration: 0.5 }, i);
      if (i === items.length - 1) { tl.to(plates[i], { rotation: 70 * dir, duration: 0.6 }, i + 0.5); return; }
      tl.to(plates[i], { xPercent: -115 * dir, yPercent: -14, rotation: 200 * dir, scale: 0.6, duration: 0.42, ease: 'power2.in' }, i + 0.5);
      tl.to(plates[i], { autoAlpha: 0, duration: 0.18, ease: 'none' }, i + 0.74);
      tl.to(texts[i], { autoAlpha: 0, y: -50, duration: 0.25, ease: 'power2.in' }, i + 0.5);
      tl.to(plates[i + 1], { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }, i + 0.62);
      tl.to(texts[i + 1], { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power3.out' }, i + 0.75);
    });
  });

  // Signatures on touch / small screens: each plate turns while it slides.
  mm.add('(max-width: 899px)', () => {
    const list = document.querySelector<HTMLElement>('.sig-list');
    if (!list) return;
    const plates = [...list.querySelectorAll<HTMLElement>('[data-sig-plate]')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = list.getBoundingClientRect();
      for (const p of plates) {
        const r = p.getBoundingClientRect();
        const off = (r.left + r.width / 2 - (box.left + box.width / 2)) / box.width;
        p.style.transform = `rotate(${off * 90}deg) scale(${1 - Math.min(Math.abs(off), 1) * 0.12})`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    list.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { list.removeEventListener('scroll', onScroll); plates.forEach((p) => (p.style.transform = '')); };
  });

  // 4. La maison: the photo opens like a curtain.
  document.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((fig) => {
    const img = fig.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%', end: 'center 55%', scrub: 0.6 } });
    tl.fromTo(fig, { clipPath: 'inset(12% 12% 12% 12% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'none' }, 0);
    if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, ease: 'none' }, 0);
  });

  // Recompute pinned sections once fonts and images have settled.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

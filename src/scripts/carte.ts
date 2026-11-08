// Menu page: filters (all / vegetarian / signatures) and active category in the sticky bar.
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const dishes = [...document.querySelectorAll<HTMLElement>('.dish')];
const cats = [...document.querySelectorAll<HTMLElement>('[data-cat]')];

function apply(filter: string) {
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
  dishes.forEach((d) => {
    const tags = (d.dataset.tags || '').split(' ');
    d.hidden = filter !== 'all' && !tags.includes(filter);
  });
  cats.forEach((c) => {
    const any = [...c.querySelectorAll<HTMLElement>('.dish')].some((d) => !d.hidden);
    c.querySelector<HTMLElement>('.cat-empty')!.hidden = any;
  });
}
buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter!)));

const links = new Map([...document.querySelectorAll<HTMLAnchorElement>('[data-cat-link]')].map((a) => [a.dataset.catLink!, a]));
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    links.forEach((a) => a.classList.remove('is-active'));
    const a = links.get(e.target.id);
    if (a) {
      a.classList.add('is-active');
      const nav = a.closest('nav');
      if (nav) nav.scrollTo({ left: a.offsetLeft - 16, behavior: 'smooth' });
    }
  }
}, { rootMargin: '-30% 0px -60% 0px' });
cats.forEach((c) => io.observe(c));

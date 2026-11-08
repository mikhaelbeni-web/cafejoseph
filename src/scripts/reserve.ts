// Booking form: real opening slots for the chosen day (Shabbat aware), then a pre-filled WhatsApp message.
import { slotsFor, parisParts, TZ } from '../lib/hours';
import { dict } from './i18n-client';
import { clock } from './format';

const form = document.querySelector<HTMLFormElement>('[data-book]');
if (form) init(form);

async function init(form: HTMLFormElement) {
  const t = await dict;
  const b = t.bookPage;
  const date = form.querySelector<HTMLInputElement>('[data-date]')!;
  const time = form.querySelector<HTMLSelectElement>('[data-slot]')!;
  const hint = form.querySelector<HTMLElement>('[data-time-hint]')!;
  const guests = form.querySelector<HTMLInputElement>('[data-guests]')!;
  const sent = form.querySelector<HTMLElement>('[data-sent]')!;

  const p = parisParts(Date.now());
  const iso = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const max = new Date(Date.UTC(p.y, p.mo - 1, p.d + 90));
  date.min = iso(p.y, p.mo, p.d);
  date.max = iso(max.getUTCFullYear(), max.getUTCMonth() + 1, max.getUTCDate());

  function fillSlots() {
    time.innerHTML = '';
    hint.hidden = true;
    if (!date.value) {
      time.disabled = true;
      time.add(new Option(b.chooseDate, ''));
      return;
    }
    const [y, m, d] = date.value.split('-').map(Number);
    const slots = slotsFor(y, m, d);
    if (!slots.length) {
      time.disabled = true;
      time.add(new Option('—', ''));
      const isToday = date.value === iso(p.y, p.mo, p.d);
      hint.textContent = isToday ? b.noSlot : b.closedDay;
      hint.hidden = false;
      return;
    }
    time.disabled = false;
    time.add(new Option(`${b.time}…`, ''));
    for (const s of slots) time.add(new Option(clock(t, s), String(s)));
  }
  // Default: the first day that still has a slot.
  for (let i = 0; i < 8; i++) {
    const dt = new Date(Date.UTC(p.y, p.mo - 1, p.d + i));
    if (slotsFor(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate()).length) {
      date.value = iso(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
      break;
    }
  }
  fillSlots();
  date.addEventListener('change', fillSlots);

  form.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((btn) => btn.addEventListener('click', () => {
    const v = Math.min(12, Math.max(1, (parseInt(guests.value, 10) || 1) + Number(btn.dataset.step)));
    guests.value = String(v);
  }));

  const setErr = (name: string, on: boolean, el: HTMLElement) => {
    form.querySelector<HTMLElement>(`[data-err="${name}"]`)!.hidden = !on;
    el.setAttribute('aria-invalid', String(on));
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector<HTMLInputElement>('#b-name')!;
    const note = form.querySelector<HTMLTextAreaElement>('#b-note')!;
    const errs = { date: !date.value, time: !time.value, name: !name.value.trim() };
    setErr('date', errs.date, date);
    setErr('time', errs.time, time);
    setErr('name', errs.name, name);
    const first = errs.date ? date : errs.time ? time : errs.name ? name : null;
    if (first) { first.focus(); return; }
    const slot = Number(time.value);
    const dateLabel = new Intl.DateTimeFormat(t.locale, { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(slot));
    const n = Math.min(12, Math.max(1, parseInt(guests.value, 10) || 1));
    const text = b.message({ date: dateLabel, time: clock(t, slot), guests: n, name: name.value.trim(), note: note.value.trim() });
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    sent.hidden = false;
  });
}

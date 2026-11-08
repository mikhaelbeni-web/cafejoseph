// Live opening status, weekly specifics (Friday close, Saturday reopening) and holiday notices.
import { statusAt, weekSpecifics, nextHoliday, parisParts } from '../lib/hours';
import { dict } from './i18n-client';
import { clock, when, longDate } from './format';

async function render() {
  const t = await dict;
  const now = Date.now();
  const s = statusAt(now);
  let long: string, short: string;
  if (s.open) {
    const until = t.status.until(clock(t, s.until));
    const after = s.endReason === 'shabbat' ? `, ${t.status.thenShabbat}` : '';
    long = `${t.status.open} · ${until}${after}`;
    short = `${t.status.open} · ${until}`;
  } else {
    const reason = s.closure ? (s.closure.holiday ? t.status.closedFor(t.status.holidays[s.closure.holiday] ?? t.status.holidays.yomtov) : t.status.shabbat) : t.status.closed;
    const next = s.next ? (s.closure ? t.status.reopens(when(t, s.next, now)) : t.status.opens(when(t, s.next, now))) : '';
    long = next ? `${reason} · ${next}` : reason;
    short = s.closure && !s.closure.holiday ? t.status.shabbat : t.status.closed;
    if (s.next) short += ` · ${clock(t, s.next)}`;
  }
  document.querySelectorAll<HTMLElement>('[data-status]').forEach((el) => {
    el.dataset.open = String(s.open);
    const txt = el.querySelector('[data-status-text]');
    if (txt) txt.textContent = el.dataset.status === 'short' ? short : long;
    el.setAttribute('aria-label', long);
  });

  const today = parisParts(now).wd;
  // Before 4 am, the night still belongs to the previous day (Saturday night until 2 am).
  const serviceDay = parisParts(now).h < 4 ? (today + 6) % 7 : today;
  document.querySelectorAll<HTMLElement>('[data-wd]').forEach((row) => {
    row.classList.toggle('is-today', row.dataset.wd!.split(',').map(Number).includes(serviceDay));
  });

  const w = weekSpecifics(now);
  document.querySelectorAll<HTMLElement>('[data-week-note]').forEach((el) => {
    if (!w.fridayClose || !w.saturdayOpen) return;
    el.textContent = t.hours.week(clock(t, w.fridayClose), clock(t, w.saturdayOpen));
    el.hidden = false;
  });
  const h = nextHoliday(now);
  document.querySelectorAll<HTMLElement>('[data-holiday-note]').forEach((el) => {
    if (!h) { el.hidden = true; return; }
    const name = t.status.holidays[h.holiday] ?? t.status.holidays.yomtov;
    el.textContent = t.hours.holiday(name, `${longDate(t, h.from)}, ${clock(t, h.from)}`, `${longDate(t, h.to + 30 * 60000)}, ${clock(t, Math.ceil((h.to + 30 * 60000) / 300000) * 300000)}`);
    el.hidden = false;
  });
}
render();
setInterval(render, 60_000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });

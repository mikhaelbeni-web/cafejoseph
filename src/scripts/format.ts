import type { Dict } from '../i18n/fr';
import { parisParts, TZ } from '../lib/hours';

export const clock = (t: Dict, ms: number) => {
  const p = parisParts(ms);
  return t.status.time(p.h, p.mi);
};
export const weekday = (t: Dict, ms: number) => new Intl.DateTimeFormat(t.locale, { timeZone: TZ, weekday: 'long' }).format(new Date(ms));
export const longDate = (t: Dict, ms: number) => new Intl.DateTimeFormat(t.locale, { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(ms));

/** "ce soir à 18 h 35", "demain à 12 h", "samedi à 18 h 35" — relative to now, Paris calendar. */
export function when(t: Dict, target: number, now = Date.now()) {
  const a = parisParts(now), b = parisParts(target);
  const dayA = Date.UTC(a.y, a.mo - 1, a.d), dayB = Date.UTC(b.y, b.mo - 1, b.d);
  const diff = Math.round((dayB - dayA) / 86400000);
  const time = clock(t, target);
  if (diff === 0) return b.h >= 17 ? t.status.tonight(time) : t.status.today(time);
  if (diff === 1) return t.status.tomorrow(time);
  return t.status.onDay(weekday(t, target), time);
}

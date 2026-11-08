// Opening hours engine — runs in the browser, always in Paris time.
// Weekly base schedule, minus Shabbat / Yom Tov closures precomputed at build time
// (src/data/closures.json, from candle lighting to havdalah).
import closures from '../data/closures.json' with { type: 'json' };

export const TZ = 'Europe/Paris';
const MIN = 60_000;
const FIVE = 5 * MIN;
const OFFSET_AFTER_SHABBAT = 30 * MIN;

// Minutes after local midnight. Saturday is open "from end of Shabbat until 2 am":
// its base window starts at noon and the closure trims the start.
const WEEK: Record<number, [number, number]> = {
  0: [12 * 60, 24 * 60],
  1: [12 * 60, 24 * 60],
  2: [12 * 60, 24 * 60],
  3: [12 * 60, 24 * 60],
  4: [12 * 60, 24 * 60],
  5: [12 * 60, 17 * 60],
  6: [12 * 60, 26 * 60],
};

type Period = { from: number; to: number; holiday: string };
const PERIODS: Period[] = (closures.periods as [number, number, string][]).map(([a, b, h]) => ({ from: a * MIN, to: b * MIN, holiday: h }));
const DATA_UNTIL = new Date(closures.until).getTime();

const partsFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23',
});
const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export type Parts = { y: number; mo: number; d: number; h: number; mi: number; wd: number };
export function parisParts(ms: number): Parts {
  const p: Record<string, string> = {};
  for (const x of partsFmt.formatToParts(new Date(ms))) p[x.type] = x.value;
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour % 24, mi: +p.minute, wd: WD[p.weekday] };
}
/** Epoch ms of a Paris wall-clock time (minutes may exceed 24 h: rolls to the next day). */
export function parisToMs(y: number, mo: number, d: number, minutes: number): number {
  const target = Date.UTC(y, mo - 1, d, 0, minutes);
  let guess = target;
  for (let i = 0; i < 3; i++) {
    const p = parisParts(guess);
    const asUtc = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi);
    const diff = target - asUtc;
    if (diff === 0) break;
    guess += diff;
  }
  return guess;
}

export type Interval = { from: number; to: number; endReason: '' | 'shabbat' | string; startReason: '' | 'shabbat' | string };

const floor5 = (t: number) => Math.floor(t / FIVE) * FIVE;
const ceil5 = (t: number) => Math.ceil(t / FIVE) * FIVE;

/** Opening intervals of one Paris calendar day (y, mo, d). */
export function dayIntervals(y: number, mo: number, d: number): Interval[] {
  const wd = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  const [a, b] = WEEK[wd];
  let list: Interval[] = [{ from: parisToMs(y, mo, d, a), to: parisToMs(y, mo, d, b), endReason: '', startReason: '' }];
  const start = list[0].from;
  const end = list[0].to;
  if (start > DATA_UNTIL && wd === 6) list[0].from = parisToMs(y, mo, d, 20 * 60); // fallback beyond precomputed data
  for (const p of PERIODS) {
    if (!list.length) break;
    if (p.to < start - 2 * 86400000 || p.from > end) continue;
    const reason = p.holiday || 'shabbat';
    const next: Interval[] = [];
    for (const iv of list) {
      const closeAt = floor5(p.from);
      const reopenAt = ceil5(p.to + OFFSET_AFTER_SHABBAT);
      if (reopenAt <= iv.from || closeAt >= iv.to) { next.push(iv); continue; }
      if (closeAt > iv.from) next.push({ ...iv, to: closeAt, endReason: reason });
      if (reopenAt < iv.to) next.push({ ...iv, from: reopenAt, startReason: reason });
    }
    list = next;
  }
  return list.filter((iv) => iv.to - iv.from >= 30 * MIN);
}

function addDays(p: Parts, n: number) {
  const dt = new Date(Date.UTC(p.y, p.mo - 1, p.d + n));
  return { y: dt.getUTCFullYear(), mo: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}
export function intervalsAround(now: number, before = 1, after = 8): Interval[] {
  const p = parisParts(now);
  const out: Interval[] = [];
  for (let i = -before; i <= after; i++) {
    const { y, mo, d } = addDays(p, i);
    out.push(...dayIntervals(y, mo, d));
  }
  return out.sort((x, z) => x.from - z.from);
}
export function closureAt(t: number): Period | undefined {
  return PERIODS.find((p) => t >= floor5(p.from) && t < ceil5(p.to + OFFSET_AFTER_SHABBAT));
}
export function nextHoliday(now: number, withinDays = 21): Period | undefined {
  return PERIODS.find((p) => p.holiday && p.to > now && p.from < now + withinDays * 86400000);
}

export type Status =
  | { open: true; until: number; endReason: string }
  | { open: false; next?: number; closure?: Period };

export function statusAt(now = Date.now()): Status {
  const ivs = intervalsAround(now);
  const cur = ivs.find((iv) => now >= iv.from && now < iv.to);
  if (cur) return { open: true, until: cur.to, endReason: cur.endReason };
  const next = ivs.find((iv) => iv.from > now);
  return { open: false, next: next?.from, closure: closureAt(now) };
}

/** This week's actual Friday closing and Saturday reopening (for the hours table). */
export function weekSpecifics(now = Date.now()) {
  const p = parisParts(now);
  const offset = p.wd === 6 ? -1 : (5 - p.wd + 7) % 7;
  const fri = addDays(p, offset);
  const sat = addDays(p, offset + 1);
  const friIv = dayIntervals(fri.y, fri.mo, fri.d);
  const satIv = dayIntervals(sat.y, sat.mo, sat.d);
  return {
    fridayClose: friIv.length ? friIv[friIv.length - 1].to : undefined,
    saturdayOpen: satIv.length ? satIv[0].from : undefined,
  };
}

/** Bookable time slots (every 30 min, last one 45 min before closing) for a Paris date. */
export function slotsFor(y: number, mo: number, d: number, now = Date.now()): number[] {
  const out: number[] = [];
  for (const iv of dayIntervals(y, mo, d)) {
    let t = Math.ceil(iv.from / (30 * MIN)) * 30 * MIN;
    for (; t <= iv.to - 45 * MIN; t += 30 * MIN) if (t > now + 30 * MIN) out.push(t);
  }
  return out;
}

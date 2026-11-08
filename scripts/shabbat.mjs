// Precomputes, at build time, the periods when Café Joseph is closed for Shabbat and Yom Tov
// (from candle lighting to havdalah, Paris), for the next three years.
// Output: src/data/closures.json — compact list consumed by src/lib/hours.ts in the browser.
import { HebrewCalendar, Location, flags } from '@hebcal/core';
import { writeFileSync } from 'node:fs';

const paris = Location.lookup('Paris');
const start = new Date();
start.setDate(start.getDate() - 7);
const end = new Date(start);
end.setFullYear(end.getFullYear() + 3);

const events = HebrewCalendar.calendar({
  start, end, location: paris, candlelighting: true, il: false, sedrot: false, noMinorFast: true, noModern: true, noRoshChodesh: true, noSpecialShabbat: true,
});

// Holiday names we display (others fall back to "fête juive").
const HOLIDAYS = {
  'Rosh Hashana': 'rosh-hashana',
  'Yom Kippur': 'kippour',
  'Sukkot': 'souccot',
  'Shmini Atzeret': 'chemini-atseret',
  'Simchat Torah': 'simhat-torah',
  'Pesach': 'pessah',
  'Shavuot': 'chavouot',
};
const marks = [];
const chagByDate = new Map();
for (const ev of events) {
  const desc = ev.getDesc();
  if (desc === 'Candle lighting' && ev.eventTime) marks.push({ t: ev.eventTime.getTime(), k: 'C' });
  else if (desc === 'Havdalah' && ev.eventTime) marks.push({ t: ev.eventTime.getTime(), k: 'H' });
  else if (ev.getFlags() & flags.CHAG) {
    const base = Object.keys(HOLIDAYS).find((h) => desc.startsWith(h));
    const d = ev.getDate().greg();
    chagByDate.set(d.toISOString().slice(0, 10), base ? HOLIDAYS[base] : 'yomtov');
  }
}
marks.sort((a, b) => a.t - b.t);
const out = [];
let open = null;
for (const m of marks) {
  if (m.k === 'C' && open === null) open = m.t;
  else if (m.k === 'H' && open !== null) {
    // Which holiday (if any) falls inside the window?
    let holiday = '';
    for (let t = open; t <= m.t; t += 86400000) {
      const key = new Date(t + 12 * 3600000).toISOString().slice(0, 10);
      if (chagByDate.has(key)) { holiday = chagByDate.get(key); break; }
    }
    out.push([Math.round(open / 60000), Math.round(m.t / 60000), holiday]);
    open = null;
  }
}
writeFileSync('src/data/closures.json', JSON.stringify({ generated: new Date().toISOString(), until: end.toISOString(), periods: out }));
console.log(`closures: ${out.length} periods until ${end.toISOString().slice(0, 10)}; first:`, out.slice(0, 3).map((p) => [new Date(p[0] * 60000).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }), new Date(p[1] * 60000).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }), p[2]]));

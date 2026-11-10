import type { Dict } from './fr';

const time = (h: number, m: number) => {
  if (h === 0 && m === 0) return 'midnight';
  if (h === 12 && m === 0) return 'noon';
  const hh = h % 12 === 0 ? 12 : h % 12;
  const ap = h < 12 ? 'am' : 'pm';
  return m === 0 ? `${hh} ${ap}` : `${hh}:${String(m).padStart(2, '0')} ${ap}`;
};

export const en: Dict = {
  locale: 'en-GB',
  dir: 'ltr',
  name: 'English',
  short: 'EN',
  meta: {
    home: { title: 'Café Joseph · Kosher Italian restaurant by Parc Monceau, Paris', description: 'Kosher dairy Italian restaurant at 48 rue de Prony, facing Parc Monceau in Paris 17th. Open all day from noon to midnight, until 2 am on Saturday night. Book by phone or WhatsApp.' },
    menu: { title: 'Menu · Café Joseph, kosher Italian restaurant in Paris', description: 'Burrata, carpaccios, pizzas, truffle pasta, poke: the menu of Café Joseph, a kosher dairy Italian restaurant near Parc Monceau.' },
    story: { title: 'Our story · Café Joseph', description: 'Café Joseph is the house of Joseph Tibi, founder of Tib’s: more than thirty years of kosher dining in Paris, now facing Parc Monceau.' },
    book: { title: 'Book a table · Café Joseph', description: 'Book your table at Café Joseph, 48 rue de Prony, Paris 17th: online, by phone or on WhatsApp.' },
    legal: { title: 'Legal notice · Café Joseph', description: 'Legal notice and personal data information for the Café Joseph website.' },
    notFound: { title: 'Page not found · Café Joseph', description: 'This page does not exist.' },
  },
  nav: {
    home: 'Home', menu: 'Menu', story: 'Our story', book: 'Book', visit: 'Visit', legal: 'Legal notice',
    open: 'Menu', close: 'Close', skip: 'Skip to content', language: 'Language',
    toNight: 'See the night version', toDay: 'See the day version', today: 'Today',
  },
  common: {
    cuisine: 'Italian restaurant', kosher: 'Kosher dairy', district: 'Paris 17th', metro: 'Metro Wagram or Monceau',
    book: 'Book a table', bookShort: 'Book', seeMenu: 'See the menu', fullMenu: 'Full menu',
    directions: 'Directions', delivery: 'Delivery on Uber Eats', instagram: 'Instagram', call: 'Call',
    readStory: 'Read our story', newTab: '(new tab)',
    tags: { veg: 'Vegetarian', signature: 'Signature', bestseller: 'Best seller', new: 'New' },
  },
  status: {
    loading: 'Live opening hours',
    open: 'Open', closed: 'Closed',
    until: (t: string) => `until ${t}`,
    thenShabbat: 'then Shabbat shalom',
    shabbat: 'Shabbat shalom',
    closedFor: (n: string) => `Closed for ${n}`,
    reopens: (w: string) => `reopens ${w}`,
    opens: (w: string) => `opens ${w}`,
    today: (t: string) => `at ${t}`,
    tonight: (t: string) => `tonight at ${t}`,
    tomorrow: (t: string) => `tomorrow at ${t}`,
    onDay: (d: string, t: string) => `${d} at ${t}`,
    midnight: 'midnight',
    time,
    holidays: { 'rosh-hashana': 'Rosh Hashanah', kippour: 'Yom Kippur', souccot: 'Sukkot', 'chemini-atseret': 'Shemini Atzeret', 'simhat-torah': 'Simchat Torah', pessah: 'Passover', chavouot: 'Shavuot', yomtov: 'the holiday' },
  },
  hours: {
    title: 'Opening hours',
    rows: [
      { days: 'Sunday – Thursday', hours: 'Noon – midnight', wd: [0, 1, 2, 3, 4] },
      { days: 'Friday', hours: 'Noon – 5 pm', note: 'or until Shabbat begins', wd: [5] },
      { days: 'Saturday night', hours: 'End of Shabbat – 2 am', wd: [6] },
    ],
    week: (fri: string, sat: string) => `This week: Friday until ${fri}, Saturday night from ${sat}.`,
    holiday: (n: string, a: string, b: string) => `${n}: closed from ${a} to ${b}.`,
  },
  home: {
    hero: {
      eyebrow: 'Monceau, Paris.',
      title: ['Thirty years', 'at the table.'],
      lede: 'A kosher dairy Italian restaurant on the corner of rue de Prony, facing Parc Monceau. Open all day, from lunch to the last glass.',
      facts: [
        { k: 'Noon – 12 am', v: 'Open all day' },
        { k: '2 am', v: 'On Saturday night' },
        { k: 'Kosher', v: 'Dairy' },
      ],
      scroll: 'Scroll',
      plateCaption: 'Burratina',
    },
    day: {
      label: 'From noon to 2 am',
      title: 'One table, from lunch to late night.',
      moments: [
        { time: '12:00', title: 'Lunch', text: 'Neighbourhood offices, a table in the sun, a poke bowl or pasta served quickly and well. Back at your desk on time.', photo: 'poke-bowl-saumon', alt: 'Salmon poke bowl with mango, edamame and avocado' },
        { time: '17:00', title: 'Drinks on the terrace', text: 'The park next door, truffle fries and a carpaccio to share. The light softens slowly.', photo: 'frites-truffe-parmesan', alt: 'Truffle and parmesan fries' },
        { time: '20:30', title: 'Dinner', text: 'Families, friends, long tables. Burrata, pizzas, truffle linguine, all in the middle of the table.', photo: 'table-partagee-vue-ensemble', alt: 'A shared table: burrata pizza, carpaccio, goat cheese cigars, fries' },
        { time: '23:30', title: 'Late night', text: 'When the neighbourhood goes quiet, we stay open: until midnight on weeknights, until 2 am on Saturday night.', photo: 'sashimi-saumon-riz', alt: 'Salmon sashimi and rice on a slate' },
      ],
    },
    signatures: { label: 'House favourites', title: 'Four plates that define the house.', of: 'of' },
    carte: { label: 'The menu, in short', title: 'What people come for.', hint: 'Hover over a dish to see it.', hintTouch: 'Tap a dish to see it.', note: 'Kosher dairy · vegetarian dishes marked' },
    maison: {
      label: 'The house',
      title: 'Joseph, before the café.',
      text: [
        'More than thirty years ago, Joseph Tibi opened Tib’s on rue Manin, in the 19th arrondissement: one of the oldest kosher tables in Paris.',
        'In 2024 the house moved to the 17th, on the corner of rue de Prony, and took its founder’s name. The same standards, a more Italian menu, and a terrace facing Parc Monceau.',
      ],
      values: [
        { title: 'Conviviality', text: 'A table for two, for the family or for colleagues, and one you come back to.' },
        { title: 'Fresh produce', text: 'Raw fish, burrata, fresh herbs: fresh ingredients, simply prepared.' },
        { title: 'Elegance', text: 'Green velvet, oak and brass: a Parisian brasserie, kept with care.' },
      ],
    },
    lieu: {
      label: 'The place',
      title: 'At the gates of Parc Monceau.',
      text: 'On the corner of rue de Prony, the terrace looks onto the park. Lunch in the sun, and back again in the evening.',
      stamp: 'PARC MONCEAU · RUE DE PRONY · PARIS 17 · ',
      facts: [
        { k: 'Metro', v: 'Wagram or Monceau' },
        { k: 'Terrace', v: 'Facing the park' },
        { k: 'Delivery', v: 'Uber Eats' },
      ],
    },
    avis: { label: 'Reviews', title: 'What our guests say.', source: 'Google review (in French)', all: 'Read all reviews on Google' },
    venir: {
      label: 'Visit',
      title: 'Find us.',
      map: 'Show the map',
      mapNote: 'The map is provided by Google Maps and only loads if you ask for it.',
      delivery: 'Staying in? Part of the menu is available for delivery.',
    },
  },
  menuPage: {
    label: 'Menu',
    title: 'The menu.',
    lede: 'Italian and Mediterranean cooking, raw fish and pizzas. A kosher dairy restaurant: no meat, no poultry.',
    filters: { all: 'All', veg: 'Vegetarian', signature: 'Signatures' },
    filterLabel: 'Filter the menu',
    categories: 'Categories',
    draft: 'Preview: the full menu (salads, sushi, desserts, drinks) and missing prices will be added from the in-house menu.',
    empty: 'No dish in this category matches the filter.',
    notes: ['Prices in euros, service included.', 'Allergen information available from our team.', 'Kosher dairy establishment.'],
    deliveryTitle: 'The menu, at home.',
    deliveryText: 'Part of the menu is available for delivery on Uber Eats.',
  },
  storyPage: {
    label: 'Our story',
    title: 'The house.',
    lede: 'One founder, two addresses, and the same idea of the table: generous, careful, kosher.',
    chapters: [
      { k: 'Rue Manin, 19th', title: 'Tib’s', text: ['Joseph Tibi opened Tib’s on rue Manin, in the 19th arrondissement, more than thirty years ago. The kosher dairy restaurant became a neighbourhood fixture, and one of the oldest in Paris.'] },
      { k: 'Rue de Prony, 17th', title: 'Café Joseph', text: ['In 2024 the house opened a new address at 48 rue de Prony, on the corner, facing Parc Monceau. This time it bears its founder’s first name.', 'The menu leans towards Italy: burrata, carpaccios, pizzas, truffle pasta, alongside raw fish and brasserie classics.'] },
    ],
    valuesTitle: 'What does not change.',
    kosherTitle: 'Kashrut',
    kosherText: 'Café Joseph is a kosher dairy restaurant: the menu has no meat or poultry. For any question about kashrut, our team will answer on +33 1 86 04 20 92.',
    galleryTitle: 'At the table.',
  },
  bookPage: {
    label: 'Book',
    title: 'Book a table.',
    lede: 'Pick a time: your request is sent by WhatsApp, and the team confirms your booking.',
    date: 'Date', time: 'Time', guests: 'Guests', name: 'Name', note: 'Note (optional)', notePh: 'Terrace, high chair, birthday…',
    chooseDate: 'Choose a date first', closedDay: 'The restaurant is closed on that day.', noSlot: 'No more times available that day.',
    submit: 'Send on WhatsApp', or: 'or', callCta: 'Call the restaurant',
    required: 'Please fill in this field.',
    less: 'One guest fewer', more: 'One more guest',
    groups: 'More than 12 guests? Please call us directly.',
    confirm: 'Your table is booked once the restaurant confirms.',
    sent: 'WhatsApp opens with your message. You just need to send it.',
    message: (o) => `Hello, I would like to book a table at Café Joseph on ${o.date} at ${o.time} for ${o.guests} guest${o.guests > 1 ? 's' : ''}, under the name ${o.name}.${o.note ? ` Note: ${o.note}.` : ''} Thank you!`,
    asideTitle: 'Good to know',
    online: {
      lede: 'Pick your date, time and party size in our online booking module.',
      cta: 'Book online',
      note: 'The L’Addition booking module opens in a new tab.',
      frameTitle: 'Café Joseph online booking',
      openTab: 'Module not showing? Open it in a new tab.',
      altTitle: 'Rather talk to us?',
      altText: 'The team also takes bookings by phone and on WhatsApp.',
      whatsapp: 'Message us on WhatsApp',
      waMessage: 'Hello, I would like to book a table at Café Joseph.',
    },
  },
  legalPage: {
    label: 'Information',
    title: 'Legal notice.',
    todo: 'To be completed',
    booking: {
      online: 'Online bookings go through the L’Addition Réservation module, which processes the details you enter under its own privacy policy. The site itself stores no data.',
      offline: 'Booking requests go through WhatsApp or phone: the site stores no data.',
    },
    sections: [
      { title: 'Publisher', lines: ['Company name: [to be completed]', 'Legal form and capital: [to be completed]', 'Registered office: 48 rue de Prony, 75017 Paris, France', 'SIRET: [to be completed] · RCS: [to be completed]', 'VAT number: [to be completed]', 'Publication director: [to be completed]', 'Phone: +33 1 86 04 20 92'] },
      { title: 'Hosting', lines: ['Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA · vercel.com'] },
      { title: 'Personal data and cookies', lines: ['This site sets no cookies and asks you for no account.', 'Audience measurement is anonymous and cookie-free.', '{booking}', 'The Google map only loads if you click “Show the map”; Google’s own privacy policy then applies.'] },
      { title: 'Intellectual property', lines: ['Photographs, texts and logo: © Café Joseph. Any reproduction without permission is prohibited.'] },
    ],
  },
  notFound: { label: 'Error 404', title: 'This table is not set.', text: 'The page you are looking for does not exist or has moved.', back: 'Back to the home page' },
  footer: {
    tagline: 'Kosher dairy Italian restaurant, facing Parc Monceau.',
    explore: 'Explore', visit: 'Visit', follow: 'Follow', hours: 'Hours',
    rights: '© 2026 Café Joseph. All rights reserved.',
  },
};

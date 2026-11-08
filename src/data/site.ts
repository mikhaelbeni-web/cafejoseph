// Everything a restaurant manager may need to update lives here or in menu.ts.
export const site = {
  name: 'Café Joseph',
  url: 'https://cafejoseph.paris',
  street: '48 rue de Prony',
  postalCode: '75017',
  city: 'Paris',
  country: 'FR',
  phoneDisplay: '01 86 04 20 92',
  phoneE164: '+33186042092',
  // TODO(owner): confirm the WhatsApp number. Until confirmed, the restaurant line is used.
  whatsappE164: '33186042092',
  instagram: 'https://www.instagram.com/cafejoseph17/',
  instagramHandle: '@cafejoseph17',
  uberEats: 'https://www.ubereats.com/fr-en/store/cafe-joseph-tibs/BJa8XCYQVTaWD-UZEFZGRg',
  googleMaps: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Joseph+48+rue+de+Prony+75017+Paris',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Caf%C3%A9+Joseph+48+rue+de+Prony+75017+Paris',
  mapEmbed: 'https://www.google.com/maps?q=Caf%C3%A9+Joseph,+48+rue+de+Prony,+75017+Paris&z=16&output=embed',
  googleReviews: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Joseph+48+rue+de+Prony+Paris',
  priceRange: '20–30 €',
  // TODO(owner): exact wording of the kashrut certificate (teouda), e.g. supervising rabbinate.
  certification: '',
  since: 2024,
  // Opening hours, Paris time. Saturday opens after Shabbat (see src/lib/hours.ts).
  shabbatOffsetMinutes: 30,
} as const;

export type Review = { author: string; text: string };
// Source: testimonials displayed on cafejoseph.shop (presented there as Google reviews).
// TODO(owner): check each one on the Google listing before launch.
export const reviews: Review[] = [
  { author: 'EILAT ACTION', text: 'Le charme, l’élégance et le savoir-faire sont au rendez-vous, et la cuisine est délicieuse ! Le vrai chic parisien…' },
  { author: 'David Cohen', text: 'Excellente brasserie italienne casher dans le 17e. Les pâtes sont délicieuses, le service est attentionné…' },
  { author: 'Yann Daby', text: 'Très bon accueil, la carte est variée. Mention spéciale pour les desserts !!! Un endroit où on revient avec plaisir.' },
  { author: 'Samantha Journo', text: 'Cliente fidèle depuis plusieurs années, la qualité est toujours au rendez-vous. Une équipe aux petits soins…' },
  { author: 'Elioth Serraf', text: 'Yaakov, le meilleur serveur du restaurant : rapide, efficace, il gère tout avec brio. Un service au top…' },
];

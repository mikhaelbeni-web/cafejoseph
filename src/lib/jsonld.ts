import { site } from '../data/site';
import { ROUTES, type Lang } from '../i18n';

// schema.org Restaurant. Saturday is left out on purpose: it opens at the end of Shabbat, which moves every week.
export function restaurantLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${site.url}/#restaurant`,
    name: site.name,
    url: new URL(ROUTES[lang].home, site.url).href,
    image: [`${site.url}/og/cafe-joseph.jpg`, `${site.url}/img/plats/pizza-burratina-1600.webp`],
    logo: `${site.url}/logo.svg`,
    telephone: site.phoneE164,
    priceRange: site.priceRange,
    servesCuisine: ['Italian', 'Mediterranean', 'Kosher'],
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.postalCode, addressLocality: site.city, addressCountry: site.country },
    hasMenu: new URL(ROUTES[lang].menu, site.url).href,
    acceptsReservations: true,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '12:00', closes: '23:59' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '12:00', closes: '17:00' },
    ],
    sameAs: [site.instagram, site.uberEats],
    inLanguage: lang,
  };
}

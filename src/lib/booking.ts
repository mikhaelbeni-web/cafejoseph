import { site } from '../data/site';
import { href, type Lang } from '../i18n';

// Online booking through L'Addition Réservation, driven by site.bookingUrl / site.bookingEmbed.
export const bookingOnline = /^https:\/\//.test(site.bookingUrl);
export const bookingEmbedded = bookingOnline && site.bookingEmbed;

// Where the "Réserver" buttons lead. With a booking URL and no embed, straight to L'Addition in a new tab
// (one click less); otherwise to the site's own booking page.
export function bookingLink(lang: Lang): { href: string; target?: '_blank'; rel?: 'noopener'; external: boolean } {
  if (bookingOnline && !bookingEmbedded) return { href: site.bookingUrl, target: '_blank', rel: 'noopener', external: true };
  return { href: href(lang, 'book'), external: false };
}

export const whatsappLink = (text: string) => `https://wa.me/${site.whatsappE164}?text=${encodeURIComponent(text)}`;

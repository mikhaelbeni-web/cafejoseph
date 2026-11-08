import { fr } from './fr';
import { en } from './en';
import { he } from './he';
export type { Dict } from './fr';

export const LANGS = ['fr', 'en', 'he'] as const;
export type Lang = (typeof LANGS)[number];
export type PageKey = 'home' | 'menu' | 'story' | 'book' | 'legal';

export const ROUTES: Record<Lang, Record<PageKey, string>> = {
  fr: { home: '/', menu: '/carte', story: '/maison', book: '/reserver', legal: '/mentions-legales' },
  en: { home: '/en', menu: '/en/menu', story: '/en/story', book: '/en/book', legal: '/en/legal' },
  he: { home: '/he', menu: '/he/menu', story: '/he/story', book: '/he/book', legal: '/he/legal' },
};
export const HTML_LANG: Record<Lang, string> = { fr: 'fr', en: 'en', he: 'he' };
export const OG_LOCALE: Record<Lang, string> = { fr: 'fr_FR', en: 'en_GB', he: 'he_IL' };

const dicts = { fr, en, he };
export const useT = (lang: Lang) => dicts[lang];
export const href = (lang: Lang, page: PageKey, hash = '') => ROUTES[lang][page] + hash;

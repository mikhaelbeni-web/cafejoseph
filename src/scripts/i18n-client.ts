// Loads only the current language's strings in the browser.
import type { Dict } from '../i18n/fr';
const loaders: Record<string, () => Promise<Dict>> = {
  fr: () => import('../i18n/fr').then((m) => m.fr),
  en: () => import('../i18n/en').then((m) => m.en),
  he: () => import('../i18n/he').then((m) => m.he),
};
export const lang = (document.documentElement.lang || 'fr') as 'fr' | 'en' | 'he';
export const dict = loaders[lang] ? loaders[lang]() : loaders.fr();

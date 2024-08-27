export const fallbackLng = 'en';
export const languages = ['en', 'fr', 'es'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

'use strict';

let currentLang = 'en';

export function setLanguage (lang) {
  currentLang = lang;
}

export function isLtr (lang) {
  return lang !== 'ar';
}

export function getLanguage () {
  return currentLang;
}

export function getAvailableLanguages () {
  return ['en', 'ar'];
}

export function isValidLanguage (l) {
  return getAvailableLanguages().indexOf(l) !== -1;
}

export function t (string, replace = {}) {
  // TEMP!
  // Use something like transifex.
  // Transifex provides 1 file per language which we can require.
  let l = {
    en: { // require('./langfiles/en')
      'hello': 'Hello'
    },
    ar: {
      'hello': 'مرحبا'
    }
  };

  if (!l[currentLang][string]) {
    if (process.env.DS_ENV === 'testing') {
      throw new Error(`Missing (${currentLang}) translation for (${string})`);
    }
    if (process.env.DS_ENV !== 'production') {
      console.error(`Missing (${currentLang}) translation for (${string})`);
    }
  }

  let res = l[currentLang][string] || '';
  Object.keys(replace).forEach(o => {
    let regex = new RegExp(`{${o}}`, 'g');
    res = res.replace(regex, replace[o]);
  });

  return res;
}

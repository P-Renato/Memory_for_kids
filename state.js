
export const state = {
  currentLanguage: 'english',
  listeners: []
};


export function onLanguageChange(callback) {
  state.listeners.push(callback);
}

export function setLanguage(lang) {
  state.currentLanguage = lang;
  localStorage.setItem('language', lang);
  state.listeners.forEach((cb) => cb(lang));
}

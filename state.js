
export const state = {
  currentLanguage: 'english',
  listeners: [],
  players: JSON.parse(localStorage.getItem('players')) || [],
  scores: [],
  currentPlayerIndex: 0
};


export function onLanguageChange(callback) {
  state.listeners.push(callback);
}

export function setLanguage(lang) {
  state.currentLanguage = lang;
  localStorage.setItem('language', lang);
  state.listeners.forEach((cb) => cb(lang));
}

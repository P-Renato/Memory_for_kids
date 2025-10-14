// 📁 src/audioCache.js
import { animalsByLanguage } from "./database/db.js";

export const audioCache = {};

Object.keys(animalsByLanguage).forEach(langKey => {
  const langData = animalsByLanguage[langKey];
  const langCode = langData.code; 
  const animals = langData.animals;

  audioCache[langKey] = {};

  Object.keys(animals).forEach(animal => {
    const filePath = `output/${langKey}/${animal}.mp3`;
    const audio = new Audio(filePath);
    audioCache[langKey][animal] = audio;
  });
});

// 📁 src/audioCache.js
// import { animalsByLanguage } from "./database/db.js";

// export const audioCache = {};

// Object.keys(animalsByLanguage).forEach(langKey => {
//   const langData = animalsByLanguage[langKey];
//   const langCode = langData.code; 
//   const animals = langData.animals;

//   audioCache[langKey] = {};

//   Object.keys(animals).forEach(animal => {
//     const filePath = `output/${langKey}/${animal}.mp3`;
//     const audio = new Audio(filePath);
//     audioCache[langKey][animal] = audio;
//   });
// });


// 📁 src/audioCache.js
import { animalsByLanguage } from "./database/db.js";

export const audioCache = {};

Object.keys(animalsByLanguage).forEach(langKey => {
  const langData = animalsByLanguage[langKey];
  const langCode = langData.code; // e.g. 'en', 'es', 'pt'
  const animals = langData.animals;

  audioCache[langKey] = {};

  Object.keys(animals).forEach(animal => {
    // ✅ IMPORTANT: use langCode (en, es, pt) instead of langKey (english, spanish)
    const filePath = `output/${langCode}/${animal}.mp3`;

    const audio = new Audio(filePath);

    // 🧪 Debugging feedback
    audio.addEventListener("canplaythrough", () => {
      console.log(`✅ Loaded audio: ${filePath}`);
    });

    audio.addEventListener("error", (e) => {
      console.error(`❌ Failed to load: ${filePath}`, e);
    });

    audioCache[langKey][animal] = audio;
  });
});

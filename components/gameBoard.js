
import { animalsByLanguage } from "../database/db.js";
import { state, onLanguageChange } from "../state.js";
import { audioCache } from "../audioCache.js";

export function createGameBoard(container, language) {
    
      const board = document.createElement('section');
      board.classList.add("board-table");

      renderBoard(state.currentLanguage);

      onLanguageChange(renderBoard);

      function renderBoard(lang){
        board.innerHTML = '';

        const animals = animalsByLanguage[lang].animals;
    
        const animalKeys = Object.keys(animals);

      
        const duplicatedAnimals = [...animalKeys, ...animalKeys];

      
        function shuffle(array){
          return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        }
      
        const shuffledAnimals = shuffle(duplicatedAnimals);
      

    
    
      shuffledAnimals.forEach((animal) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.animal = animal;
        console.log(animal)
    
        // card front and back for flip animation
        const inner = document.createElement("div");
        inner.classList.add("card-inner");
    
        const front = document.createElement("div");
        front.classList.add("card-front");
    
        const back = document.createElement("div");
        back.classList.add("card-back");
        back.style.backgroundImage = `url('public/${animal}.jpg')`;

        const animalText = document.createElement('p');
        animalText.classList.add('animal-text');
        animalText.textContent = animals[animal];

        back.appendChild(animalText)
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
    
        board.appendChild(card);
    
        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
          const currentLang = state.currentLanguage;
          const audio = audioCache[currentLang]?.[animal];
          if (audio) {
            audio.currentTime = 0;
            audio.play();
          }
        })   
      });
    } 
    container.appendChild(board)
}
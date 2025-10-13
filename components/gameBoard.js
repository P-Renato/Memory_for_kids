
import { animalsByLanguage } from "../database/db.js";


export function createGameBoard(container, language) {
    
    
      const animals = animalsByLanguage[language].animals;
      console.log(animals)
    
      const animalKeys = Object.keys(animals);
      console.log(animalKeys)
    
      const duplicatedAnimals = [...animalKeys, ...animalKeys];
      console.log(duplicatedAnimals)
    
      function shuffle(array){
        return array
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      }
    
      const shuffledAnimals = shuffle(duplicatedAnimals);
    
      const board = document.createElement('section');
      board.classList.add("board-table")
    
    
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
        animalText.textContent = animal;

        back.appendChild(animalText)
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
    
        board.appendChild(card);
    
        card.addEventListener('click', () => {
          card.classList.toggle('flipped');
        })   
      });
      container.appendChild(board)
}
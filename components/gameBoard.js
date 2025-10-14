
import { animalsByLanguage } from "../database/db.js";
import { state, onLanguageChange } from "../state.js";
import { audioCache } from "../audioCache.js";

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;


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
          handleCardClick(card)
          
        })   
      });
    } 
    function handleCardClick(card) {
      if (lockBoard || card === firstCard) return; // prevent double-clicking the same card

      card.classList.add('flipped');

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      checkForMatch();

      const currentLang = state.currentLanguage;
      const audio = audioCache[currentLang]?.[animal];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    }

    function checkForMatch() {
      const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

      if (isMatch) {
        disableMatchedCards();
      } else {
        unflipCards();
      }
    }

    function disableMatchedCards() {
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);

      matchedPairs++;
      resetTurn();

      state.scores[state.currentPlayerIndex]++;

      window.dispatchEvent(new Event('updateScores'));

      if (matchedPairs === 10) { // adjust depending on total animals
        setTimeout(() => alert('🎉 You found all pairs!'), 500);
      }
    }

    function unflipCards() {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
        state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
        window.dispatchEvent(new Event('updateCurrentPlayer'));
      }, 1000);
    }

    function resetTurn() {
      [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    window.addEventListener('restartGame', () => {
      board.innerHTML = '';
      matchedPairs = 0;
      renderBoard(state.currentLanguage);
    });


    container.appendChild(board)
}
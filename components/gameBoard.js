import { animalsByLanguage, translations } from "../database/db.js";
import { state, onLanguageChange } from "../state.js";
import { audioCache } from "../audioCache.js";
import { showResults } from "./showResults.js";

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let board;

export function createGameBoard(container, language) {
  board = document.createElement("section");
  board.classList.add("board-table");

  renderBoard(state.currentLanguage);
  onLanguageChange(renderBoard);

  function handleCardClick(e) {
    const card = e.currentTarget;

    if (lockBoard || card === firstCard) return;

    card.classList.add("flipped");

    // audio
    const animal = card.dataset.animal;
    const currentLang = state.currentLanguage;
    const audio = audioCache[currentLang]?.[animal];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;
    checkForMatch();
  }

  function renderBoard(lang) {
    board.innerHTML = "";

    const animals = animalsByLanguage[lang].animals;
    const animalKeys = Object.keys(animals);
    const duplicatedAnimals = [...animalKeys, ...animalKeys];
    const shuffledAnimals = shuffle(duplicatedAnimals);

    shuffledAnimals.forEach((animal) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.animal = animal;

      const inner = document.createElement("div");
      inner.classList.add("card-inner");

      const front = document.createElement("div");
      front.classList.add("card-front");
      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      front.appendChild(cardText);

      
      const back = document.createElement("div");
      back.classList.add("card-back");
      back.style.backgroundImage = `url('public/${animal}_new.png')`;
      
      function updateHeaderText() {
        const t = translations[state.currentLanguage].ui;
        cardText.textContent = t?.headerTitle || "Memory Game";
      }
      updateHeaderText();
      onLanguageChange(updateHeaderText);
      
      const animalText = document.createElement("p");
      animalText.classList.add("animal-text");
      animalText.textContent = animals[animal];
      
      back.appendChild(animalText);
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      board.appendChild(card);

      // Attach shared handler (no wrapper)
      card.addEventListener("click", handleCardClick);
    });
  }

  function shuffle(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
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
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);

    setTimeout(() => {
      firstCard.classList.add("matched-anim");
      secondCard.classList.add("matched-anim");

    }, 600)
    matchedPairs++;
    state.scores[state.currentPlayerIndex]++;
    window.dispatchEvent(new Event("updateScores"));

    setTimeout(() => {
      firstCard.classList.add("matched-hidden");
      secondCard.classList.add("matched-hidden");

      // Ensure they cannot be focused or clicked
      firstCard.tabIndex = -1;
      secondCard.tabIndex = -1;

      resetTurn();

      let totalPairs = 10;
      if (matchedPairs === totalPairs) {
        const boardContainer = document.querySelector('.board-table');
        if(boardContainer){
          board.classList.add('centered-board')
          boardContainer.innerHTML= "";
          showResults(boardContainer);

        }      
      }
    }, 1000);
  }


  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
      state.currentPlayerIndex =
        (state.currentPlayerIndex + 1) % state.players.length;
      window.dispatchEvent(new Event("updateCurrentPlayer"));
    }, 2500);
  }

  function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  window.addEventListener("restartGame", () => {
    board.innerHTML = "";
    matchedPairs = 0;
    board.classList.remove('centered-board');
    renderBoard(state.currentLanguage);
  });

  container.appendChild(board);
}

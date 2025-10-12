

import { animalsByLanguage } from "./database/db.js";


const container = document.querySelector('.container')

const language = 'english';
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

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  board.appendChild(card);

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  })

  
});


container.appendChild(board)

const sideBar = document.createElement('aside');
sideBar.classList.add('sideBar');
const label = document.createElement('label');
label.textContent = 'Player Name:';
const input = document.createElement('input');
const addPlayer = document.createElement('button');
const buttonStart = document.createElement('button');

label.htmlFor = 'player';
input.id = 'player';
input.type= 'text';
input.placeholder = 'Enter your name';
addPlayer.innerText = 'Add player'
buttonStart.innerText = 'Start Game';

sideBar.appendChild(label);
sideBar.appendChild(input);
sideBar.appendChild(addPlayer);
sideBar.appendChild(buttonStart);

container.appendChild(sideBar);
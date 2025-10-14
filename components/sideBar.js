
import { translations } from "../database/db.js";
import { onLanguageChange, state } from "../state.js";


export function createSidebar(container) {

  state.scores = state.players.map(() => 0);
  let players = JSON.parse(localStorage.getItem('players')) || [];

  
  const sideBar = document.createElement('aside');
  sideBar.classList.add('sideBar');
  const inputGroup = document.createElement('nav');
  inputGroup.classList.add('input-group');
  const label = document.createElement('label');
  label.textContent = 'Player Name:';
  const input = document.createElement('input');
  const addPlayer = document.createElement('button');
  const buttonStart = document.createElement('button');


  label.htmlFor = 'player';
  input.id = 'player';
  input.type= 'text';
  input.placeholder = 'Enter your name';
  addPlayer.innerText = 'Add player';
  addPlayer.classList.add('add-player')
  buttonStart.innerText = 'Start Game';
  buttonStart.classList.add('start-button')

  const playerList = document.createElement('ul');
  playerList.classList.add('player-list');

  inputGroup.appendChild(label);
  inputGroup.appendChild(input);
  sideBar.appendChild(playerList);
  sideBar.appendChild(inputGroup);
  sideBar.appendChild(addPlayer);
  sideBar.appendChild(buttonStart);

  container.appendChild(sideBar);
    function updateTexts(lang) {
    const t = translations[lang].ui;
    label.textContent = t.playerLabel;
    addPlayer.textContent = t.addPlayer;
    buttonStart.textContent = t.startGame;
  }
  updateTexts(state.currentLanguage);
  onLanguageChange(updateTexts);


  function renderPlayers() {
    playerList.innerHTML = '';
    players.forEach((name,index) => {
        const li = document.createElement('li');
        const text = document.createElement('p');
        text.textContent = `${index + 1} - ${name}`;
        const liPoints = document.createElement('li')
        const span = document.createElement('span');
        span.textContent = `${state.scores[index]} points.`


        const deletePlayer = document.createElement('button');
        deletePlayer.innerText = 'X';
        deletePlayer.classList.add('delete-player');
        li.appendChild(text)
        li.appendChild(deletePlayer)
        playerList.appendChild(li);
        playerList.appendChild(liPoints);

        deletePlayer.addEventListener('click', ()=> {
            players.splice(index, 1);
            state.scores.splice(index, 1);
            localStorage.setItem('players', JSON.stringify(players));
            renderPlayers();
        })
    });
  }
  renderPlayers();

  window.addEventListener('updateScores', renderPlayers);
  window.addEventListener('updateCurrentPlayer', highlightCurrentPlayer);


  function highlightCurrentPlayer() {
    const items = playerList.querySelectorAll('li');
    items.forEach((li, index) => {
      li.style.backgroundColor = 
        index === state.currentPlayerIndex ? 'var(--orangeColor)' : 'transparent';
    });
  }

  addPlayer.addEventListener('click', () => {
    const newPlayer = input.value.trim();

    if (!newPlayer) {
      alert('Please enter a valid name.');
      return;
    }

    if (players.includes(newPlayer)) {
      alert('This player already exists.');
      return;
    }

    if (players.length >= 4) {
      alert('Maximum of 4 players allowed.');
      return;
    }

    players.push(newPlayer);
    localStorage.setItem('players', JSON.stringify(players));
    renderPlayers();
    input.value = '';
  })

  buttonStart.addEventListener('click', () => {
    const event = new Event('restartGame');
    window.dispatchEvent(event);
  });


  return sideBar;
}

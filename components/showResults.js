import { state, onLanguageChange } from "../state.js";
import { translations } from "../database/db.js";

export function showResults(container) {
    const scores = state.scores;
    const players = state.players;

    const t = translations[state.currentLanguage]?.ui || translations.english.ui;
    const maxScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(maxScore);
    const winnerName = players[winnerIndex];
    console.log(winnerName);
    console.log("Current language:", state.currentLanguage);
    console.log("Translations:", translations[state.currentLanguage]);


    if (!state.victories[winnerName]) {
        state.victories[winnerName] = 0;
    }
    state.victories[winnerName]++;
    console.log("🏆 Updated victories:", state.victories)

    localStorage.setItem('victories', JSON.stringify(state.victories));

    container.innerHTML="";

    const overlay = document.createElement('div');
    overlay.classList.add('results-overlay');

    const title = document.createElement('h2');
    title.textContent = `🏆 ${t.winnerText}: ${winnerName}!`;

    const list = document.createElement('ul');
    list.classList.add('points-list')
    players.forEach((player, i) => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${scores[i]} ${t.pointsText}`;
        list.appendChild(li);
    });

    const victoryList = document.createElement('ul');
    victoryList.classList.add('victory-list');
    for (const player of players) {
        const li = document.createElement('li');
        li.textContent = `${player}: ${state.victories[player] || 0} ${t.victoriesText}`;
        victoryList.appendChild(li);
    }

    const restartButton = document.createElement('button');
    restartButton.textContent = t.playAgain;
    restartButton.addEventListener('click', () => {
        console.log("Scores from play again button: ", state.scores)
        // This is to zero the score of the players when restarting the game
        state.scores = state.players.map(() => 0);
        overlay.remove();
        window.dispatchEvent(new Event('restartGame'));
    });

    overlay.append(title, list, victoryList, restartButton);
    container.appendChild(overlay);
}
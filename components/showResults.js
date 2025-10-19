import { state, onLanguageChange } from "../state.js";


export function showResults() {
    const scores = state.scores;
    const players = state.players;

    const maxScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(maxScore);
    const winnerName = players[winnerIndex];
    console.log(winnerName)

    const overlay = document.createElement('div');
    overlay.classList.add('results-overlay');

    const title = document.createElement('h2');
    title.textContent = `🏆 Winner: ${winnerName}!`;

    const list = document.createElement('ul');
    players.forEach((player, i) => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${scores[i]} points`;
        list.appendChild(li);
    });

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', () => {
        overlay.remove();
        window.dispatchEvent(new Event('restartGame'));
    });

    overlay.append(title, list, restartButton);
    container.appendChild(overlay);
}
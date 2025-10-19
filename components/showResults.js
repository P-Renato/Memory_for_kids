import { state, onLanguageChange } from "../state.js";


export function showResults(container) {
    const scores = state.scores;
    const players = state.players;

    const maxScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(maxScore);
    const winnerName = players[winnerIndex];
    console.log(winnerName);

    if (!state.victories[winnerName]) {
        state.victories[winnerName] = 0;
    }
    state.victories[winnerName]++;
    console.log("🏆 Updated victories:", state.victories)

    localStorage.setItem('victories', JSON.stringify(state.victories));


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

    const victoryList = document.createElement('ul');
    victoryList.classList.add('victory-list');
    for (const player of players) {
        const li = document.createElement('li');
        li.textContent = `${player}: ${state.victories[player] || 0} victories`;
        victoryList.appendChild(li);
    }

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', () => {
        overlay.remove();
        window.dispatchEvent(new Event('restartGame'));
    });

    overlay.append(title, list, victoryList, restartButton);
    container.appendChild(overlay);
}
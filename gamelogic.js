const board = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);  // Initial empty state
let isGameOver = false;

// Winning combinations: rows, columns, diagonals
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Handle user click
board.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const index = event.target.getAttribute('data-index');

    // If the cell is already filled or game is over, ignore the click
    if (gameState[index] || isGameOver) return;

    // Update the board and game state
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameOver = true;
    } else if (gameState.every(cell => cell)) {
        message.textContent = 'It\'s a draw!';
        isGameOver = true;
    } else {
        // Switch player and continue the game
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
    gameState.fill(null);
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove X and O classes for styling
    });
    currentPlayer = 'X';
    isGameOver = false;
    message.textContent = `Player ${currentPlayer}'s turn`;
}

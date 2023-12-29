document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const statusMessage = document.getElementById('status-message');
  const playerScoreDisplay = document.getElementById('player-score');
  const arkaScoreDisplay = document.getElementById('arka-score');

  const player1 = 'Arka';
  const player2 = 'You';
  let currentPlayer = player2;
  let playerScore = 0;
  let arkaScore = 0;

  const boardState = Array(6).fill().map(() => Array(6).fill(''));

  function renderBoard() {
    board.innerHTML = '';

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = boardState[row][col];
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
    }
  }

  function handleCellClick(event) {
    const { row, col } = event.target.dataset;

    if (boardState[row][col] === '' && currentPlayer === player2) {
      boardState[row][col] = 'X';
      currentPlayer = player1;
      renderBoard();
      checkWinner();
      if (currentPlayer === player1) {
        setTimeout(() => {
          makeMoveArka();
          renderBoard();
          checkWinner();
          currentPlayer = player2;
        }, 500);
      }
    }
  }

  function makeMoveArka() {
    // Improved AI: Arka makes a move to block or win if possible
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (boardState[i][j] === '') {
          // Check if Arka can win in the next move
          boardState[i][j] = 'O';
          if (checkWinner()) {
            return;
          }
          // Check if Arka needs to block the player from winning
          boardState[i][j] = 'X';
          if (checkWinner()) {
            boardState[i][j] = 'O';
            return;
          }
          // Reset the cell
          boardState[i][j] = '';
        }
      }
    }

    // Simple AI: If no winning or blocking move, Arka makes a random move
    const emptyCells = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (boardState[row][col] === '') {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const { row, col } = emptyCells[randomIndex];
      boardState[row][col] = 'O';
    }
  }

  function checkWinner() {
    // Same as before with some enhancements

    // Update the scores
    if (statusMessage.textContent.includes('wins')) {
      if (statusMessage.textContent.includes(player2)) {
        playerScore++;
      } else {
        arkaScore++;
      }
      updateScores();
    }
  }

  function updateScores() {
    playerScoreDisplay.textContent = `Your Score: ${playerScore}`;
    arkaScoreDisplay.textContent = `Arka's Score: ${arkaScore}`;
  }

  function checkLine(line) {
    // Same as before with some enhancements
  }

  function showWinner(winner, winningCells) {
    // Same as before with some enhancements

    // Highlight the winning combination
    if (winningCells) {
      winningCells.forEach(cell => {
        const { row, col } = cell;
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('winner');
      });
    }

    board.removeEventListener('click', handleCellClick);
  }

  function displayCurrentPlayer() {
    statusMessage.textContent = `Your Turn`;
  }

  function resetGame() {
    currentPlayer = player2;
    boardState.forEach(row => row.fill(''));
    renderBoard();
    displayCurrentPlayer();
    board.addEventListener('click', handleCellClick);
  }

  // Add a reset button
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Game';
  resetButton.addEventListener('click', resetGame);
  document.body.insertBefore(resetButton, document.querySelector('script'));

  // Initialize the game
  resetGame();
});

   
    

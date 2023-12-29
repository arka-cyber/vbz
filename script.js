document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const statusMessage = document.getElementById('status-message');
  const playerNameInput = document.getElementById('player-name');
  const startGameButton = document.getElementById('start-game');
  const playerScoreDisplay = document.getElementById('player-score');
  const arkaScoreDisplay = document.getElementById('arka-score');
  const leaderboard = document.getElementById('leaderboard');

  let currentPlayer = '';
  let playerScore = 0;
  let arkaScore = 0;
  let playerWins = 0;
  let arkaWins = 0;
  let playerLeaderboard = [];

  let boardState = [];

  function initializeGame() {
    const playerName = playerNameInput.value.trim();

    if (playerName === '') {
      alert('Please enter your name to start the game.');
      return;
    }

    currentPlayer = playerName;
    playerScore = 0;
    arkaScore = 0;
    playerWins = 0;
    arkaWins = 0;
    playerLeaderboard = [];

    updateScores();
    updateLeaderboard();
    resetGame();
  }

  startGameButton.addEventListener('click', initializeGame);

  function resetGame() {
    boardState = Array.from({ length: 7 }, () => Array(7).fill(''));
    renderBoard();
    displayCurrentPlayer();
    board.addEventListener('click', handleCellClick);
  }

  function renderBoard() {
    board.innerHTML = '';

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 7; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = boardState[row][col];
        board.appendChild(cell);
      }
    }
  }

  function handleCellClick(event) {
    const { col } = event.target.dataset;

    for (let row = 6; row >= 0; row--) {
      if (boardState[row][col] === '') {
        boardState[row][col] = 'X';
        renderBoard();
        if (checkWinner(row, col)) {
          playerWins++;
          updateScores();
          updateLeaderboard();
          showWinner(currentPlayer);
        } else {
          currentPlayer = 'Arka';
          setTimeout(() => {
            makeMoveArka();
            renderBoard();
            if (checkWinner()) {
              arkaWins++;
              updateScores();
              updateLeaderboard();
              showWinner('Arka');
            } else {
              currentPlayer = playerNameInput.value.trim();
              displayCurrentPlayer();
            }
          }, 500);
        }
        return;
      }
    }
  }

  function makeMoveArka() {
    for (let col = 0; col < 7; col++) {
      for (let row = 6; row >= 0; row--) {
        if (boardState[row][col] === '') {
          boardState[row][col] = 'O';
          return;
        }
      }
    }
  }

  function checkWinner(row, col) {
    return (
      checkLine(row, col, 0, 1) || // Check horizontally
      checkLine(row, col, 1, 0) || // Check vertically
      checkLine(row, col, 1, 1) || // Check diagonally /
      checkLine(row, col, 1, -1)   // Check diagonally \
    );
  }

  function checkLine(row, col, rowIncrement, colIncrement) {
    const playerSymbol = boardState[row][col];

    for (let i = -3; i <= 3; i++) {
      const newRow = row + i * rowIncrement;
      const newCol = col + i * colIncrement;

      if (
        newRow >= 0 && newRow < 7 &&
        newCol >= 0 && newCol < 7 &&
        boardState[newRow][newCol] === playerSymbol
      ) {
        if (i === 3 || i === -3) {
          highlightWinningCells(row, col, rowIncrement, colIncrement);
          return true;
        }
      } else {
        break;
      }
    }

    return false;
  }

  function highlightWinningCells(row, col, rowIncrement, colIncrement) {
    const winningCells = [];

    for (let i = -3; i <= 3; i++) {
      const newRow = row + i * rowIncrement;
      const newCol = col + i * colIncrement;

      if (
        newRow >= 0 && newRow < 7 &&
        newCol >= 0 && newCol < 7
      ) {
        winningCells.push({ row: newRow, col: newCol });
      }
    }

    showWinner(currentPlayer, winningCells);
  }

  function showWinner(winner, winningCells) {
    statusMessage.textContent = winner === 'Arka' ? 'Arka wins!' : `${currentPlayer} wins!`;

    if (winningCells) {
      winningCells.forEach(cell => {
        const { row, col } = cell;
        const cellElement = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('winner');
      });
    }

    board.removeEventListener('click', handleCellClick);
  }

  function updateScores() {
    playerScoreDisplay.textContent = `${currentPlayer}'s Score: ${playerScore} (${playerWins} Wins)`;
    arkaScoreDisplay.textContent = `Arka's Score: ${arkaScore} (${arkaWins} Wins)`;
  }

  function displayCurrentPlayer() {
    statusMessage.textContent = `Current Player: ${currentPlayer}`;
  }

   function updateLeader

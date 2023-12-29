document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const statusMessage = document.getElementById('status-message');

  const player1 = 'Arka';
  const player2 = 'You';
  let currentPlayer = player2;

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
    // Simple AI: Arka makes a random move
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
    // Check rows, columns, and diagonals for a winner
    for (let i = 0; i < 6; i++) {
      if (checkLine(boardState[i])) {
        showWinner(boardState[i][0]);
        return;
      }

      const column = boardState.map(row => row[i]);
      if (checkLine(column)) {
        showWinner(column[0]);
        return;
      }
    }

    const diagonal1 = [boardState[0][0], boardState[1][1], boardState[2][2], boardState[3][3], boardState[4][4], boardState[5][5]];
    const diagonal2 = [boardState[0][5], boardState[1][4], boardState[2][3], boardState[3][2], boardState[4][1], boardState[5][0]];

    if (checkLine(diagonal1) || checkLine(diagonal2)) {
      showWinner(diagonal1[0]);
      return;
    }

    // Check for a tie
    if (!boardState.flat().includes('')) {
      showWinner('Tie');
      return;
    }

    // Continue the game
    displayCurrentPlayer();
  }

  function checkLine(line) {
    return line[0] !== '' && line.every(cell => cell === line[0]);
  }

  function showWinner(winner) {
    if (winner === 'Tie') {
      statusMessage.textContent = 'It\'s a Tie!';
    } else {
      statusMessage.textContent = `${winner} wins!`;
    }

    board.removeEventListener('click', handleCellClick);
  }

  function displayCurrentPlayer() {
    statusMessage.textContent = `Current Player: ${currentPlayer}`;
  }

  renderBoard();
  displayCurrentPlayer();
});

  

  

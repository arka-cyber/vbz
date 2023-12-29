document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const gridSize = 6;
  let currentPlayer = 'Arka'; // Arka is the first player (robot)
  let gameBoard = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => ''));
  let gameActive = true;

  function checkWinner() {
    // Implementing winning combinations for a 6x6 board is similar to the 3x3 case
    // You can modify this based on your preferences
    // ...

    // For simplicity, let's assume no winner for now
    return null;
  }

  function isBoardFull() {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (gameBoard[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  }

  function handleRobotMove() {
    if (!gameActive) {
      return;
    }

    // Simple random move for the robot (Arka)
    let randomRow, randomCol;
    do {
      randomRow = Math.floor(Math.random() * gridSize);
      randomCol = Math.floor(Math.random() * gridSize);
    } while (gameBoard[randomRow][randomCol] !== '');

    gameBoard[randomRow][randomCol] = 'O';
    cells[randomRow * gridSize + randomCol].innerText = 'O';

    const winner = checkWinner();
    if (winner) {
      alert(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = 'User'; // Switch back to the user after Arka's move
    }
  }

  function handleClick(row, col) {
    if (!gameActive || gameBoard[row][col] !== '') {
      return;
    }

    gameBoard[row][col] = 'X'; // User's move
    cells[row * gridSize + col].innerText = 'X';

    const winner = checkWinner();
    if (winner) {
      alert(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = 'Arka'; // Switch to Arka after user's move
      handleRobotMove(); // Arka's move
    }
  }

  cells.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    cell.addEventListener('click', () => handleClick(row, col));
  });

  // Start the game with Arka's move
  handleRobotMove();
});

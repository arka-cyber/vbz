document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const statusDisplay = document.getElementById('status');
  const scoreDisplay = document.getElementById('score');
  const restartBtn = document.getElementById('restartBtn');
  const gridSize = 6;
  let currentPlayer = 'Arka'; // Arka is the first player (robot)
  let gameBoard = Array.from({ length: gridSize * gridSize }, () => '');
  let gameActive = true;
  let arkaScore = 0;
  let userScore = 0;

  function checkWinner() {
    // Implementing winning combinations for a 6x6 board is similar to the 3x3 case
    // You can modify this based on your preferences
    // ...

    // For simplicity, let's assume no winner for now
    return null;
  }

  function isBoardFull() {
    return !gameBoard.includes('');
  }

  function handleRobotMove() {
    if (!gameActive) {
      return;
    }

    // Simple random move for the robot (Arka)
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * (gridSize * gridSize));
    } while (gameBoard[randomIndex] !== '');

    gameBoard[randomIndex] = 'O';
    cells[randomIndex].innerText = 'O';

    const winner = checkWinner();
    if (winner) {
      alert(`${currentPlayer} wins!`);
      updateScore(currentPlayer);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = 'Arka'; // Switch back to Arka after user's move
      updateStatus();
    }
  }

  function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
      return;
    }

    gameBoard[index] = 'X'; // User's move
    cells[index].innerText = 'X';

    const winner = checkWinner();
    if (winner) {
      alert(`${currentPlayer} wins!`);
      updateScore(currentPlayer);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = 'User'; // Switch to the user after Arka's move
      updateStatus();
      handleRobotMove(); // Arka's move
    }
  }

  function updateStatus() {
    statusDisplay.innerText = `${currentPlayer === 'Arka' ? "Player Arka's" : "User's"} turn`;
  }

  function updateScore(player) {
    if (player === 'Arka') {
      arkaScore++;
    } else {
      userScore++;
    }
    scoreDisplay.innerText = `Score: Arka - ${arkaScore}, User - ${userScore}`;
  }

  function restartGame() {
    gameBoard = Array.from({ length: gridSize * gridSize }, () => '');
    cells.forEach(cell => {
      cell.innerText = '';
    });
    gameActive = true;
    currentPlayer = 'Arka';
    updateStatus();
    // Start the game with Arka's move after restarting
    handleRobotMove();
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
  });

  restartBtn.addEventListener('click', restartGame);

  // Start the game with Arka's move
  updateStatus();
  handleRobotMove();
});


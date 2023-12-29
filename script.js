document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    return null;
  }

  function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
      return;
    }

    gameBoard[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      alert(`Player ${winner} wins!`);
      gameActive = false;
    } else if (!gameBoard.includes('')) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
  });
});

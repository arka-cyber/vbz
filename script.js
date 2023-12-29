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

  function isBoardFull() {
    return !gameBoard.includes('');
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
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      if (currentPlayer === 'O') {
        // Arka's turn
        setTimeout(() => {
          makeArkaMove();
        }, 500);
      }
    }
  }

  function makeArkaMove() {
    // Use the minimax algorithm for Arka's move
    const bestMove = minimax(gameBoard, 'O').index;
    gameBoard[bestMove] = 'O';
    cells[bestMove].innerText = 'O';

    const winner = checkWinner();
    if (winner) {
      alert(`Player ${winner} wins!`);
      gameActive = false;
    } else if (isBoardFull()) {
      alert('It\'s a draw!');
      gameActive = false;
    } else {
      currentPlayer = 'X';
    }
  }

  function minimax(newBoard, player) {
    const emptyCells = newBoard.reduce((acc, value, index) => {
      if (value === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    if (checkWinner(newBoard) === 'X') {
      return { score: -1 };
    } else if (checkWinner(newBoard) === 'O') {
      return { score: 1 };
    } else if (emptyCells.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (const emptyCell of emptyCells) {
      const move = {};
      move.index = emptyCell;
      newBoard[emptyCell] = player;

      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[emptyCell] = '';
      moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
      let bestScore = -Infinity;
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let bestScore = Infinity;
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
  });
});


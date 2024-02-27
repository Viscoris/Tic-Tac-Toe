const playerText = document.querySelector("#playerText");
const resetBtn = document.querySelector("#reset");
const playerScore = document.querySelector(".playerScore");
const resetCounter = document.querySelector(".reset-counter");

let tiles = Array.from(document.querySelectorAll(".tile"));
let player1 = "X";
let player2 = "0";
let currentPlayer = player1;
let board = Array(9).fill("");

let score = {
  player1: 0,
  player2: 0,
};

function startGame() {
  tiles.forEach((tile) => {
    tile.addEventListener("click", tileClicked);
  });
}

function tileClicked(e) {
  // Extract the id of the clicked tile from the event
  let id = e.target.id;

  // Check if the clicked tile is not already marked
  if (!board[id]) {
    // Mark the clicked tile with the current player's symbol (X or O)
    board[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    // Check if the board is full (no more empty tiles) and handle accordingly
    boardisFull();

    // Check if there is a winning player and handle accordingly
    if (winningPlayer()) {
      // Update the playerText to announce the winning player
      playerText.innerText = `${currentPlayer} has won!`;

      // Highlight the winning tiles with a purple background
      let winningTiles = winningPlayer();
      winningTiles.map((tile) => {
        tiles[tile].style.backgroundColor = "purple";
      });

      // Remove click event listeners from all tiles to prevent further moves
      tiles.forEach((tile) => {
        tile.removeEventListener("click", tileClicked);
      });

      // Update the score based on the winning player
      if (currentPlayer === player1) {
        score.player1 += 1;
        scoring();
      } else {
        score.player2 += 1;
        scoring();
      }
    }

    // Switch to the other player for the next move
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}

let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function boardisFull() {
  if (board.every((tile) => tile !== "") && !winningPlayer()) {
    playerText.innerText = "It's a tie!";
    tiles.forEach((tile) => {
      tile.removeEventListener("click", tileClicked);
    });
  }
}

function winningPlayer() {
  for (const combination of winningCombinations) {
    let [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return;
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  board.fill("");
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.style.backgroundColor = "";
  });

  playerText.innerText = "Tic Tac Toe";
  currentPlayer = player1;
  startGame();
}
startGame();

function scoring() {
  return (playerScore.innerText = `Player1: ${score.player1} | |  Player2: ${score.player2}`);
}
resetCounter.addEventListener("click", () => {
  score.player1 = 0;
  score.player2 = 0;
  scoring();
});

const playerText = document.querySelector('#playerText')
const resetBtn = document.querySelector("#reset")
const playerScore = document.querySelector(".playerScore")
const resetCounter = document.querySelector('.reset-counter')
let tiles = Array.from(document.querySelectorAll('.tile'))

let player1 = 'X'
let player2 = '0'
let currentPlayer = player1
let board = Array(9).fill('')
let score = {
    player1: 0,
    player2: 0
}

function startGame() {
    tiles.forEach(tile => {
        tile.addEventListener('click', tileClicked)
    })
}

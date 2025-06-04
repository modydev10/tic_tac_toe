
let currentTurn = "X";
let currentTurnSpan = document.querySelector(".current-turn");
let squares = document.querySelectorAll(".item");
let gameContainer = document.querySelector('.game-container');


document.addEventListener('DOMContentLoaded', () => {
  squares.forEach((ele) => {
    ele.classList.add('hoverable');
    ele.addEventListener("click", add);
  })
})

let playAgainBtn = document.getElementById('play-again');

playAgainBtn.addEventListener('click', (e) => {
  squares.forEach((ele) => {
    ele.textContent = "";
    ele.addEventListener("click", add);
    ele.className = 'item';
    ele.classList.add('hoverable');
  })
  playAgainBtn.style.display = 'none';
  currentTurn = "X";
  currentTurnSpan.textContent = `current turn: ${currentTurn}`;
  gameContainer.style.background = '#000';
  gameFinished = false;

})

function add(e) {
  if (e.target.classList.contains("item") && e.target.childNodes.length == 0) {
    // let span = document.createElement('span');
    // span.textContent = currentTurn;
    if (currentTurn == "X") {
      e.target.classList.add('red-color');
    } else {
      e.target.classList.add('blue-color');
    }

    e.target.append(currentTurn);
    currentTurn = currentTurn == "X" ? "O" : "X";
    currentTurnSpan.textContent = `current turn: ${currentTurn}`;
    e.target.classList.remove('hoverable');
    check();
  }
}

let gameFinished = false;

function declareWinner() {
  currentTurnSpan.textContent = `${currentTurn == "X" ? "O" : "X"} won!🥳`;
  squares.forEach((ele) => ele.removeEventListener("click", add));
  playAgainBtn.style.display = 'block';


  let resultColor = currentTurn == 'X' ? 'blue' : 'red';
  gameContainer.style.background = resultColor;
  console.log(currentTurn)
  gameFinished = true;
}

function check() {

  // horizontal lines:
  if (
    squares[0].textContent != "" &&
    squares[0].textContent == squares[1].textContent &&
    squares[1].textContent == squares[2].textContent
  ) {
    declareWinner();
  } else if (
    squares[3].textContent != "" &&
    squares[3].textContent == squares[4].textContent &&
    squares[4].textContent == squares[5].textContent
  ) {
    declareWinner();
  } else if (
    squares[6].textContent != "" &&
    squares[6].textContent == squares[7].textContent &&
    squares[7].textContent == squares[8].textContent
  ) {
    declareWinner();
    // vertical lines:
  } else if (
    squares[0].textContent != "" &&
    squares[0].textContent == squares[3].textContent &&
    squares[3].textContent == squares[6].textContent
  ) {
    declareWinner();
  } else if (
    squares[1].textContent != "" &&
    squares[1].textContent == squares[4].textContent &&
    squares[4].textContent == squares[7].textContent
  ) {
    declareWinner();
  } else if (
    squares[2].textContent != "" &&
    squares[2].textContent == squares[5].textContent &&
    squares[5].textContent == squares[8].textContent
  ) {
    declareWinner();
    // cross lines:
  } else if (
    squares[0].textContent != "" &&
    squares[0].textContent == squares[4].textContent &&
    squares[4].textContent == squares[8].textContent
  ) {
    declareWinner();
  } else if (
    squares[2].textContent != "" &&
    squares[2].textContent == squares[4].textContent &&
    squares[4].textContent == squares[6].textContent
  ) {
    declareWinner();
  }

  let allEmpty = true;
  squares.forEach(ele => {
    if (ele.childNodes.length == 0) {
      allEmpty = false;
    }
  })
  if (allEmpty && gameFinished == false) {
    declareWinner();
    currentTurnSpan.textContent = "it's a tie";
    gameContainer.style.background = 'orange';
  }
}

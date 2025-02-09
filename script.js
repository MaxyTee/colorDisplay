"use strict";
const colorBox = document.querySelector(".colorBox");
const colorBoxNew = document.querySelector(".colorBoxNew");
const container = document.querySelector(".container");
const containerTwo = document.querySelector(".container-2");
const colorOptions = document.querySelector(".colorOptions");
const colorOptionNew = document.querySelector(".colorOptionNew");
const gameStatus = document.querySelector(".gameStatus");
const scoreDisplay = document.querySelector(".scoreNum");
const newGameButton = document.querySelector(".newGame");
const emojis = document.querySelectorAll(".color");
const happy = document.querySelector(".happy-emoji");
const sad = document.querySelector(".sad-emoji");

let score = 0;
let targetColor = "";
let targetColorNew = "";
const generateRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 255 + 1)}, ${Math.floor(
    Math.random() * 255 + 1
  )}, ${Math.floor(Math.random() * 255 + 1)})`;
};

const colorChange = function () {
  colorOptions.innerHTML = "";
  // gameStatus.textContent = "";
  const colors = Array.from({ length: 6 }, generateRandomColor);
  targetColor = colors[Math.floor(Math.random() * colors.length)];

  colorBox.style.backgroundColor = targetColor;

  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.dataset.testid = "colorOption";
    button.className = "colorOption";
    button.addEventListener("click", () => checkGuess(color));

    colorOptions.appendChild(button);
    // colorOptionNew.appendChild(button);
  });
};

const colorChangeMain = function () {
  colorOptionNew.innerHTML = "";
  const colorsNew = Array.from({ length: 12 }, generateRandomColor);
  targetColorNew = colorsNew[Math.floor(Math.random() * colorsNew.length)];

  colorBoxNew.style.backgroundColor = targetColorNew;

  colorsNew.forEach((color, i) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.dataset.testid = "colorOption";
    button.className = `colorOptionN position${i}`;
    button.addEventListener("click", () => checkGuessNew(color));
    colorOptionNew.appendChild(button);
  });
};

const Rotate = setInterval(() => {
  colorChange();
}, 6000);

const startGame = () => {
  colorChange();
  colorChangeMain();
};

const newGame = function () {
  container.classList.add("hidden");
  containerTwo.classList.remove("hidden");

  document.body.style.backgroundColor = "orange";
  emojis.forEach((color) => {
    color.textContent = "";
  });
};

const checkGuess = (selectedColor) => {
  console.log("Correct");
  if (selectedColor === targetColor) {
    console.log("Correct");
    colorChange();
    colorChangeMain();

    console.log(targetColor);

    gameStatus.textContent = "Correct";
    score++;
    scoreDisplay.textContent = score;
    emojis.forEach((color) => {
      color.textContent = happy.textContent;
      color.addEventListener("click", newGame);
    });
  } else {
    console.log("Wrong");
    gameStatus.textContent = "Wrong! Try again";
    emojis.forEach((color) => {
      color.textContent = sad.textContent;
    });
  }
};

newGameButton.addEventListener("click", function () {
  score = 0;
  scoreDisplay.textContent = score;
  gameStatus.textContent = "";
  emojis.forEach((color) => {
    color.textContent = "";
  });
  colorChange();
  colorChangeMain();
});
startGame();

////////////////////////////////////////////////////////////
//MainGame Code
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// Starting condintion
let scores, currentScore, activePlayer, playing, colorRotate;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  colorRotate = setInterval(() => {
    colorChangeMain();
    console.log("Changed");
  }, 6000);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const checkGuessNew = (selectedColor) => {
  console.log("Correct");
  if (selectedColor === targetColorNew) {
    currentScore++;
    colorChangeMain();
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    console.log("wrong");
    switchPlayer();
  }
};

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      clearInterval(colorRotate);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

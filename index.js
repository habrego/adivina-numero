window.onload = () => {
  document.getElementById("submit-button").onclick = guess;
  document.getElementById("guess-input").addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("submit-button").click();
    }
  });
  document.getElementById("restart-button").onclick = restart;
  window.addEventListener('resize', resizeWindow);
  createNumbers();
  setTargetNumber();
  // just start on some number, doesnt matter
  gotoNumber((Math.round(Math.random() * 80) + 7));
}

var MAX = 100;
var target, lastGuess;

function setTargetNumber() {
  target = Math.floor((Math.random() * MAX) + 1);
}

function restart() {
  document.getElementById("guess-input").value = "";
  resetNumbers();
  setTargetNumber();
  clearGuesses();
  updateMessage("Digite un número entre 1 y 100...");
}

function resizeWindow() {
  if (lastGuess) {
    gotoNumber(lastGuess);
  }
}

function gotoNumber(n) {
  let nWidth = 70;
  let w = window.innerWidth;
  let offsetNumber1 = (w / 2) - (nWidth / 2);
  let offset = offsetNumber1 - ((n - 1) * nWidth);
  document.getElementById('numbers').style.left = offset + 'px';
}

function createNumbers() {
  for(let i = 1; i <= MAX; i++) {
    document.getElementById("numbers").innerHTML+=
      '<div class="number light" id="n' + i + '">' + i + '</div>';
  }
}

function updateMessage(msg) {
  document.getElementById("message").innerHTML = msg;
}

function addGuessToHistory(guess) {
  let lohi = "";
  if (guess < target) {
    lohi = "&darr;"
  } else if (guess > target) {
    lohi = "&uarr;"
  }
  document.getElementById("guesses").innerHTML += "<div>" + guess + lohi + "</div>";
}

function clearGuesses() {
  document.getElementById("guesses").innerHTML="";
}

function guess() {
  let guess = Math.min(100, Number(document.getElementById("guess-input").value));
  guess = Math.max(1, guess);
  lastGuess = guess;
  addGuessToHistory(guess);
  gotoNumber(guess);
  // resetNumbers();
  if (guess < target) {
    dimLow = 1;
    dimHigh = Math.max(guess, 1);
    updateMessage("muy bajo");
  } else if (guess > target) {
    dimLow = Math.min(guess, MAX);
    dimHigh = MAX;
    updateMessage("muy alto");
  } else {
    dimNumbers(1, MAX);
    document.getElementById("n" + guess).className = 'Número correcto';
    updateMessage("¡Encontró el número!");
    return;
  }
  dimNumbers(dimLow, dimHigh);
}

function dimNumbers(low, high) {
  for(let i = low; i <= high; i++) {
    document.getElementById("n" + i).className = 'number dark';
  }
}

function resetNumbers() {
  for(let i = 1; i <= MAX; i++) {
    document.getElementById("n" + i).className = 'number light';
  }
}  

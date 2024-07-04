var timerInterval;
var gameEnded = false;

function swapTiles(cell1, cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;
}

function shuffle() {
  // Use nested loops to access each cell of the 3x3 grid
  for (var row = 1; row <= 3; row++) { // For each row of the 3x3 grid
    for (var column = 1; column <= 3; column++) { // For each column in this row
      var row2 = Math.floor(Math.random() * 3 + 1); // Pick a random row from 1 to 3
      var column2 = Math.floor(Math.random() * 3 + 1); // Pick a random column from 1 to 3
      swapTiles("cell" + row + column, "cell" + row2 + column2); // Swap the look & feel of both cells
    }
  }
}

function clickTile(row, column) {
  if (gameEnded) return;

  var cell = document.getElementById("cell" + row + column);
  var tile = cell.className;
  if (tile != "tile9") {
    // Checking if white tile on the right
    if (column < 3) {
      if (document.getElementById("cell" + row + (column + 1)).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + row + (column + 1));
        checkWin();
        return;
      }
    }
    // Checking if white tile on the left
    if (column > 1) {
      if (document.getElementById("cell" + row + (column - 1)).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + row + (column - 1));
        checkWin();
        return;
      }
    }
    // Checking if white tile is above
    if (row > 1) {
      if (document.getElementById("cell" + (row - 1) + column).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + (row - 1) + column);
        checkWin();
        return;
      }
    }
    // Checking if white tile is below
    if (row < 3) {
      if (document.getElementById("cell" + (row + 1) + column).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + (row + 1) + column);
        checkWin();
        return;
      }
    }
  }
}

function startTimer() {
  var timer = document.getElementById("timer");
  var retryButton = document.getElementById("retryButton");
  var timeLeft = 120; // 2 minutes in seconds

  timerInterval = setInterval(function () {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    // Display the timer
    timer.innerHTML = "Kalan süre: " +
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timer.innerHTML = "Time's up!";
      retryButton.style.display = "inline-block"; // Show the retry button
      endGame();
    }

    timeLeft -= 1;
  }, 1000);
}

function retry() {
  shuffle();
  document.getElementById("retryButton").style.display = "none"; // Hide the retry button
  document.getElementById("nextPageButton").style.display = "none"; // Hide the next page button
  gameEnded = false;
  startTimer();
}

function nextPage() {
  // Add your logic for navigating to the next page here
  window.location.href = "../sonsayfa/index.html"; // Example navigation, change as needed
}

function checkWin() {
  var win = true;
  var tiles = [
    "tile1", "tile2", "tile3",
    "tile4", "tile5", "tile6",
    "tile7", "tile8", "tile9"
  ];
  for (var row = 1; row <= 3; row++) {
    for (var column = 1; column <= 3; column++) {
      var cell = document.getElementById("cell" + row + column);
      if (cell.className !== tiles.shift()) {
        win = false;
        break;
      }
    }
  }
  if (win) {
    document.getElementById("nextPageButton").style.display = "inline-block";
    endGame();
  }
}

function endGame() {
  gameEnded = true;
  clearInterval(timerInterval);
  document.getElementById("retryButton").style.display = gameEnded && document.getElementById("nextPageButton").style.display == "none" ? "inline-block" : "none";
}

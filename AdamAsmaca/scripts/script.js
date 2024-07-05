const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const nextButton = document.createElement("button");
const retryButton = document.createElement("button");
const maxGuesses = 6;

let currentWordIndex = 0;
let correctLetters = [];
let wrongGuessCount = 0;

nextButton.innerText = "Sıradaki Soru";
nextButton.classList.add("next-btn");
document.body.appendChild(nextButton);
nextButton.style.display = "none";

retryButton.innerText = "Tekrar Dene";
retryButton.classList.add("retry-btn");
document.body.appendChild(retryButton);
retryButton.style.display = "none";

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/0.png";  // Changed from hangman-0.svg to 0.png
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    nextButton.style.display = "none";
    retryButton.style.display = "none";
}

const getNextWord = () => {
    if (currentWordIndex < wordList.length) {
        const { word, hint } = wordList[currentWordIndex];
        currentWord = word;
        document.querySelector(".hint-text b").innerText = hint;
        resetGame();
    } else {
        nextButton.innerText = "İleri";
        nextButton.style.display = "block";
        nextButton.onclick = () => window.location.href = "../imageMatching/play.html"; // Redirect to the next page
    }
}

const gameOver = (isVictory) => {
    if (isVictory) {
        nextButton.style.display = "block";
        currentWordIndex++;
    } else {
        retryButton.style.display = "block";
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
    }
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/${wrongGuessCount}.png`;  // Changed from hangman-${wrongGuessCount}.svg to ${wrongGuessCount}.png
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

retryButton.addEventListener("click", getNextWord);
nextButton.addEventListener("click", getNextWord);
getNextWord();

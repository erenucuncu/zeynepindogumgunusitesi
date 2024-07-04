let backgroundMusic = new Audio('./assets/sound/background.ogg');
backgroundMusic.volume = 0.5;
backgroundMusic.loop = true;

let flipSound = new Audio('./assets/sound/flip.ogg');
let matchSound = new Audio('./assets/sound/match.ogg');
let notMatchSound = new Audio('./assets/sound/notmatch.ogg');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardLeft;
let interval = null;

const board = document.getElementById('board');
const startButton = document.getElementById('startButton');

// Ensure the start button is properly linked to the startGame function
startButton.addEventListener('click', startGame);

function createCards() {
    let cardHTML = '';
    for (let i = 0; i < 18; i++) {
        cardHTML += `
        <div class="cards" data-framework="resim${i}">
            <img class="front-face" src="assets/img/resim${i}.png" alt="resim${i}" />
            <div class="back-face"></div>
        </div>
        <div class="cards" data-framework="resim${i}">
            <img class="front-face" src="assets/img/resim${i}.png" alt="resim${i}" />
            <div class="back-face"></div>
        </div>`;
    }
    board.innerHTML = cardHTML;
    cardLeft = document.querySelectorAll('.cards').length;
}

function flipCard() {
    flipSound.play();

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;
    checkForMatch();
    isFinish();
}

function isFinish() {
    if (cardLeft === 0) {
        backgroundMusic.pause();
        clearInterval(interval);
        document.getElementById('nextButton').style.display = 'block';
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchSound.play();

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardLeft -= 2;

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    notMatchSound.play();

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
    const cards = document.querySelectorAll('.cards');
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 36);
        card.style.order = randomPos;
    });
}

function time() {
    let timeRemaining = 180; // 2 minutes
    interval = setInterval(() => {
        timeRemaining--;
        document.getElementById('time-remaining').innerHTML = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(interval);
            backgroundMusic.pause();
            document.getElementById('retryButton').style.display = 'block';
            const cards = document.querySelectorAll('.cards');
            cards.forEach(card => card.removeEventListener('click', flipCard));
        }
    }, 1000);
}

function startGame() {
    backgroundMusic.play();
    startButton.style.display = 'none'; // Hide the start button
    createCards();
    shuffleCards();

    time();

    const cards = document.querySelectorAll('.cards');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function retryGame() {
    // Reset the game state
    cardLeft = document.querySelectorAll('.cards').length;
    document.getElementById('time-remaining').innerHTML = '120';
    document.getElementById('retryButton').style.display = 'none';
    document.getElementById('nextButton').style.display = 'none';
    
    const cards = document.querySelectorAll('.cards');
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    resetBoard();
    startGame();
}

// Remove the immediate startGame call
// startGame();

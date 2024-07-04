document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const tryAgainButton = document.getElementById("tryAgain");
    const nextButton = document.getElementById("nextButton");

    let timer;
    let score = 0;
    let countdown;
    let moleInterval;
    let gameOver = true;

    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole');
            hole.removeEventListener('click', handleMoleClick);
        });

        let random = holes[Math.floor(Math.random() * holes.length)];
        random.classList.add('mole');
        random.addEventListener('click', handleMoleClick);
    }

    function handleMoleClick() {
        if (!gameOver) {
            score++;
            scoreDisplay.textContent = `Skor: ${score}`;
            
            if (score >= 60) {
                nextButton.style.display = 'block';
                endGame();
            }
        }
        this.classList.remove('mole');
    }

    function startGame() {
        if (!gameOver) {
            return;
        }

        gameOver = false;
        score = 0;
        scoreDisplay.textContent = `Skor: ${score}`;
        timer = 120;
        timerDisplay.textContent = `Kalan Süre: ${timer}s`;

        startButton.style.display = 'none';
        tryAgainButton.style.display = 'none';
        nextButton.style.display = 'none';

        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Kalan Süre: ${timer}s`;

            if (timer <= 0) {
                endGame();
            }
        }, 1000);

        moleInterval = setInterval(() => {
            if (!gameOver) comeout();
        }, 1000);

        console.log("Game started");
    }

    function endGame() {
        clearInterval(countdown);
        clearInterval(moleInterval);
        gameOver = true;

        holes.forEach(hole => {
            hole.classList.remove('mole');
            hole.removeEventListener('click', handleMoleClick);
        });

        if (score < 60) {
            tryAgainButton.style.display = 'block';
            startButton.style.display = 'none';
        }

        scoreDisplay.textContent = `Skor: ${score}`;
        timerDisplay.textContent = `Kalan Süre: ${timer}s`;
    }

    function tryAgain() {
        startGame();
    }

    function nextLevel() {
    window.location.href = "../HatirlamaOyunu/index.html";
}
    startButton.addEventListener("click", startGame);
    tryAgainButton.addEventListener("click", tryAgain);
    nextButton.addEventListener("click", nextLevel);
});

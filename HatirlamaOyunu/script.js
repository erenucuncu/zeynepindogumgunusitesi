let powerOn = false;
const sequence = [];
let userSequence = [];
let level = 1;

const levelCount = document.querySelector('.level-count');
const startBtn = document.getElementById('start-btn');
const retryBtn = document.getElementById('retry-btn');
const nextBtn = document.getElementById('next-btn');

function startGame() {
	sequence.length = 0;
	userSequence.length = 0;
	level = 1;
	levelCount.textContent = level;
	nextRound();
	startBtn.style.display = 'none';
	retryBtn.style.display = 'none';
	nextBtn.style.display = 'none';
	powerOn = true;
}

function nextRound() {
	addToSequence();
	playSequence();
}

function addToSequence() {
	const randomColor = Math.floor(Math.random() * 4) + 1;
	sequence.push(randomColor);
}

function playSequence() {
	let i = 0;
	const intervalId = setInterval(() => {
		highlightButton(sequence[i]);
		i++;
		if (i >= sequence.length) {
			clearInterval(intervalId);
			enableButtons();
		}
	}, 1000);
}

function handleClick(button) {
	if (powerOn) {
		const userColor = button.getAttribute("data-color");
		userSequence.push(Number(userColor));
		highlightButton(userColor);
		if (!checkSequence()) {
			showRetryButton();
		} else if (userSequence.length === sequence.length) {
			userSequence = [];
			level++;
			levelCount.textContent = level;
			if (level > 8) {
				showNextButton();
			} else {
				setTimeout(() => nextRound(), 1000);
			}
		}
	}
}

function checkSequence() {
	for (let i = 0; i < userSequence.length; i++) {
		if (userSequence[i] !== sequence[i]) {
			return false;
		}
	}
	return true;
}

function highlightButton(color) {
	const button = document.querySelector(`[data-color="${color}"]`);
	button.classList.add('highlighted');
	setTimeout(() => {
		button.classList.remove('highlighted');
	}, 300);
}

function enableButtons() {
	const buttons = document.querySelectorAll('.simon-btn');
	buttons.forEach(button => button.removeAttribute('disabled'));
}

function disableButtons() {
	const buttons = document.querySelectorAll('.simon-btn');
	buttons.forEach(button => button.setAttribute('disabled', 'true'));
}

function showRetryButton() {
	retryBtn.style.display = 'block';
	startBtn.style.display = 'none';
	powerOn = false;
	disableButtons();
}

function showNextButton() {
	nextBtn.style.display = 'block';
	powerOn = false;
	disableButtons();
}

function goToNextPage() {
	window.location.href = '../AdamAsmaca/index.html';
}

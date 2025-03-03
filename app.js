let level = 1;
let attempts = 0;
let score = 0;
let levelScore = 0;
let maxAttempts = Math.round(level * 0.5);
let guess = 0;
let maxGuess = 2 ** level;
let secret = randomInt(1, maxGuess);
let feedback = "";
let maxText = document.getElementById("max");
let scoreText = document.getElementById("score");
let attemptsText = document.getElementById("attempts");
let levelText = document.getElementById("level");
let guessText = document.getElementById("guess");
let startButton = document.getElementById("start-button");
let guessButton = document.getElementById("guess-button");
let feedbackText = document.getElementById("feedback");
startButton.addEventListener("click", startGame);
guessButton.addEventListener("click", checkGuess);
function randomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}
function startGame() {
    level = 1;
    attempts = 0;
    score = 0;
    levelScore = 0;
    maxAttempts = Math.round(level * 0.5);
    guess = 0;
    maxGuess = 2 ** level;
    secret = randomInt(1, maxGuess);
    feedback = "";
    maxText.textContent = maxGuess;
    scoreText.textContent = score;
    attemptsText.textContent = attempts;
    levelText.textContent = level;
    guessText.max = maxGuess;
    guessText.value = guess;
    startButton.disabled = true;
    guessButton.disabled = false;
}
function checkGuess() {
    guess = parseInt(guessText.value);
    if (guess != secret) {
        if (guess > secret) {
            feedback = "Too high!";
        } else {
            feedback = "Too low!";
        }
        levelScore += maxGuess * Math.min(Math.max(guess, 1) / Math.max(secret, 1), Math.max(secret, 1) / Math.max(guess, 1));
        attempts++;
        if (attempts >= maxAttempts) {
            alert("Game over! Your score is " + score + ".");
            level = 1;
            attempts = 0;
            score = 0;
            levelScore = 0;
            maxAttempts = Math.round(level * 0.5);
            guess = 0;
            maxGuess = 2 ** level;
            secret = randomInt(1, maxGuess);
            feedback = "Game over!";
            maxText.textContent = maxGuess;
            scoreText.textContent = score;
            attemptsText.textContent = attempts;
            levelText.textContent = level;
            guessText.max = maxGuess;
            startButton.disabled = false;
            guessButton.disabled = true;
        }
    }
    else {
        feedback = "You guessed correctly! + " + levelScore + " points!";
        score += Math.round(levelScore * (maxAttempts - attempts + 1) / (attempts + 1) * maxAttempts);
        level++;
        levelScore = 0;
        maxAttempts = Math.round(level * 0.5);
        maxGuess = 2 ** level;
        secret = randomInt(1, maxGuess);
        maxText.textContent = maxGuess;
        scoreText.textContent = score;
        attemptsText.textContent = attempts;
        levelText.textContent = level;
        guessText.max = maxGuess;
    }
}

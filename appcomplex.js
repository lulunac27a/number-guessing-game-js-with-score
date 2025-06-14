const game = () => {
    const randomInt = (minimum, maximum) => {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };
    const startGame = () => {
        level = 1;
        attempts = 0;
        score = 0;
        levelScore = 0;
        maxAttempts =
            modeButton.value === "attempts"
                ? attemptsLimit
                : Math.max(Math.ceil(level * difficultyMultiplier));
        guess = 0;
        maxGuess = 2 ** level;
        secret = randomInt(1, maxGuess);
        feedbackText.textContent = "";
        maxText.textContent = maxGuess;
        scoreText.textContent = score;
        attemptsText.textContent = maxAttempts - attempts;
        levelText.textContent = level;
        guessText.max = maxGuess;
        guessText.value = guess;
        startButton.disabled = true;
        guessButton.disabled = false;
    };
    const checkGuess = () => {
        guess = parseInt(guessText.value, 10);
        if (guess !== secret) {
            if (guess > secret) {
                feedbackText.textContent = "Too high!";
            } else {
                feedbackText.textContent = "Too low!";
            }
            levelScore +=
                maxGuess *
                Math.pow(
                    Math.min(
                        Math.max(guess, 1) / Math.max(secret, 1),
                        Math.max(secret, 1) / Math.max(guess, 1),
                    ),
                    2,
                ) *
                (1 -
                    Math.pow(
                        Math.abs(secret - guess) /
                            Math.max(secret, maxGuess - secret + 1),
                        1.5,
                    )) *
                (guess < secret
                    ? Math.pow(guess / secret, 1.5)
                    : Math.pow(
                          (maxGuess - guess + 1) / (maxGuess - secret + 1),
                          1.5,
                      ));
            attempts++;
            attemptsText.textContent = maxAttempts - attempts;
            if (attempts >= maxAttempts) {
                feedbackText.textContent =
                    "Game over! Your score is " + score + ".";
                level = 1;
                attempts = 0;
                score = 0;
                levelScore = 0;
                maxAttempts =
                    modeButton.value === "attempts"
                        ? attemptsLimit
                        : Math.max(Math.ceil(level * difficultyMultiplier));
                guess = 0;
                maxGuess = 2 ** level;
                secret = randomInt(1, maxGuess);
                maxText.textContent = maxGuess;
                scoreText.textContent = score;
                attemptsText.textContent = maxAttempts - attempts;
                levelText.textContent = level;
                guessText.max = maxGuess;
                startButton.disabled = false;
                guessButton.disabled = true;
            }
        } else {
            feedbackText.textContent =
                "You guessed correctly! +" +
                Math.round(
                    (((levelScore + maxGuess) *
                        Math.pow(maxAttempts - attempts + 1, 1.5)) /
                        Math.pow(attempts + 1, 1.2)) *
                        maxAttempts,
                ) +
                " points!";
            levelScore += maxGuess;
            score += Math.round(
                ((levelScore * Math.pow(maxAttempts - attempts + 1, 1.5)) /
                    Math.pow(attempts + 1, 1.2)) *
                    maxAttempts,
            );
            level++;
            levelScore = 0;
            attempts = 0;
            maxAttempts =
                modeButton.value === "attempts"
                    ? attemptsLimit
                    : Math.max(Math.ceil(level * difficultyMultiplier));
            maxGuess = 2 ** level;
            secret = randomInt(1, maxGuess);
            maxText.textContent = maxGuess;
            scoreText.textContent = score;
            attemptsText.textContent = maxAttempts - attempts;
            levelText.textContent = level;
            guessText.max = maxGuess;
        }
    };
    let level = 1;
    let difficultyMultiplier = 1;
    let attempts = 0;
    let attemptsLimit = 10;
    let score = 0;
    let levelScore = 0;
    const modeButton = document.getElementById("mode");
    let maxAttempts =
        modeButton.value === "attempts"
            ? attemptsLimit
            : Math.max(Math.ceil(level * difficultyMultiplier), 1);
    let guess = 0;
    let maxGuess = 2 ** level;
    let secret = randomInt(1, maxGuess);
    const maxText = document.getElementById("max");
    const scoreText = document.getElementById("score");
    const attemptsText = document.getElementById("attempts");
    const levelText = document.getElementById("level");
    const guessText = document.getElementById("guess");
    const startButton = document.getElementById("start-button");
    const guessButton = document.getElementById("guess-button");
    const difficultyButton = document.getElementById("difficulty");
    switch (difficultyButton.value) {
        case "easy":
            difficultyMultiplier = 1;
            attemptsLimit = 10;
            break;
        case "medium":
            difficultyMultiplier = 0.75;
            attemptsLimit = 8;
            break;
        case "hard":
            difficultyMultiplier = 0.5;
            attemptsLimit = 5;
            break;
        case "expert":
            difficultyMultiplier = 0.25;
            attemptsLimit = 3;
            break;
    }
    const feedbackText = document.getElementById("feedback");
    startButton.addEventListener("click", startGame);
    guessButton.addEventListener("click", checkGuess);
};
game();

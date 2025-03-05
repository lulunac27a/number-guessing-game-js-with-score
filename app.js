const game = () => {
  let level = 1; //set initial level to 1
  let attempts = 0; //set attempts to 0
  let score = 0; //set score to 0
  let levelScore = 0; //set level score to 0
  let maxAttempts = Math.round(level * 0.5); //set max attempts based on level and difficulty
  let guess = 0; //set initial guess value to 0
  let maxGuess = 2 ** level; //set max guess value to 2 raised to level
  let secret = randomInt(1, maxGuess); //set secret value to random integer between 1 and max guess value
  const maxText = document.getElementById("max"); //max guess value text
  const scoreText = document.getElementById("score"); //score text
  const attemptsText = document.getElementById("attempts"); //attempts text
  const levelText = document.getElementById("level"); //level text
  const guessText = document.getElementById("guess"); //guess value text
  const startButton = document.getElementById("start-button"); //start button
  const guessButton = document.getElementById("guess-button"); //guess button
  const feedbackText = document.getElementById("feedback"); //feedback text
  startButton.addEventListener("click", startGame); //start game when start button is clicked
  guessButton.addEventListener("click", checkGuess); //check guess when guess button is clicked
  const randomInt = (minimum, maximum) => {
    //get random integer
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  };
  const startGame = () => {
    //start game
    level = 1; //set initial level to 1
    attempts = 0; //set attempts to 0
    score = 0; //set score to 0
    levelScore = 0; //set level score to 0
    maxAttempts = Math.round(level * 0.5); //set max attempts based on level and difficulty
    guess = 0; //set initial guess value to 0
    maxGuess = 2 ** level; //set max guess value to 2 raised to level
    secret = randomInt(1, maxGuess); //set secret value to random integer between 1 and max guess value
    feedbackText.textContent = "";
    maxText.textContent = maxGuess;
    scoreText.textContent = score;
    attemptsText.textContent = attempts;
    levelText.textContent = level;
    guessText.max = maxGuess;
    guessText.value = guess;
    startButton.disabled = true; //disable start button
    guessButton.disabled = false; //enable guess button
  };
  const checkGuess = () => {
    //check guess
    guess = parseInt(guessText.value, 10); //get guess value from input
    if (guess !== secret) {
      //check if guess is equal to secret number
      if (guess > secret) {
        //too high
        feedbackText.textContent = "Too high!";
      } else {
        //too low
        feedbackText.textContent = "Too low!";
      }
      levelScore +=
        maxGuess *
        Math.min(
          Math.max(guess, 1) / Math.max(secret, 1),
          Math.max(secret, 1) / Math.max(guess, 1),
        ) *
        (1 -
          Math.abs(secret - guess) / Math.max(secret, maxGuess - secret + 1)) *
        (guess < secret
          ? guess / secret
          : (maxGuess - guess + 1) / (maxGuess - secret + 1)); //increase level score
      attempts++;
      if (attempts >= maxAttempts) {
        //if all attempts used reset game to initial state
        feedbackText.textContent = "Game over! Your score is " + score + ".";
        level = 1;
        attempts = 0;
        score = 0;
        levelScore = 0; //set level score to 0
        maxAttempts = Math.round(level * 0.5);
        guess = 0;
        maxGuess = 2 ** level;
        secret = randomInt(1, maxGuess);
        maxText.textContent = maxGuess;
        scoreText.textContent = score;
        attemptsText.textContent = attempts;
        levelText.textContent = level;
        guessText.max = maxGuess;
        startButton.disabled = false; //enable start button
        guessButton.disabled = true; //disable guess button
      }
    } else {
      //if guess is equal to secret number
      feedbackText.textContent =
        "You guessed correctly! +" +
        Math.round(
          (((levelScore + maxGuess) * (maxAttempts - attempts + 1)) /
            (attempts + 1)) *
            maxAttempts,
        ) +
        " points!";
      levelScore += maxGuess;
      score += Math.round(
        ((levelScore * (maxAttempts - attempts + 1)) / (attempts + 1)) *
          maxAttempts,
      ); //increase score by level score
      level++; //increase level by 1
      levelScore = 0; //set level score to 0
      attempts = 0; //set attempts to 0
      maxAttempts = Math.round(level * 0.5); //increase max attempts by 0.5
      maxGuess = 2 ** level; //increase max guess number by double
      secret = randomInt(1, maxGuess); //get random secret guess number
      maxText.textContent = maxGuess;
      scoreText.textContent = score;
      attemptsText.textContent = attempts;
      levelText.textContent = level;
      guessText.max = maxGuess;
    }
  };
};
game();

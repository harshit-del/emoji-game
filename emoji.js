const emojiDetails = [
    {description: "Smiling face with sunglasses", emoji:'😎' },
    { description: "Thumbs up", emoji: "👍" },
    { description: "Heart eyes", emoji: "😍" },
    { description: "Crying face", emoji: "😢" },
    { description: "Party popper", emoji: "🎉" },
    // If you want you can add more emoji descriptions here
  ];


  let currentEmojiIndex = 0;
  let score = 0;
  let seconds = 30;
  let timer;
  let flag = true;


  //Accessing all the elements
  const timerElement = document.getElementById("timer");
  const guessInput = document.getElementById("guess-input");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const descriptionElement = document.getElementById("description");

  //function to display emoji
  function displayEmoji() {
    descriptionElement.innerHTML = emojiDetails[currentEmojiIndex].emoji;
    timerElement.textContent = `Time: ${seconds}s`;
  }

  //function to check whether the user has guessed the emoji correctly or wrongly and will get the score incremented based on that.
  function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const correctEmoji = emojiDetails[currentEmojiIndex].description.trim().toLowerCase();

    if (guess === correctEmoji) {
      resultElement.textContent = "Correct!";
      score++;
    } else {
      resultElement.textContent = "Wrong!";
    }
    console.log(score);
    scoreElement.textContent = `Score: ${score}`;
    guessInput.value = "";
    guessInput.focus();
    nextEmoji();
  }

  //function to display next emoji
  function nextEmoji() {
    currentEmojiIndex++;
    setTimeout(()=>{
      resultElement.textContent = "";
    },1000)

    if (currentEmojiIndex === emojiDetails.length) {
      flag = false;
      endGame();
    }
    
    if (flag){
      displayEmoji();
    }
    
  }

  //Adding event listener on input box where when user will enter the emoji name and press enter to check whether he/she has guessed correctly or not.
  document.getElementById("guess-input").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        checkGuess();
      }
    });

  //Adding event listener on document so that whenever the content gets loaded, the first emoji will be displayed and the timer will start.  
  document.addEventListener("DOMContentLoaded", () => {
    displayEmoji();
    startTimer();
  });
  
  //function to start the timer
  function startTimer() {
    timer = setInterval(() => {
      seconds--;
      timerElement.textContent = `Time: ${seconds}s`;

      if (seconds <= 0) {
        endGame();
      }

    }, 1000);
  }

  //function to end the game 
  function endGame() {
    clearInterval(timer);
    descriptionElement.textContent = "";
    document.getElementById("guess-input").remove();
    timerElement.textContent="";
  }
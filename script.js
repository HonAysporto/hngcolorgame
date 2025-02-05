const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let score = 0;
let targetColor;

// Predefined set of colors
const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF",
  "#FFA500", "#800080", "#008000", "#800000", "#008080", "#000080"
];

// Function to generate a random color from the predefined set
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous options
  colorOptions.innerHTML = '';

  // Generate 6 color options with the target color
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  options.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.dataset.color = color;
    button.addEventListener('click', handleGuess);
    colorOptions.appendChild(button);
  });

  gameStatus.textContent = "Make your guess!";
}

// Function to handle player's guess
function handleGuess(event) {
  const guessedColor = event.target.dataset.color;
  if (guessedColor === targetColor) {
    gameStatus.textContent = "Correct!";
   
    
    score++;
    scoreElement.textContent = score;
    event.target.classList.add('correct');
    setTimeout(() => {
      initGame();
    }, 1000);
    
   
    setBackgroundEffect('green')
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    event.target.classList.add('wrong');
    setBackgroundEffect('red')
  }

  
}

// Event listener for the new game button
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreElement.textContent = score;
  initGame();
});

function setBackgroundEffect(color) {
  document.body.style.animation = "backgroundBlink 1s";
  document.body.style.backgroundColor = color;
  setTimeout(() => {
    document.body.style.backgroundColor = "";
  }, 1000);
}

// Initialize the game on page load
initGame();
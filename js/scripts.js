var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

var gameState = 'notStarted', //  started 
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        pickRock.disabled = false;
        pickPaper.disabled = false;
        pickScissors.disabled = false;
      break;
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

function newGame() {
  player.name = prompt('Please enter your name', 'your name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    checkFinalResult();
} 

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none';
    } else if (
        (computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock')) {
        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}

function checkFinalResult() {
    if (player.score === 3) {
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        newGameBtn.innerHTML = "Congratulations! You win! Click to play again";
        
    } else if (computer.score === 3) {
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        newGameBtn.innerHTML = "I'm sorry, You lose :( Click to play again";
    }
}

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
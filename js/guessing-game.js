/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

*/
function createWinningNum() {
   return 12 // Math.floor(Math.random() * 100);
}

let winningNumber = createWinningNum();
let guessArray = [];


function validateInput(input) {
    if (guessArray.length >= 5) {
        return false;
    }

    if (input === NaN) {
        return false;
    }

    if (input < 1 || input > 100) {
        return false;
    }

    if (guessArray.includes(input)) {
        return false;
    }

    return true;
}


function addGuess(playerInput) {

    let guessList = document.getElementById('guessList');

    let guess = document.createElement('li');
    guess.appendChild(document.createTextNode(playerInput));

    guessList.appendChild(guess);

    guessArray.push(playerInput);
}

function endGame(status) {
    document.getElementById('playerStatus').innerText = status;

    document.getElementById('playerInputButton').disabled = true;

    document.getElementById('reset').style.visibility = "visible";
}

function tempCheck(playerInput) {
    let diff = Math.abs(winningNumber - playerInput);
    let temp = "";
    let guessElevation = "";

    if (diff <= 5) {
        temp = "You're hot!";
    } else if (diff <= 10) {
        temp = "You're warm...";
    } else {
        temp = "#$%*! You're cold!";
    }

    if (winningNumber < playerInput) {
        guessElevation = "Guess Lower!"
    }else{
        guessElevation = "Guess Higher!"
    }

    document.getElementById('playerStatus').innerText = temp + " " + guessElevation;
}

function reset() {
    guessArray = [];
    winningNumber = createWinningNum();
    document.getElementById('reset').style.visibility = "hidden";
    document.getElementById('playerInputButton').disabled = false;
    document.getElementById('playerInputArea').value = "";
    document.getElementById('playerStatus').innerText = "";
    document.getElementById('guessList').innerHTML = "";
}

function guessClick() {

    let playerInput = document.getElementById('playerInputArea').value;

    if (!validateInput(playerInput)) {
        document.getElementById('playerStatus').innerText = "Invalid Input.  Try again.";
        return;
    } else {
        addGuess(playerInput);
        document.getElementById('playerInputArea').value = "";
    }

    if (playerInput == winningNumber) {
        endGame("CONGRATULATIONS!!! You've escaped!");
    } else if (guessArray.length === 5) {
        endGame("You're trapped forever!!!")
    } else {
        tempCheck(playerInput);
    }

}

let guessButton = document.getElementById('playerInputButton');
guessButton.addEventListener('click', guessClick);

document.getElementById('reset').addEventListener('click', reset);


//enter a number in the field
//validate input
//check if it is NAN or <1 or >100

//compare guess inputs to the winning number
//put guesses into the previous guesses
//loose after 5 guesses
//win if random winning number = guess number

//hint click causes the paper to open and show three numbers
//one random winning number and two random numbers


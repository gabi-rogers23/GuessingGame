/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

*/
function createRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

let winningNumber = createRandomNum();
let guessArray = [];
let hintArray = [];

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
        temp = "Oh #&^%! You're hot!";
    } else if (diff <= 10) {
        temp = "You're getting warm...";
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

function getHintArray() {

    let hint1 = createRandomNum();
    let hint2 = createRandomNum();

    if (hint1 === hint2) {
       return getHintArray()
    } else if (hint1 === winningNumber || hint2 === winningNumber) {
        return getHintArray()
    }else{
        hintArray.push(hint1);
        hintArray.push(hint2);
        let insertPoint = Math.floor(Math.random() * 3);

        if (insertPoint === 2) {
            hintArray.push(winningNumber)
        } else {
        hintArray.splice(insertPoint, 0, winningNumber);
        }

        return hintArray;
    }
}

function hintList(hintArray) {

    let hintList = document.getElementById('hintsList');
    

    for (let hint of hintArray) {
        let hintItem = document.createElement('li');
        hintItem.appendChild(document.createTextNode(hint));
        hintList.appendChild(hintItem);
    }
}

function hintClick(){
    document.getElementById('hint').style.visibility = "hidden";
    document.getElementById('openHint').style.visibility = "visible";
    if (hintArray.length === 0) {
        hintList(getHintArray());
    }
    
}

function openHintClick() {
    document.getElementById('hint').style.visibility = "visible";
    document.getElementById('openHint').style.visibility = "hidden";
}


function reset() {
    guessArray = [];
    hintArray = []; 
    winningNumber = createRandomNum();
    document.getElementById('reset').style.visibility = "hidden";
    document.getElementById('playerInputButton').disabled = false;
    document.getElementById('playerInputArea').value = "";
    document.getElementById('playerStatus').innerText = "";
    document.getElementById('guessList').innerHTML = "";
    document.getElementById('hintsList').innerHTML = "";
    openHintClick()
}

function guessClick() {

    let playerInput = document.getElementById('playerInputArea').value;

    if (!validateInput(playerInput)) {
        document.getElementById('playerStatus').innerText = "Invalid Input. Try again.";
        return;
    } else {
        addGuess(playerInput);
        document.getElementById('playerInputArea').value = "";
    }

    if (playerInput == winningNumber) {
        endGame("CONGRATULATIONS!!! You've escaped!!!");
    } else if (guessArray.length === 5) {
        endGame("You're trapped forever!!!")
    } else {
        tempCheck(playerInput);
    }

}


document.getElementById('playerInputButton').addEventListener('click', guessClick);

document.getElementById('hint').addEventListener('click', hintClick);

document.getElementById('openHint').addEventListener('click', openHintClick);

document.getElementById('reset').addEventListener('click', reset);





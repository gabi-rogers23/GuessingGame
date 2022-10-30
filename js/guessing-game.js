/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

let winningNumber = 12; //Math.floor(Math.random() * 100);
let guessArray = [];


function addGuess() {

    let guessList = document.getElementById('guessList');

    let playerInput = document.getElementById('playerInputArea').value;

    let guess = document.createElement('li');
    guess.appendChild(document.createTextNode(playerInput));

    guessList.appendChild(guess);

    guessArray.push(guess);

    userWin(playerInput);
}

function userWin(playerInput) {

 if (playerInput == winningNumber) {
    alert('You Escaped!');
 }

}

let guessButton = document.getElementById('playerInputButton');
guessButton.addEventListener('click', addGuess);

//enter a number in the field
//validate input
//check if it is NAN or <1 or >100

//compare guess inputs to the winning number
//put guesses into the previous guesses
//loose after 5 guesses
//win if random winning number = guess number

//hint click causes the paper to open and show three numbers
//one random winning number and two random numbers


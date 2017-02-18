var wordList = ["mario", "link", "zelda", "contra", "luigi"]

var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

var x = document.getElementById("themeAudio"); 

function playTheme() { 
    x.play(); 
} 

function pauseTheme() { 
    x.pause(); 
} 

var y = document.getElementById("victoryAudio"); 

function playVictory() { 
    y.play(); 
} 

function pauseVictory() { 
    y.pause(); 
} 

function startGame() {

	playTheme();
    numGuesses = 9;
    blanksAndSuccesses = [];
    wrongGuesses = [];

    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    console.log(chosenWord);
    console.log(numBlanks);
    console.log(lettersInChosenWord);

    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }
    console.log(blanksAndSuccesses);
    document.getElementById('Word-blank').innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById('guesses-left').innerHTML = numGuesses;

}

function checkLetters(letter) {


    var letterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }

    }


    if (letterInWord) {
        for (i = 0; i < numBlanks; i++) {
            if (chosenWord[i] === letter) {
                blanksAndSuccesses[i] = letter;
            }
            console.log("inside our checkletter", blanksAndSuccesses);
        }
    } else {

        numGuesses--;
        wrongGuesses.push(letter);
        console.log("our wrong guesses ", wrongGuesses);
    }


}


function roundComplete() {

    document.getElementById('Word-blank').innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById('guesses-left').innerHTML = numGuesses;
    document.getElementById('wrong-guesses').innerHTML = wrongGuesses.join(" ");

    console.log(lettersInChosenWord);
    console.log(blanksAndSuccesses);

    if (lettersInChosenWord.join() === blanksAndSuccesses.join()) {
        winCounter++;
        alert("you win");
        pauseTheme();
        playVictory();
        console.log(winCounter);
        document.getElementById('win-counter').innerHTML = winCounter;
        startGame();
    } else if (numGuesses === 0) {
        lossCounter++
        document.getElementById('loss-counter').innerHTML = lossCounter;
        alert("you lose");
        startGame();
    }



}
startGame();
document.onkeyup = function(event) {
	pauseVictory();
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("letter we typed", letterGuessed);
    checkLetters(letterGuessed);
    roundComplete();
}

var readline = require('readline');
var maxAttempt = null;
var currentAttempt = 0;
var generatedNumber = [];
var patternLength = 0;

var promptRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

startGame();

function startGame() {
    // 1. Pergunta o tamanho do padrão (Pattern Length)
    promptRead.question('Enter pattern length (1-6): ', function (input) {
        let length = parseInt(input);
        if (isNaN(length) || length < 1 || length > 6) {
            console.log("Invalid length. Please enter a number between 1 and 6.");
            startGame();
            return;
        }
        patternLength = length;
        askGuesses();
    });
}

function askGuesses() {
    // 2. Pergunta o número de tentativas (Number of Guesses)
    promptRead.question('Enter number of guesses: ', function (input) {
        let guesses = parseInt(input);
        if (isNaN(guesses) || guesses < 1) {
            console.log("Invalid number. Please enter a number greater than 0.");
            askGuesses();
            return;
        }
        maxAttempt = guesses;
        callGuessPrompt();
    });
}

function callGuessPrompt() {
    promptRead.setPrompt('Type your guess: \n');
    promptRead.prompt();

    //Keep reading the input until something break stops the prompt.
    promptRead.on('line', function (input) {
        handleGuessPrompt(input);
        promptRead.prompt();
    });
}

function handleGuessPrompt(userInput) {
    if (!generatedNumber.length) {
        generatedNumber = generatesNumber();
    }
    handleInput(userInput);
}

function handleInput(userInput) {
    let userGuess = userInput.split('');
    let correctNumber = 0;
    let correctPosition = 0;

    //If the user sets the wrong amount of numbers, return.
    if (userGuess.length != patternLength) {
        console.log(`Input needs to be ${patternLength} of size.`);
        return;
    }

    //If any value outside 1...6
    if (userGuess.some(typedValue => typedValue > 6 || typedValue < 1 || isNaN(typedValue))) {
        console.log(`Try something like a number between 1 and 6.`);
        return;
    }
    //It has to be here. We just want to count the attempt if it's valid.
    currentAttempt++;

    // Calculate correctPosition
    userGuess.forEach((item, index) => {
        if (item === generatedNumber[index]) {
            correctPosition++;
        }
    });

    // Calculate correctNumber (Total unique numbers from guess found in pattern)
    // Using Set to avoid overcounting duplicates in guess (e.g. guess 1123 vs pattern 1234)
    const uniqueGuess = [...new Set(userGuess)];
    uniqueGuess.forEach((item) => {
        if (generatedNumber.includes(item)) {
            correctNumber++;
        }
    });

    console.log(
        `${correctNumber} number${correctNumber > 1 ? 's' : ''} correct, ${correctPosition} number${correctPosition > 1 ? 's' : ''} in correct position`
    );



    //If you want to see how it's working, you could uncomment these lines.
    /* 
    console.log("userGuess")
    console.log(userGuess)
    console.log("=======================")
    console.log("generatedNumber")
    console.log(generatedNumber)
    console.log("=======================")
    console.log(correctNumber)
    console.log(correctPosition)
 */
    if (
        correctNumber == patternLength &&
        correctPosition == patternLength
    ) {
        console.log(`You broke the code in ${currentAttempt} guesses!`);
        promptRead.close();
        process.exit(0);
    } else if (currentAttempt == parseInt(maxAttempt)) {
        console.log(`You were unable to break the code in ${currentAttempt} guesses. Code pattern is: ${generatedNumber.join('')}.`);
        promptRead.close();
        process.exit(0);
    }
}

//Generates game array numbers
function generatesNumber() {
    let number = [];
    for (let index = 0; index < patternLength;) {
        let numberGenerated = parseInt(Math.random() * 6) + 1;
        if (!number.includes(numberGenerated.toString())) {
            number.push(numberGenerated.toString());
            index++;
        }
    }
    return number;
}
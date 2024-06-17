// Define your phrases here (you can expand this with more phrases)
const phrases = [
    "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG."
];


// Mapping for artist, album, and song hints
const hintMappings = {
    'ARTIST': 'Tommy Richman',
    'ALBUM': '***',
    'SONG': '***'
};

// Function to generate a random number mapping
function generateRandomNumberMapping(phrase) {
    let uniqueChars = [...new Set(phrase.replace(/\s/g, "").toUpperCase())];
    let shuffledNumbers = shuffleArray([...Array(uniqueChars.length).keys()]);

    let numberMapping = {};
    for (let i = 0; i < uniqueChars.length; i++) {
        numberMapping[uniqueChars[i]] = shuffledNumbers[i];
    }

    // Add mapping for space if needed
    numberMapping[' '] = '   ';

    return numberMapping;
}

// Function to shuffle array elements (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let chosenPhrase = "";
let guessedLetters = [];
let incorrectTries = 0;
let numberMapping = {}; // Initialize number mapping

// Function to start or restart the game
function startGame() {
    // Reset game variables
    guessedLetters = [];
    incorrectTries = 0;
    
    // Choose a random phrase
    chosenPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Generate random number mapping for the chosen phrase
    numberMapping = generateRandomNumberMapping(chosenPhrase);
    
    // Display mapped numbers for each letter in the phrase
    updatePhraseDisplay();
    document.getElementById("guessed-letters").textContent = "";
    document.getElementById("incorrect-tries").innerHTML = ""; // Use innerHTML for inserting checkmarks and Xs

    // Enable all keyboard buttons and remove disabled class
    let keys = document.getElementsByClassName("key");
    for (let key of keys) {
        key.disabled = false;
        key.classList.remove("disabled", "correct", "incorrect");
    }

    // Create strike indicators
    updateStrikeIndicators();
}

// Function to update strike indicators
function updateStrikeIndicators() {
    let strikesContainer = document.getElementById("strikes-container");
    strikesContainer.innerHTML = ""; // Clear previous indicators

    for (let i = 0; i < 5; i++) {
        let strikeElement = document.createElement("div");
        strikeElement.classList.add("strike");
        if (i < incorrectTries) {
            strikeElement.textContent = "X";
        }
        strikesContainer.appendChild(strikeElement);
    }
}

// Function to end the game
function endGame() {
    // Display the complete phrase with guessed letters
    let phraseDisplay = "";
    for (let i = 0; i < chosenPhrase.length; i++) {
        let originalChar = chosenPhrase[i];
        if (originalChar === " ") {
            phraseDisplay += " ";
        } else if (guessedLetters.includes(originalChar.toUpperCase())) {
            phraseDisplay += originalChar;
        } else {
            phraseDisplay += numberMapping[originalChar.toUpperCase()];
        }
    }
    document.getElementById("phrase").textContent = phraseDisplay;

    // Show a popup with the share feature
    shareGame();
}

// Function to share the game details
function shareGame() {
    // Prepare the share message
    let shareMessage = `Look what I decoded!\n\nEncrypted phrase: ${document.getElementById("phrase").textContent}\n\nGuesses: ${getGuessesSummary()}\n\nIncorrect Tries: ${incorrectTries}`;

    if (navigator.share) {
        navigator.share({
            title: 'Word Guessing Game',
            text: shareMessage,
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        // Fallback for browsers that do not support navigator.share
        alert('Sharing is not supported in this browser. You can manually share the following:\n\n' + shareMessage + '\n\n' + window.location.href);
    }
}

// Function to get a summary of guesses as ✔ and ✘
function getGuessesSummary() {
    let summary = "";
    for (let i = 0; i < guessedLetters.length; i++) {
        if (chosenPhrase.includes(guessedLetters[i])) {
            summary += '✔'; // Correct guess
        } else {
            summary += '✘'; // Incorrect guess
        }
    }
    return summary;
}

// Function to update the displayed phrase with mapped numbers and guessed letters
function updatePhraseDisplay() {
    let phraseDisplay = "";
    for (let i = 0; i < chosenPhrase.length; i++) {
        let originalChar = chosenPhrase[i];
        let mappedChar = numberMapping[originalChar.toUpperCase()];

        if (/[A-Z]/.test(originalChar)) { // Check if the character is a letter
            if (guessedLetters.includes(originalChar.toUpperCase())) {
                phraseDisplay += `<span>${originalChar}</span>`; // Show the guessed letter in original form
            } else {
                phraseDisplay += `<span class="number">${mappedChar}</span>`; // Show the mapped number for unguessed characters
            }
        } else if (originalChar === ' ') { // Handle spaces
            phraseDisplay += `<span class="space"></span>`; // Add a span with space class
        } else { // Handle punctuation
            phraseDisplay += originalChar; // Display punctuation directly
        }
    }

    document.getElementById("phrase").innerHTML = phraseDisplay;
}

// Function to reveal a hint (artist, album, or song)
function revealHint(hintType) {
    // Create a new paragraph element for hint text
    let hintElement = document.createElement('p');
    hintElement.classList.add('hint-text');

    // Display hint text below the phrase
    switch (hintType) {
        case 'artist':
            hintElement.textContent = `Hint: ${hintMappings['ARTIST']}`;
            break;
        case 'album':
            hintElement.textContent = `Hint: ${hintMappings['ALBUM']}`;
            break;
        case 'song':
            hintElement.textContent = `Hint: ${hintMappings['SONG']}`;
            break;
        default:
            break;
    }

    // Append hint text below the phrase
    let phraseContainer = document.getElementById('phrase-container');
    phraseContainer.appendChild(hintElement);

    // Disable hint button after revealing
    document.getElementById(`hint-${hintType}`).disabled = true;
}

// Function to guess a letter
function guessLetter(letter) {
    // Check if the letter has already been guessed
    if (guessedLetters.includes(letter)) {
        alert("You've already guessed that letter.");
        return;
    }

    // Add the guessed letter to the guessedLetters array
    guessedLetters.push(letter);

    // Update the guessed letters display
    document.getElementById("guessed-letters").textContent = guessedLetters.join(", ");

    // Disable the button for the guessed letter
    let keyElement = document.getElementById(letter);
    keyElement.disabled = true;

    // Check if the guessed letter is correct
    let originalLetter = letter.toUpperCase();
    let isCorrect = chosenPhrase.includes(originalLetter);

    // Update the key styling based on correctness
    if (isCorrect) {
        keyElement.classList.add("correct");
    } else {
        keyElement.classList.add("incorrect");
    }

    // Update the phrase display with the guessed letter
    updatePhraseDisplay();

    // Check if the game is won
    let allLettersGuessed = [...new Set(chosenPhrase.replace(/\s/g, "").toUpperCase())].every(letter => guessedLetters.includes(letter));
    if (allLettersGuessed) {
        setTimeout(() => {
            endGame(); // End the game and show complete phrase
        }, 500); // Delay to allow the last correct letter to show
    } else if (!isCorrect) {
        // Show an X for incorrect guesses
        document.getElementById("incorrect-tries").innerHTML += '<span class="x-mark">✘</span>';
        incorrectTries++;
        
        // Check if the player has used up all their attempts
        if (incorrectTries >= 5) {
            setTimeout(() => {
                endGame(); // End the game and show complete phrase
            }, 500); // Delay to allow the last incorrect X to show
        }
    } else {
        // Show a check mark for correct guesses
        document.getElementById("incorrect-tries").innerHTML += '<span class="check-mark">✔</span>';
    }

    // Update strike indicators
    updateStrikeIndicators();
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", startGame);

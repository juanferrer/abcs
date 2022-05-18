/**
 * Basic linear interpolation
 * @param {Number} start Minimum value
 * @param {Number} end Maximum value
 * @param {Number} value How far along the line the result is
 * @returns {Number}
 */
let lerp = (start, end, value) => {
    return start + value * (end - start);
};

/**
 * Get a random integer in the range [min, max]
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
let randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Shake an HTML element for the duration
 * @param {HTMLElement} element 
 * @param {Number} duration ms
 */
let shakeElement = (element, duration) => {
    element.classList.add("shake");

    window.setTimeout(() => {
        element.classList.remove("shake");
    }, duration);
};

let display, characterDisplay, textDisplay,
characterModeChangeButton, writeModeChangeButton,
writtenTextSpan, remainingTextSpan;

// Mode definitions
const NUMBERS = Symbol("NUMBERS");
const LETTERS = Symbol("LETTERS");
let characterMode = [LETTERS, NUMBERS];
let characterModeIndex = 0;

const CHARACTER = Symbol("CHARACTER");
const TEXT = Symbol("TEXT");
let writeMode = [CHARACTER, TEXT];
let writeModeIndex = 0;

function changeDisplay(type) {
    switch (type) {
        case CHARACTER:
            characterDisplay.hidden = false;
            textDisplay.hidden = true;
            break;
        case TEXT:
            characterDisplay.hidden = true;
            textDisplay.hidden = false;
            break;
    }
}

window.addEventListener("load", async () => {
    // Get variables
    display = document.getElementById("display");
    characterDisplay = document.getElementById("character-display");
    textDisplay = document.getElementById("text-display");
    characterModeChangeButton = document.getElementById("character-mode-change-button");
    writeModeChangeButton = document.getElementById("write-mode-change-button");
    writtenTextSpan = document.getElementById("written-text");
    remainingTextSpan = document.getElementById("remaining-text");

    initialiseWords("en").then(() => {
        // Load a word, so that it's there when the user changes
        remainingTextSpan.innerHTML = words[randomInt(0, words.length)];
    });
    initialiseLetters();
    initialiseNumbers();

    // Prepare for keypresses
    document.addEventListener("keydown", letterPressed);
    document.addEventListener("keydown", numberPressed);

    characterModeChangeButton.addEventListener("click", () => {
        // Cycle through modes
        characterModeIndex++;
        characterModeIndex = characterModeIndex % characterMode.length;

        // Now, depending on the current mode, set the default values
        document.dispatchEvent(new KeyboardEvent("keydown", {"key":  characterMode[characterModeIndex] === LETTERS ? "A" : "0" }))
        characterModeChangeButton.innerHTML = characterMode[characterModeIndex] === LETTERS ? "0" : "A";
    });

    writeModeChangeButton.addEventListener("click", async () => {
        // Cycle through modes
        writeModeIndex++;
        writeModeIndex = writeModeIndex % writeMode.length;

        // Set default values and hide
        changeDisplay(writeMode[writeModeIndex]);
        writeModeChangeButton.innerHTML = writeMode[writeModeIndex] === CHARACTER ? "---" : "-";
    });
});


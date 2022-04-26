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

let display, displayCharacter, modeChangeButton;

// Mode definitions
const NUMBERS = Symbol("NUMBERS");
const LETTERS = Symbol("LETTERS");
let modes = [LETTERS, NUMBERS];

let modeIndex = 0;

window.addEventListener("load", () => {
    // Get variables
    display = document.getElementById("display");
    displayCharacter = document.getElementById("display-character");
    modeChangeButton = document.getElementById("mode-change-button");

    initialiseLetters();
    initialiseNumbers();

    // Prepare for keypresses
    document.addEventListener("keydown", letterPressed);
    document.addEventListener("keydown", numberPressed);

    modeChangeButton.addEventListener("click", () => {
        // Cycle through modes
        modeIndex++;
        modeIndex = modeIndex % modes.length;

        // Now, depending on the current mode, set the default values
        document.dispatchEvent(new KeyboardEvent("keydown", {"key":  modes[modeIndex] === LETTERS ? "A" : "0" }))
        modeChangeButton.innerHTML = modes[modeIndex] === LETTERS ? "0" : "A";
    });
});


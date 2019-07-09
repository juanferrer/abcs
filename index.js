let letters = {};
const A = 65;
let display, displayLetter;

let initialise = () => {
    // Prepare letters
    for (let i = 0; i < 26; ++i) {

        letters[A + i] = {
            letter: String.fromCharCode(A + i),
            colour: lerp(0, 360, i / 26)
        };
    }

    // Get variables
    display = document.getElementById("display");
    displayLetter = document.getElementById("display-letter");
};

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

window.onload = () => {
    initialise();
    // Prepare for keypresses
    document.body.addEventListener("keydown", e => {
        if (letters[e.keyCode]) {
            // We have a letter, replace the letter for the one used
            display.style.backgroundColor = `hsl(${letters[e.keyCode].colour}, 60%, 60%)`;
            displayLetter.innerHTML = letters[e.keyCode].letter;
        }
    });
};

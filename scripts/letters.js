// global LETTERS
let letters = {};
const A = 65;


let initialiseLetters = () => {
    // Prepare letters
    for (let i = 0; i < 26; ++i) {

        letters[String.fromCharCode(A + i)] = {
            letter: String.fromCharCode(A + i),
            colour: lerp(0, 360, i / 26)
        };
    }
};

function letterPressed(e) {
    if (modes[modeIndex] === LETTERS) {
        if (letters[e.key.toUpperCase()]) {
            // We have a letter, replace the letter for the one used
            display.style.backgroundColor = `hsl(${letters[e.key.toUpperCase()].colour}, 60%, 60%)`;
            displayCharacter.innerHTML = letters[e.key.toUpperCase()].letter;
        }
    }
}

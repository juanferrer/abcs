// global NUMBERS
let numbers = [];
let numbersLength = 10;

let initialiseNumbers = () => {
    // Prepare numbers
    for (let i = 0; i < numbersLength; i++) {

        numbers[i] = {
            number: i.toString(),
            colour: lerp(0, 360, i / numbersLength)
        };
    }
};

function numberPressed(e) {
    if (modes[modeIndex] === NUMBERS) {
        let num = parseInt(e.key);
        let number = numbers[num];
        if (numbers[num]) {
            // We have a number, replace the number for the one used
            display.style.backgroundColor = `hsl(${number.colour}, 60%, 60%)`;
            displayCharacter.innerHTML = number.number;
        }
    }
}
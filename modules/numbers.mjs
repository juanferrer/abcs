import { lerp } from './general.mjs'
import { NUMBERS, characterMode, characterModeIndex, display, characterDisplay } from './main.mjs'

const numbers = []
const numbersLength = 10

const initialiseNumbers = () => {
  // Prepare numbers
  for (let i = 0; i < numbersLength; i++) {
    numbers[i] = {
      number: i.toString(),
      colour: lerp(0, 360, i / numbersLength)
    }
  }
}

const numberPressed = (e) => {
  if (characterMode[characterModeIndex] === NUMBERS) {
    const num = parseInt(e.key)
    const number = numbers[num]
    if (numbers[num]) {
      // We have a number, replace the number for the one used
      display.style.backgroundColor = `hsl(${number.colour}, 60%, 60%)`
      characterDisplay.innerHTML = number.number
    }
  }
}

export { numbers }
export { initialiseNumbers, numberPressed }

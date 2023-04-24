import { NUMBERS, LETTERS, CHARACTER, TEXT, randomInt } from './general.mjs'
import { initialiseNumbers, numberPressed } from './numbers.mjs'
import { words, initialiseLetters, initialiseWords, letterPressed } from './letters.mjs'

let display, characterDisplay, textDisplay,
  characterModeChangeButton, writeModeChangeButton,
  writtenTextSpan, remainingTextSpan

// Mode definitions
const characterMode = [LETTERS, NUMBERS]
let characterModeIndex = 0

const writeMode = [CHARACTER, TEXT]
let writeModeIndex = 0

function changeDisplay (type) {
  switch (type) {
    case CHARACTER:
      characterDisplay.hidden = false
      textDisplay.hidden = true
      break
    case TEXT:
      characterDisplay.hidden = true
      textDisplay.hidden = false
      break
  }
}

const controlPressed = (e) => {
  if (characterMode[characterModeIndex] === LETTERS && writeMode[writeModeIndex] === TEXT) {
    switch (e.key.toUpperCase()) {
      case 'ENTER':
        writtenTextSpan.innerHTML = ''
        remainingTextSpan.innerHTML = words[randomInt(0, words.length)]
        break
    }
  }
}

window.addEventListener('load', async () => {
  // Get variables
  display = document.getElementById('display')
  characterDisplay = document.getElementById('character-display')
  textDisplay = document.getElementById('text-display')
  characterModeChangeButton = document.getElementById('character-mode-change-button')
  writeModeChangeButton = document.getElementById('write-mode-change-button')
  writtenTextSpan = document.getElementById('written-text')
  remainingTextSpan = document.getElementById('remaining-text')

  initialiseWords('en').then(() => {
    // Load a word, so that it's there when the user changes
    remainingTextSpan.innerHTML = words[randomInt(0, words.length)]
  })
  initialiseLetters()
  initialiseNumbers()

  // Prepare for keypresses
  document.addEventListener('keydown', letterPressed)
  document.addEventListener('keydown', numberPressed)
  document.addEventListener('keydown', controlPressed)

  characterModeChangeButton.addEventListener('click', () => {
    // Cycle through modes
    characterModeIndex++
    characterModeIndex = characterModeIndex % characterMode.length

    // Now, depending on the current mode, set the default values
    document.dispatchEvent(new KeyboardEvent('keydown', { key: characterMode[characterModeIndex] === LETTERS ? 'A' : '0' }))
    characterModeChangeButton.innerHTML = characterMode[characterModeIndex] === LETTERS ? '0' : 'A'
  })

  writeModeChangeButton.addEventListener('click', async () => {
    // Cycle through modes
    writeModeIndex++
    writeModeIndex = writeModeIndex % writeMode.length

    // Set default values and hide
    changeDisplay(writeMode[writeModeIndex])
    writeModeChangeButton.innerHTML = writeMode[writeModeIndex] === CHARACTER ? '---' : '-'
  })
})

export { NUMBERS, LETTERS, CHARACTER, TEXT }
export { characterMode, characterModeIndex, writeMode, writeModeIndex }
export {
  display, characterDisplay, textDisplay,
  characterModeChangeButton, writeModeChangeButton,
  writtenTextSpan, remainingTextSpan
}

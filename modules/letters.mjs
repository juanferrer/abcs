import { LETTERS, CHARACTER, TEXT, lerp, shakeElement } from './general.mjs'
import { characterMode, writeMode, characterModeIndex, writeModeIndex, display, characterDisplay, textDisplay, writtenTextSpan, remainingTextSpan } from './main.mjs'

const letters = {}
let wordsLoaded = false
let words = [] // eslint-disable-line no-unused-vars
const A = 65

const initialiseLetters = () => {
  // Prepare letters
  for (let i = 0; i < 26; ++i) {
    letters[String.fromCharCode(A + i)] = {
      letter: String.fromCharCode(A + i),
      colour: lerp(0, 360, i / 26)
    }
  }
}

const initialiseWords = languageCode => {
  return new Promise((resolve, reject) => {
    // Load words
    if (!wordsLoaded) {
      fetch(`data/${languageCode.toLowerCase()}.json`).then(async response => {
        await response.text().then(text => {
          words = JSON.parse(text).words
          wordsLoaded = true
          resolve()
        })
      }).catch(response => {
        console.error(response)
        reject(response)
      })
    }
  })
}

const letterPressed = (e) => {
  if (characterMode[characterModeIndex] === LETTERS) {
    switch (writeMode[writeModeIndex]) {
      case CHARACTER:
        if (letters[e.key.toUpperCase()]) {
          // We have a letter, replace the letter for the one used
          display.style.backgroundColor = `hsl(${letters[e.key.toUpperCase()].colour}, 60%, 60%)`
          characterDisplay.innerHTML = letters[e.key.toUpperCase()].letter
        }
        break
      case TEXT:
        if (letters[e.key.toUpperCase()]) {
          // Check it's also the next character to type
          const remainingText = remainingTextSpan.innerHTML
          if (letters[e.key.toUpperCase()].letter === remainingText[0]) {
            display.style.backgroundColor = `hsl(${letters[e.key.toUpperCase()].colour}, 60%, 60%)`
            writtenTextSpan.innerHTML = writtenTextSpan.innerHTML + remainingText[0]
            remainingTextSpan.innerHTML = remainingText.substring(1)
          } else {
            // Wrong character, shake it
            shakeElement(textDisplay, 100)
          }
        }
        break
    }
  }
}

export { letters, words }
export { initialiseLetters, initialiseWords, letterPressed }

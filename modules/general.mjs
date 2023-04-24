const NUMBERS = Symbol('NUMBERS')
const LETTERS = Symbol('LETTERS')
const CHARACTER = Symbol('CHARACTER')
const TEXT = Symbol('TEXT')

/**
 * Basic linear interpolation
 * @param {Number} start Minimum value
 * @param {Number} end Maximum value
 * @param {Number} value How far along the line the result is
 * @returns {Number}
 */
const lerp = (start, end, value) => {
  return start + value * (end - start)
}

/**
 * Get a random integer in the range [min, max]
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Shake an HTML element for the duration
 * @param {HTMLElement} element
 * @param {Number} duration ms
 */
const shakeElement = (element, duration) => {
  element.classList.add('shake')

  window.setTimeout(() => {
    element.classList.remove('shake')
  }, duration)
}

export { NUMBERS, LETTERS, CHARACTER, TEXT }
export { lerp, randomInt, shakeElement }

/**
 * Module exports
 */

module.exports = jitter;


/**
 * Schedule fn to run with a certain amount of jitter
 *
 * @param {Function} fn
 * @param {Number}   min
 * @param {Number}   max [optional]
 */

function jitter (fn, min, max) {
  if (!max) {
    max = min;
    min = 0.7 * max;  // 0.7 is a decent ratio for jitter
  }

  return setTimeout(fn, randint(min, max));
}


/**
 * Return a random number between max and min
 */

function randint (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

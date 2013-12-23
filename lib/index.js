var debug = require('debug')('jit');

/**
 * Module exports
 */

module.exports = jitter;
module.exports.interval = interval;


/**
 * Schedule fn to run with a certain amount of jitter
 *
 * @param {Function} fn
 * @param {Number} min  min number of ms to wait (or max if no max is supplied)
 * @param {Number} [max]  max number of ms to wait
 */

function jitter (fn, min, max) {
  if (!max) {
    max = min;
    min = 0.7 * max;  // 0.7 is a decent ratio for jitter
  }
  return setTimeout(fn, randint(min, max));
}


/**
 * Set up an interval to run with some jitter
 *
 * @param {Function} fn  the function to run
 * @param {Number} min  min number of ms to wait (or max if no max is supplied)
 * @param {Number} [max]  max number of ms to wait
 */

function interval (fn, min, max) {
  var timeout;
  var cleared = false;
  timeout = jitter(run, min, max);
  return clear;

  function run () {
    if (cleared) return;
    fn();
    timeout = jitter(function () {
      run();
    }, min, max);
  }

  function clear () {
    if (timeout) {
      debug('clearing the interval');
      clearTimeout(timeout);
    }
    cleared = true;
  }
}


/**
 * Return a random number between max and min
 *
 * @param {Number} min
 * @param {Number} max
 */

function randint (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var assert = require('assert');
var jit = require('..');
var Batch = require('batch');


/**
 * Create a function to run `test` multiple `times`
 */

function run (test, times) {
  var batch = new Batch();
  for (var i = 0; i < times; i++) batch.push(test);
  return function (done) { batch.end(done); };
}


describe('jit', function () {
  it('should schedule within the max', run(function (done) {
    var isDone = false;
    jit(function () { isDone = true; done(); }, 50);
    jit(function () { assert(!isDone); }, 10);
  }, 100));

  it('should schedule within the time', run(function (done) {
    var isDone = false;
    jit(function () { isDone = true; }, 10, 20);
    setTimeout(function () { assert(!isDone); }, 5);
    setTimeout(function () { assert(isDone); done(); }, 25);
  }, 100));

  describe('#interval', function () {
    it('should schedule and clear an interval', run(function (done) {
      var runs = 0;
      var clear = jit.interval(function () { runs++; }, 10);
      setTimeout(function () {
        assert(runs >= 4);
        var total = runs;
        clear();
        setTimeout(function () {
          assert(runs == total);
          done();
        }, 100);
      }, 45);
    }, 100));
  });
});
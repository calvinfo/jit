var jit = require('..')
  , should = require('should');


describe('jit', function () {

  it('should schedule within the max', function (done) {
    var isDone = false;

    jit(function () { isDone = true; done(); }, 500);
    jit(function () { isDone.should.eql(false); }, 100);
  });

  it('should schedule within the time', function (done) {
    var isDone = false;

    jit(function () { isDone = true; }, 500, 500);
    setTimeout(function () { isDone.should.eql(false); }, 400);
    setTimeout(function () { isDone.should.eql(true); }, 600);
  });
});
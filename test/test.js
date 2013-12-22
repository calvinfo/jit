var jit = require('..');
var should = require('should');


describe('jit', function () {

  it('should schedule within the max', function (done) {
    var isDone = false;
    jit(function () { isDone = true; done(); }, 50);
    jit(function () { isDone.should.eql(false); }, 10);
  });

  it('should schedule within the time', function (done) {
    var isDone = false;
    jit(function () { isDone = true; }, 10, 20);
    setTimeout(function () { isDone.should.eql(false); }, 5);
    setTimeout(function () { isDone.should.eql(true); done(); }, 25);
  });

  describe('#interval', function () {
    it('should schedule and clear an interval', function (done) {
      var runs = 0;
      var clear = jit.interval(function () { runs++; }, 10, 10);
      setTimeout(function () {
        runs.should.eql(4);
        clear();
        setTimeout(function () {
          runs.should.eql(4);
          done();
        }, 100);
      }, 45);
    });
  });
});
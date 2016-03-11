var test = require('./lib/test.js');
var testExecution = require('./lib/test_execution.js');

var functionality = function (options) {
  return {
    test: test(options),
    testExecution: testExecution(options)
  };
};

module.exports = functionality;

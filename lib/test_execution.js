var xml = require('xml');
var _ = require('lodash/fp');
var rp = require('request-promise');
var createOpts = require('./request_opts.js');

module.exports = function (options) {
  function createExecutionData (json) {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\n' +
      xml({testExecution: [{_attr: { name: json.name, started: json.time, testId: json.testId }},
        {parameters: Object.keys(json.params).map(function (key) {
          return {parameter: {_attr: {name: key, value: json.params[key]}}};
        })},
        {tags: _.map(function (x) {
          return {tag: {_attr: {name: x}}};
        }, json.tags)},
        {values: Object.keys(json.values).map(function (key) {
          return {value: {_attr: {metricName: key, result: json.values[key]}}};
        })}
    ]});
  }

  function create (json) {
    return rp(createOpts(
      options,
      'POST',
      'rest/testExecution/create',
      createExecutionData(json)
    ));
  }

  return {
    create: create
  };
};

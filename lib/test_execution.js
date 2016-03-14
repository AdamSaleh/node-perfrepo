var xml = require('xml');
var _ = require('lodash/fp');
var rp = require('request-promise');
var createOpts = require('./request_opts.js');

module.exports = function (options) {
  function createExecutionData (json) {
    json.values = Object.keys(json.values).map(function (key) { return [key, json.values[key]]; });
    json.values = _.flatMap(function (kv) {
      if (_.isArray(kv[1])) {
        return _.map(function (v) { return [kv[0], v]; }, kv[1]);
      } else {
        return [kv];
      }
    }, json.values);

    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\n' +
      xml({testExecution: [{_attr: { name: json.name, started: json.time, testId: json.testId }},
        {parameters: Object.keys(json.params).map(function (key) {
          return {parameter: {_attr: {name: key, value: json.params[key]}}};
        })},
        {tags: _.map(function (x) {
          return {tag: {_attr: {name: x}}};
        }, json.tags)},
        {values: json.values.map(function (kv) {
          if (_.isObject(kv[1])) {
            return {value: [{_attr: {metricName: kv[0], result: kv[1].value}},
              {parameters: Object.keys(kv[1].params).map(function (key) {
                return {parameter: {_attr: {name: key, value: kv[1].params[key]}}};
              })}
            ]};
          } else {
            return {value: {_attr: {metricName: kv[0], result: kv[1]}}};
          }
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

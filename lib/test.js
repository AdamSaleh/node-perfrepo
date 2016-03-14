var xml = require('xml');
var rp = require('request-promise');
var createOpts = require('./request_opts.js');
var xos = require('xml-object-stream-sax');

module.exports = function (options) {
  function createTestData (json) {
    console.log(json);
    console.log(json['metrics']);
    var result = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\n' +
      xml({test: [{_attr: { name: json.name, groupId: json.groupId, uid: json.uid }},
        {description: json.description},
        {metrics: Object.keys(json.metrics).map(function (key) {
          var val = json.metrics[key];
          return {metric: [{_attr: {name: key, comparator: val.comparator}}, {description: val.description}]};
        })}
    ]});
    return result;
  }

  function create (json) {
    return rp(createOpts(
      options,
      'POST',
      'rest/test/create',
      createTestData(json)
    ));
  }

  function get (json) {
    return rp(createOpts(
      options,
      'GET',
      'rest/test/' + json.uid
    )).then(function (xml_string) {
      xos(xml, '/test', function (book) { console.log(book); });
      return xml_string;
    });
  }

  return {
    create: create,
    get: get
  };
};

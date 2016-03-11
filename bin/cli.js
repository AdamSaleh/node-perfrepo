var optimist = require('optimist');
var _ = require('lodash/fp');
var fs = require('fs');
var functionality = require('../index.js');
var params = optimist.options('u', {
  'alias': 'username',
  'demand': true,
  'describe': 'Username'
}) .options('p', {
  'alias': 'password',
  'demand': true,
  'describe': 'Password'
}).options('h', {
  'alias': 'host',
  'demand': true,
  'describe': 'Host to login to e.g. https://testing.feedhenry.me'
}).options('o', {
  'alias': 'object',
  'demand': true,
  'describe': 'the object type to manipulate, i.e: ' + _.keys(functionality()).join(', ')
}).options('c', {
  'alias': 'command',
  'demand': true,
  'describe': 'the command to be executed, i.e: create'
}).options('j', {
  'alias': 'json',
  'demand': false,
  'describe': 'json data'
}).argv;

var fns = functionality({
  user: params.username,
  password: params.password,
  url: params.host
});

if (_.has(params.object, fns)) {
  var obj = fns[params.object];
  if (_.has(params.command, obj)) {
    var fn = obj[params.command];
    var json;
    if (params.json) {
      json = JSON.parse(fs.readFileSync(params.json).toString());
    }

    fn(json).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  } else {
    console.log('There is no ' + params.commad + ' implemented for object ' + params.object);
    console.log('Aviable commands are: ' + _.keys(obj).join(', '));
  }
} else {
  console.log('There are no commands implemented for object ' + params.object);
  console.log('Aviable objects are: ' + _.keys(fns).join(', '));
}

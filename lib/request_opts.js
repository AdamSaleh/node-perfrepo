module.exports = function createOpts (options, method, path, xml) {
  var opts = {
    method: method,
    uri: options.url + '/' + path,
    headers: {'Content-Type': 'text/xml'},
    auth: {
      'user': options.user,
      'pass': options.password,
      'sendImmediately': true
    },
    json: false
  };
  if (xml) {
    opts.body = xml;
  }
  console.log(opts);
  return opts;
};

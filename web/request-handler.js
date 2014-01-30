var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var method = httpHelpers.methods[req.method];
  console.log(req.url);

  if(method) {
    method(req, res);
  } else {

  }
};
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.getRequest = function(req, res) {
  // console.log(req);
  var path = url.parse(req.url).pathname;

  if(path === "/") {
    path = archive.paths["siteAssets"] + "/index.html";
  } else {
    path = archive.paths["archivedSites"] + path;
  }
  exports.serveAssets(res, path);
};

exports.serveAssets = function(res, asset) {
  fs.readFile(asset, 'utf8', function(err, data){
    if (err){
      exports.sendResponse(res, null, 404);
    } else {
      exports.sendResponse(res, data, 200);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.sendResponse = function(res, data, statusCode) {
  res.writeHead(statusCode, exports.headers);
  res.end(data);
};

exports.methods = {
  'GET' : exports.getRequest
};

// As you progress, keep thinking about what helper functions you can put here!


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

exports.sendResponse = function(req, res) {
  // console.log(req);
  var path = url.parse(req.url).pathname;

  if(path === "/") {
    path = "/index.html";
  }
  exports.serveAssets(res, archive.paths["siteAssets"] + path);
};

exports.serveAssets = function(res, asset) {
  fs.readFile(asset, 'utf8', function(err, data){
    if (err){
      console.log("Error reading file: ", asset);
    } else {
      res.end(data);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.methods = {
  'GET' : exports.sendResponse
};

// As you progress, keep thinking about what helper functions you can put here!


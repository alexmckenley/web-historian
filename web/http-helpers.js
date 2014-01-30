var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var url = require('url');


exports.parseQuery = function(qstr) {
  console.log(qstr);
  var query = {};
  var a = qstr.split('&');
  for (var i in a) {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
  }
  return query;
};

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
exports.getPath = function (req) {
  return url.parse(req.url).pathname;
};

exports.collectData = function(req, cb) {
  var data = '';
  req.on('data', function(v) {
    data += v;
  });
  req.on('end', function(){
    console.log("POST Data: ", exports.parseQuery(data));
    cb(exports.parseQuery(data));
  });
};

exports.getRequest = function(req, res) {
  // console.log(req);
  var path = exports.getPath(req);

  if(path === "/") {
    path = archive.paths["siteAssets"] + "/index.html";
  } else if(path.indexOf(".css") !== -1) {
    path = archive.paths["siteAssets"] + path;
  } else {
    path = archive.paths["archivedSites"] + path;
  }
  exports.serveAssets(res, path);
};

exports.serveAssets = function(res, asset, statusCode) {
  statusCode = statusCode || 200;

  fs.readFile(asset, 'utf8', function(err, data){
    if (err){
      exports.sendResponse(res, null, 404);
    } else {
      exports.sendResponse(res, data, statusCode);
    }
  });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};

exports.sendResponse = function(res, data, statusCode) {
  res.writeHead(statusCode, exports.headers);
  res.end(data);
};

exports.addSite = function(req, res) {
  exports.collectData(req, function(obj){
    archive.addUrlToList(obj.url, function(result) {
      var path;
      var statusCode;
      if(result) {
        path = archive.paths["siteAssets"] + "/loading.html";
        statusCode = 302;
      } else {
        path = archive.paths["archivedSites"] + "/" + obj.url;
        statusCode = 200;
      }
      exports.serveAssets(res, path, statusCode);
    });

  });
};

exports.methods = {
  'GET' : exports.getRequest,
  'POST' : exports.addSite
};

// As you progress, keep thinking about what helper functions you can put here!


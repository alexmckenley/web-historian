var fs = require('fs');
var path = require('path');
var request = require('request');
/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(path, cb){
  cb = cb || function() {};
  fs.readFile(path, 'utf8', function (err, data) {
    data = data.split('\n').map(function(v){
      return v.trim();
    });
    cb(data);
  });
};

exports.isUrlInList = function(url, cb){
  cb = cb || function() {};
  exports.readListOfUrls(exports.paths.list, function(data) {
    var result = false;
    data.forEach(function(v) {
      if(url === v) {
        result = true;
      }
    });
    cb(result);
  });
};

exports.addUrlToList = function(url, cb){
  exports.isUrlInList(url, function(result) {
    if(result) {
      cb(false);
    } else {
      fs.appendFile(exports.paths.list, url+"\n", function(err) {
        if(err) throw err;
        cb(true);
      });
    }
  });
};

exports.isUrlArchived = function(url, cb){
  cb = cb || function() {};
  var results = false;
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    files.forEach(function(v) {
      if(v === url) {
        results = true;
      }
    });
    cb(results);
  });
};

exports.downloadUrl = function(url){
  var path = "http://" + url;
  request(path).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
};










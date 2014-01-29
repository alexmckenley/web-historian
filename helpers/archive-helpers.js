var fs = require('fs');
var path = require('path');

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

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    console.log(typeof data, data);
    data = data.split('\n').map(function(v){
      return v.trim();
    });
    cb(data);
  });
};

exports.isUrlInList = function(url, cb){
  exports.readListOfUrls(function(data) {
    var result = false;
    data.forEach(function(v) {
      if(url === v) {
        result = true;
      }
    });
    cb(result);
  });
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths.list, "\n"+url, function(err) {
    if(err) throw err;
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

exports.downloadUrls = function(url){
};

exports.readListOfUrls(function(data){
  console.log("Data: ", data);
});

exports.isUrlInList("www.google.com", function(result) {
  console.log(result);
});

exports.addUrlToList("extraloyal.net");

exports.isUrlArchived("www.google.com", function (result) {
  console.log("Is archived: ", result);
});

exports.isUrlArchived("www.google.cofdm", function (result) {
  console.log("Is archived: ",result);
});












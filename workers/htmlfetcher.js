var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(archive.paths.list, function (urls){
  urls.forEach(function(url){
    archive.isUrlArchived(url, function(result){
      if(url){
        if(!result){
          console.log("Downloading ", url, "...");
          archive.downloadUrl(url);
        } else {
          console.log(url, " is already in the archive.");
        }        
      }
    });
  });
});

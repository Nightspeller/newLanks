var express = require('express');
var router = express.Router();
var http = require('http');
var async = require('async');

function getPhotos (aid, callback) {
    http.get("http://api.vk.com/method/photos.get?gid=35203647&aid="+aid, function(vkPhotosRes) {
        var rawPhotos = '';
        vkPhotosRes.on("data", function(photoChunk) {
            rawPhotos += photoChunk;
        });
        vkPhotosRes.on('end', function() {
            if (rawPhotos !== '') {
                rawPhotos = JSON.parse(rawPhotos).response;
                var albumPictures = [];
                for (var j=0; j<rawPhotos.length; j++){
                    albumPictures.push(rawPhotos[j].src_big);
                }

                callback(null, albumPictures);
            }
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}

router.get('/', function(req, res) {

    http.get("http://api.vk.com/method/photos.getAlbums?need_covers=1&gid=35203647", function(vkRes) {
        var rawAlbums = '';
        var albums = [];
        var aids = [];
        vkRes.on("data", function(chunk) {
            rawAlbums += chunk;
        });
        vkRes.on('end', function() {
            rawAlbums = JSON.parse(rawAlbums).response;
            for (var i=0; i<rawAlbums.length; i++){
                aids.push(rawAlbums[i].aid);
                albums.push({albumTitle: rawAlbums[i].title, albumCover: rawAlbums[i].thumb_src, albumId: rawAlbums[i].aid});
            }

            async.map(aids, getPhotos, function(err, results){
                if( err ) {
                    console.log('Failed to process');
                } else {
                    for (var i=0; i<results.length; i++){
                        albums[i].albumPictures = results[i];
                    }
                    res.render('gallery', {allAlbums: albums});
                }
            });
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    // https://api.vk.com/method/photos.getAlbums?gid=35203647
    // https://api.vk.com/method/photos.get?gid=35203647&aid=200974910
    //https://vk.com/pages?oid=-1&p=%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%B2_API
});
module.exports = router;

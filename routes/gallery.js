/*var GalleryAlbums = require('../modelsDB/galleryAlbums').GalleryAlbums;*/
var express = require('express');
var router = express.Router();

/*var formidable = require('formidable');
var util = require('util');
var fs = require('fs');*/

/*router.get('/json', function(req, res) {
    if (req.query.galleryAlbumID){
        GalleryAlbums.find({_id: req.query.galleryAlbumID}, function(err, galleryAlbum){
            if(err) throw err;
            res.send(galleryAlbum);
        });
    } else {
        GalleryAlbums.find({}, function(err, galleryAlbums){
            if(err) throw err;
            galleryAlbums.reverse();
            galleryAlbums.sort(function(a,b){
                if (!a.index){
                    return 1;
                } else {
                    if(!b.index){
                        return -1;
                    } else {
                        return b.index - a.index;
                    }
                }
            });
            res.send(galleryAlbums);
        });
    }
});*/

router.get('/', function(req, res) {

    res.render('gallery', {});
   /* if (req.query.galleryAlbumID){
        if (req.query.galleryAlbumID !== '-1'){
            GalleryAlbums.find({_id: req.query.galleryAlbumID}, function(err, galleryAlbum){
                if(err) throw err;
                res.render('gallery', {mode: 'singleAlbum', singleAlbum: galleryAlbum});
            });
        } else {
            res.render('gallery', {mode: 'singleAlbum', singleAlbum: {}});
        }

    } else {
        GalleryAlbums.find({}, function(err, galleryAlbums){
            if(err) throw err;
            galleryAlbums.reverse();
            galleryAlbums.sort(function(a,b){
                if (!a.index){
                    return 1;
                } else {
                    if(!b.index){
                        return -1;
                    } else {
                        return b.index - a.index;
                    }
                }
            });
            res.render('gallery', {allAlbums: galleryAlbums});
        });
    }*/
});
//post is not ready
/*router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;

        if (files.logo.name){
            fs.rename(files.logo.path, "./public/images/news/" + fields._id + '.' + files.logo.type.split('/')[1], function(err){
                if (err) throw err;
            });
        } else {
            fs.unlink(files.logo.path, function(err){
                if (err) throw err;
            });
        }

        var galleryAlbum = new GalleryAlbums (
            { index:  fields.index,
                albumName: fields.albumName,
                albumDescription: fields.albumDescription,
                albumCover: fields.albumCover,
                albumPictures: []
            }*//*

            { title:  fields.title,
            logo: fields._id + '.' + files.logo.type.split('/')[1],
            shortDescription:  fields.shortDescription,
            description:  fields.description,
            fullText: fields.fullText,
            date: fields.date,
            index: fields.index
        }*//*);
        galleryAlbum.save(function(err){
            if (err) throw err;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        })
    });
});*/

/*router.put('/', function(req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./temp";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        if (files.logo.name){
            fs.rename(files.logo.path, "./public/images/news/" + fields._id + '.' + files.logo.type.split('/')[1], function(err){
                if (err) throw err;
            });
        } else {
            fs.unlink(files.logo.path, function(err){
                if (err) throw err;
            });
        }
        News.findById(fields._id, function(err, news){
            if(err) throw err;
            if (news) {
                news.logo = fields._id + '.' + files.logo.type.split('/')[1];
                for (var i in fields){
                    news[i] = fields[i];
                }
                news.save(function(err){
                    if (err) throw err;
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.write('received upload:\n\n');
                    res.end(util.inspect({fields: fields, files: files}));
                })
            }
        });
    });
});

router.delete('/', function(req, res) {
    News.findById(req.body.id, function (err, news) {
        if (err) throw err;
        if(!news) {
            res.statusCode = 404;
            res.send({ error: 'Not found' });
        } else {
            news.remove(function (err) {
                if (!err) {
                    res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
            });
        }
    });
});*/

module.exports = router;

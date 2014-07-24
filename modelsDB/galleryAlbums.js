//not used because it is not worse it

var mongoose = require('../bin/mongoose').mongoose;
var Schema = mongoose.Schema;

var schema = new Schema({ index:  String,
    albumName: String,
    albumDescription: String,
    albumCover: String,
    albumPictures:  Array
});
//albumPictures: [{pictureName, pictureTitle, pictureDescription},{},{},{}]

exports.GalleryAlbums = mongoose.model('galleryAlbum', schema);
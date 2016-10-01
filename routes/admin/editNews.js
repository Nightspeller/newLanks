var Departments = require('../../modelsDB/news').News;
var express = require('express');
var router = express.Router();

var checkAuth = require('../../middleware/checkAuth');

router.get('/', checkAuth, function(req, res) {
    if (req.query.mode === 'add'){
        res.render('admin/editNews', {mode: 'delete', news: {}});
    }
    if (req.query.id){
        Departments.findOne({_id: req.query.id}, function(err, news){
            if(err) throw err;
            res.render('admin/editNews', {mode: 'single', news: news});
        });
    } else {
        Departments.find({}, function(err, news){
            if(err) throw err;
            news.reverse();
            res.render('admin/editNews', {news: news});
        });
    }
});

module.exports = router;

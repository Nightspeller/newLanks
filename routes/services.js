var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('services', { });
});

router.get('/combined', function(req, res) {
  res.render('services-combined', { });
});

router.get('/warehouse', function(req, res) {
  res.render('services-warehouse', { });
});

router.get('/whole-cars', function(req, res) {
  res.render('services-whole-cars', { });
});

router.get('/courier', function(req, res) {
  res.render('services-courier', { });
});

router.get('/additional', function(req, res) {
  res.render('services-additional', { });
});

router.get('/cross-docking', function(req, res) {
  res.render('services-cross-docking', { });
});

module.exports = router;

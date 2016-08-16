var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('services', { });
});

router.get('/sborni-gruz', function(req, res) {
  res.render('sborni-gruz', { });
});

router.get('/sklad', function(req, res) {
  res.render('sklad', { });
});

module.exports = router;

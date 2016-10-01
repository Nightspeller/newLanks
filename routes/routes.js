var express = require('express');
var router = express.Router();

router.use(require('./../middleware/shtmlCheck'));
router.use(require('./../middleware/loadUser'));
router.use(require('./../middleware/loadHeaderAndFooter'));

router.use('/', require('./index'));
router.use('/about', require('./about'));
router.use('/services', require('./services'));
router.use('/departments', require('./departments'));
router.use('/calculate', require('./calculate'));
router.use('/online', require('./online'));
router.use('/news', require('./news'));
router.use('/postOriflameData', require('./api/postOriflameData'));

//Admin
router.use('/login', require('./admin/login'));
router.use('/admin', require('./admin/admin'));
router.use('/editDepartment', require('./admin/editDepartment'));
router.use('/editnews', require('./admin/editNews'));

module.exports = router;
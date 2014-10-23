var express = require('express');
var router = express.Router();

router.use(require('./../middleware/shtmlCheck'));
router.use(require('./../middleware/loadUser'));
router.use(require('./../middleware/loadHeaderAndFooter'));

router.use('/', require('./index'));
router.use('/users', require('./users'));
router.use('/about', require('./about'));
router.use('/question', require('./question'));
router.use('/services', require('./services'));
router.use('/departments', require('./departments'));
router.use('/calculate', require('./calculate'));
router.use('/order', require('./order'));
router.use('/online', require('./online'));
router.use('/news', require('./news'));
router.use('/editDepartment', require('./editDepartment'));
router.use('/login', require('./login'));
router.use('/simpleCalculate', require('./simpleCalculate'));
router.use('/admin', require('./admin'));
router.use('/gallery', require('./gallery'));
router.use('/oriflameUploader', require('./oriflameUploader'));
router.use('/postOriflameData', require('./postOriflameData'));

module.exports = router;
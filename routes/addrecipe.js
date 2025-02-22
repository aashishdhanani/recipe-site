var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addrecipe', { title: 'Add Recipes Page' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
    console.log(res)
    return res.render('index');
  });
});


module.exports = router;

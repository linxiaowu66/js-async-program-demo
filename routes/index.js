var express = require('express');
var router = express.Router();
var request = require('request');

/* Traditional Async - callback */
router.get('/', function(req, res, next) {
  const finalRes = res;
  request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
        request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
          request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
            return finalRes.render('index', {title: 'express'});
          });
        });
      });
    });
  });
});

/* ES6 Async - Promise*/
router.get('/promise', function(req, res, next) {
  let reqApi = new Promise((resolve, reject) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      if (err){
        reject(err);
      } else{
        resolve(body);
      }
    });
  });
  reqApi
  .then((body) => reqApi)
  .then((body) => reqApi)
  .then((body) => reqApi)
  .then((body) => reqApi)
  .then((body) => {
    return res.render('index', {title: 'express', result: body});
  })
  .catch(err => {
    console.log(err)
  })
});


/* ES6 Async - Generator*/


/* ES7 Async - Async/Await*/

module.exports = router;

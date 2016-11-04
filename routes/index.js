var express = require('express');
var router = express.Router();
var request = require('request');
const request_promise = require('request-promise');

/* Traditional Async - callback */
router.get('/', function(req, res, next) {
  const finalRes = res;
  request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
        request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
          request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
            return finalRes.render('index', {title: 'express', result: body});
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

/*ES6 Async - Promise.all*/
router.get('/promiseAll', function(req, res, next) {
  let reqApi = new Promise((resolve, reject) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      if (err){
        reject(err);
      } else{
        resolve(body);
      }
    });
  });
  Promise.all([reqApi, reqApi, reqApi, reqApi, reqApi])
  .then((body) => {
    return res.render('index', {title: 'express', result: body});
  })
  .catch(err => {
    console.log(err)
  })
});

/*ES6 Async - Promise.race*/
router.get('/promiseRace', function(req, res, next) {
  let reqApi = new Promise((resolve, reject) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      if (err){
        reject(err);
      } else{
        resolve(body);
      }
    });
  });
  Promise.race([reqApi, reqApi, reqApi, reqApi, reqApi])
  .then((body) => {
    return res.render('index', {title: 'express', result: body});
  })
  .catch(err => {
    console.log(err)
  })
});

/* ES6 Async - Generator callback version*/

router.get('/generator', function(req, res, next) {
  const finalRes = res;
  function* generator(){
    let val = [];
    val[0] = yield request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      g.next(body);
    });
    val[1] = yield request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      g.next(body);
    });
    val[2] = yield request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      g.next(body);
    });
    val[3] = yield request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      g.next(body);
    });
    yield request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      val.push(body)
      return finalRes.render('index', {title: 'express', result: val});
    });
  }
  var g = generator();
  g.next();
})

/* ES6 Async - Generator promise version*/
function *generator(){
  yield request_promise({
    url: 'https://api.github.com/repos/linxiaowu66/react-table-demo',
    method: 'get',
    headers: {
      'User-Agent': 'request'
    }
  }).then( d => {
    return d;
  }).catch( err => {
    return err
  });

  /*you can Add more Async operation*/
}
router.get('/generator-promise', function(req, res, next) {
  const g = generator();
  let val = [];
  iterator();
  function iterator(){
    let next = g.next();
    if (next.done){
      return res.render('index', {title: 'express', result: val});
    }
    next.value.then( data => {
      val.push(data);
      iterator();
    }).catch( err => {
      console.log(err);
      return res.render('index', {title: 'express', result: err});
    })
  }

})
/* ES7 Async - Async/Await*/
async function getUrl (){
  let reqApi = new Promise((resolve, reject) => {
    request('https://api.douban.com/v2/user/linxiaowu', (err, res, body) => {
      if (err){
        reject(err);
      } else{
        resolve(body);
      }
    });
  });
  try{
    let result = await Promise.all([reqApi, reqApi, reqApi, reqApi]);
    return result;
  } catch(err){
    console.log(err)
  }
}
router.get('/async', function(req, res, next) {
  getUrl().then(data => {
    res.render('index', {title: 'express', result: data});
  })
  .catch(err => {
    res.render('index', {title: 'express', result: err});
  });
});
module.exports = router;

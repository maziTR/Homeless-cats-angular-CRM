var express = require('express');
var router = express.Router();

var db = require('./db');

router.get('/', function (req, res) {
  if (req.query.term) {
    db.query(`SELECT * from companies WHERE ${req.query.column} LIKE '%${req.query.term}%'`, function (err, rows, fields) {
      if (!err)
        res.send(rows);
      else
        console.log('Error while performing Query:' + err);
    });
  } else {
    db.query('SELECT * from companies', function (err, rows, fields) {
      if (!err)
        res.send(rows);
      else
        console.log('Error while performing Query:' + err);
    });
  }
});

router.delete('/:id', function (req, res) {
  let companyId = req.params.id;
  db.query("DELETE FROM companies WHERE id = " + companyId, function (err, result) {
    console.log(result);
    res.status(200).send({});
  });
});

router.post('/', function (req, res) {
  db.query('SELECT MAX(id) AS id FROM companies', function (err, result, fields) {
    req.body.id = result[0].id + 1;
    db.query('INSERT INTO companies SET ?', req.body, function (err, result) {
      if (!err) {
        res.send(req.body);
      }
      else {
        throw err;
      }
    });
  })
});

// db.query('INSERT INTO companies SET ?', company1, function (err, result) {
//     console.log(result);
// });

/*  app.get('/save',function(req,res){
    var post  = {from:'me', to:'you', msg:'hi'};
    db.query('INSERT INTO messages SET ?', post, function(err, result) {
      if (err) throw err;
    });
});  */

// var  company = {
//     id: 1,
//     companyName: 'Catpany',
//     address:"The streets 1/2",
//     country:"catlandia",
//     customersNum:200
// }

// var  company1 = {
//   id: 2,
//   companyName: 'Catington',
//   address:"The streets of heaven 1/2",
//   country:"catimal",
//   customersNum:10
// }

// var company2 = {
//   id: 3,
//   companyName: 'Catatania',
//   address:"The sheker streets 1/2",
//   country:"catomtomia",
//   customersNum:10000
// }

// var company4 = {
//   id: 4,
//   companyName: 'theLazyCats',
//   address:"The bla streets 1/2",
//   country:"catmando",
//   customersNum:100
// }

// db.query('INSERT INTO companies SET ?', company1, function (err, result) {
//     console.log(result);
// });

// db.query('INSERT INTO companies SET ?', company4, function (err, result) {
//     console.log(result);
// });

// db.query('INSERT INTO companies SET ?', company, function (err, result) {
//     console.log(result);
// });

module.exports = router;
var express = require('express');
var router = express.Router();

var db = require('./db');

/* app.get('/save',function(req,res){
    var post  = {from:'me', to:'you', msg:'hi'};
    db.query('INSERT INTO messages SET ?', post, function(err, result) {
      if (err) throw err;
    });
}); */

/*
var  company = {
    id: 1,
    companyName: 'Catpany',
    address:"The streets 1/2",
    country:"catlandia",
    customersNum:200
}

var  company1 = {
  id: 2,
  companyName: 'Catington',
  address:"The streets of heaven 1/2",
  country:"catimal",
  customersNum:10
}

var company2 = {
  id: 3,
  companyName: 'Catatania',
  address:"The sheker streets 1/2",
  country:"catomtomia",
  customersNum:10000
}

var company4 = {
  id: 4,
  companyName: 'theLazyCats',
  address:"The bla streets 1/2",
  country:"catmando",
  customersNum:100
}

db.query('INSERT INTO companies SET ?', company2, function (err, result) {
    console.log(result);
}); 
*/



module.exports = router;
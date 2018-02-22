var express = require('express');
var router = express.Router();
var mysql = require('mysql');

 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'catscrm'
});

connection.connect();

module.exports = connection;
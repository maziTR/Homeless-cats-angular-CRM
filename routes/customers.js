const express = require('express');
const router = express.Router();

const db = require('./db');

const moment = require('moment');

// get all customers (without comments)
router.get('/', (req, res) => {
  if (req.query.term) {
    db.query("SELECT customers.id, firstName, lastName, companyId, email, phone, companyName FROM customers " +
      "INNER JOIN companies ON companies.id = customers.companyId WHERE " + req.query.column + " LIKE '%" + 
      req.query.term + "%'", (err, rows, fields) => {
        if (err) console.error(err);
        else {
          res.send(rows);
        }
      });
  } else {
    db.query("SELECT customers.id, firstName, lastName, companyId, email, phone, companyName FROM customers " +
    "INNER JOIN companies ON companies.id = customers.companyId", (err, rows, fields) => {
      if (err) console.error(err);
      else {
        res.send(rows);
      }
    });
  }
});

// get customer
router.get('/:id', (req, res) => {
  let customerId = req.params.id;
  let sqlQuery = "SELECT customers.id, firstName, lastName, companyId, email, phone, companyName FROM customers " +
    " INNER JOIN companies ON companies.id = customers.companyId" + " WHERE customers.id = " + customerId;
  db.query(sqlQuery, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      res.send(rows);
    }
  });
});

// get comments for a specific customer
router.get('/:id/comments', (req, res) => {
  let customerId = req.params.id;
  let sqlQuery = `SELECT * FROM comments WHERE customerId = ${customerId}`;
  db.query(sqlQuery, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      res.send(rows);
    }
  });
});

// add a new customer
router.post('/', (req, res) => {
  let customer = req.body;
  // might be used in the future for adding a new customer with comments
  // let comments = _convertCommentsArray(req.body.comments);
  // db.query("INSET INTO comments (id, text, customerId, date) VALUES ?", [comments], (error, result) => {
  //   if (error) console.error(error);
  // });
  db.query('SELECT MAX(id) AS id FROM customers', (err, rows, fields) => {
    customer.id = rows[0].id + 1;
    db.query('INSERT INTO customers SET ?', customer, (error, result) => {
      if (error) console.error(error);
      else {
        db.query(`SELECT * FROM companies WHERE id = ${customer.companyId}`, (err, rows, fields) => {
          if (error) console.error(error);
          else {
            customer.companyName = rows[0].companyName;
            let customersNum = rows[0].customersNum + 1;
            db.query("UPDATE companies SET ? WHERE ?", [{ customersNum: customersNum }, { id: customer.companyId }],
              (error, result) => {
                if (error) console.error(error);
                else {
                  res.send(JSON.stringify(customer));
                }
            });
          }
        });
      }
    });
  });
});

// add comment to customer
router.post('/:id', (req, res) => {
  // generate comment id
  db.query('SELECT MAX(id) AS id FROM comments', (err, rows, fields) => {
    if (err) console.error(err);
    else {
      let comment = req.body;
      comment.id = rows[0].id + 1;
      // change date of comment to a format mysql understands
      comment.date = moment(comment.date).format('YYYY-MM-DD');
      db.query("INSERT INTO comments SET ?", comment, (error, result) => {
        if (error) console.error(error);
        else res.send(JSON.stringify(comment));
      });
    }
  });
});

// delete a customer
router.delete('/:id/:companyId', (req, res) => {
  let customerId = req.params.id;
  let companyId = req.params.companyId;
  db.query("DELETE FROM comments WHERE customerId = " + customerId, (error, result) => {
    if (error) console.error(error);
    else {
      db.query("DELETE FROM customers WHERE id = " + customerId, (error, result) => {
        if (error) console.error(error);
      });
    }
  });
  db.query("SELECT * FROM companies WHERE id = " + companyId, (error, rows, fields) => {
    if (error) console.error(error);
    else {
      let customersNum = rows[0].customersNum - 1;
      db.query("UPDATE companies SET ? WHERE ?", [{ customersNum: customersNum }, { id: companyId }], (error, result) => {
        if (error) console.error(error);
        else {
          res.status(200).send({});
        }
      });
    }
  });
});

// converts comments array of objects to array of arrays - not used since new customer is created without any comments
// function _convertCommentsArray(comments) {
//   return comments.map(element => {
//     let array = [];
//     array.push(parseInt(element.id));
//     array.push(element.text);
//     array.push(parseInt(element.customerId));
//     array.push(element.date);
//     return array;
//   });
// }

// -- Initial Data --
// var customer1 = {id: 1, firstName: 'Mitzi', lastName: 'Cohen', companyId: 3, email: 'mitzi@gmail.com', phone: '050-4325167'};
// var customer2 = {id: 2, firstName: 'Hairball', lastName: 'Oz', companyId: 2, email: 'hairball@gmail.com', phone: '052-7325167'};
// var customer3 = {id: 3, firstName: 'Fluffy', lastName: 'Segal', companyId: 1, email: 'fluffy@gmail.com', phone: '054-8325167'}


// db.query('INSERT INTO customers SET ?', customer1, function (err, result) {
//   console.log(result);
// }); 
// db.query('INSERT INTO customers SET ?', customer2, function (err, result) {
//     console.log(result);
// });
//  db.query('INSERT INTO customers SET ?', customer3, function (err, result) {
//     console.log(result);
// }); 

// var comment1 = {id: 1, text: 'Meow', customerId: 3, date: '2018-02-01'};
// var comment2 = {id: 2, text: 'Meow Meow', customerId: 2, date: '2016-02-01'};
// var comment3 = {id: 3, text: 'Meow Meow Meow', customerId: 1, date: '2011-02-01'};

// db.query('INSERT INTO comments SET ?', comment1, function (err, result) {
//   console.log(result);
// }); 
// db.query('INSERT INTO comments SET ?', comment2, function (err, result) {
//   console.log(result);
// }); 
// db.query('INSERT INTO comments SET ?', comment3, function (err, result) {
//   console.log(result);
// }); 

module.exports = router;
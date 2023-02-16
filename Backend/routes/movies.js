const express = require('express');
const router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CS348Project',
    database: 'Project'
});

connection.connect(function (err) {
    if (err) throw err

});

// returns all the users
router.get('/', function (req, res, next) {
    // connection.connect();

    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genre FROM movies';
    // console.log(queryString);
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
            // connection.end();
        } else {
            console.log(results);
            res.send(results);
        }
    });
    // connection.end();
});

module.exports = router;
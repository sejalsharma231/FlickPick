const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid').v4;
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CS348Project',
    database: 'Project'
});

connection.connect(function(err) {
	if (err) throw err
	
});

// adds a new user to the database
router.post('/', function (req, res) {
    const {
        firstName,
        lastName,
        password,
    } = req.body;

    // to check that all user information is valid
    const isValidFirstName = firstName !== undefined && typeof firstName == 'string';
    const isValidLastName = lastName !== undefined && typeof lastName == 'string';
    const isValidPassword = password !== undefined && typeof password == 'string';


    if (isValidFirstName && isValidLastName && isValidPassword) {
        const uuid = uuidv4();
        // connection.connect();

        const queryString = `INSERT into users (uuid,firstName,lastName, password) VALUES ("${uuid}", "${firstName}", "${lastName}", "${password}" )`;

        console.log(queryString);
        connection.query(queryString, (error, results) => {
            if (error) {
                res.status(400).send('Database could not insert the user');
            }else{
                res.send("Added new user");
            }
        });
        // connection.end();

    } else {
        res.status(400).send('Invalid Input!');
    }
});

// returns all the users
router.get('/', function (req, res, next) {
    // connection.connect();

    const queryString = 'SELECT * FROM users';
    console.log(queryString);
        connection.query(queryString, (error, results) => {
            if (error) {
                res.send(error);
                // connection.end();
            }else{
                res.send(results);
            }
    });
    // connection.end();
  });



module.exports = router;
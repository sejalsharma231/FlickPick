const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;
var mysql = require("mysql");

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
  const isValidFirstName = firstName !== undefined && typeof firstName == "string";
  const isValidLastName = lastName !== undefined && typeof lastName == "string";
  const isValidPassword = password !== undefined && typeof password == "string";

  if (isValidFirstName && isValidLastName && isValidPassword) {
    const uuid = uuidv4();
    // connection.connect();

    const queryString = `INSERT into users (uuid,firstName,lastName, password) VALUES ("${uuid}", "${firstName}", "${lastName}", "${password}" )`;

    console.log(queryString);
    connection.query(queryString, (error, results) => {
      if (error) {
        res.status(400).send("Database could not insert the user");
      } else {
        res.send("Added new user");
      }
    });
    // connection.end();
  } else {
    res.status(400).send("Invalid Input!");
  }
});

// returns all the users
router.get("/", function (req, res, next) {
  // connection.connect();

  const queryString = "SELECT * FROM users";
  connection.query(queryString, (error, results) => {
    if (error) {
      res.send(error);
      // connection.end();
    } else {
      res.send(results);
    }
  });
  // connection.end();
});

router.get("/validate", function (req, res, next) {
  // connection.connect();
  const firstName = req.query.firstName;
  const lastName = req.query.lastName;
  const password = req.query.password;
  console.log("invalidate");
  const isValidFirstName =
    firstName !== undefined && typeof firstName == "string";
  const isValidLastName = lastName !== undefined && typeof lastName == "string";
  const isValidPassword = password !== undefined && typeof password == "string";

  if (isValidFirstName && isValidLastName && isValidPassword) {
    const queryString = `SELECT * FROM users where (firstName, lastName, password) = ("${firstName}", "${lastName}", "${password}")`;
    connection.query(queryString, (error, results) => {
      if (error) {
        res.send(error);
        // connection.end();
      } else {
        if (results.length == 1) {
          console.log(results);
          res.send(results);
        } else {
          res.status(404).send("User doesn't exist in the database");
        }
      }
    });
  }
  // connection.end();
});

module.exports = router;

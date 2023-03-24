const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;
var mysql = require("mysql");
const jwt = require("jsonwebtoken");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CS348Project',
  database: 'Project'
});

connection.connect(function (err) {
  if (err) throw err

});

// adds a new user to the database
router.post('/', function (req, res) {
  const {
    firstName,
    lastName,
    password,
    email,
  } = req.body;

  // to check that all user information is valid
  const isValidFirstName = firstName !== undefined && typeof firstName == "string";
  const isValidLastName = lastName !== undefined && typeof lastName == "string";
  const isValidPassword = password !== undefined && typeof password == "string";
  const isValidEmail = email !== undefined && typeof email == "string";

  if (isValidFirstName && isValidLastName && isValidPassword && isValidEmail) {
    const uuid = uuidv4();

    const queryString = `INSERT into users (uuid,firstName,lastName, password, email) VALUES ("${uuid}", "${firstName}", "${lastName}", "${password}", "${email}" )`;

    console.log(queryString);
    connection.query(queryString, (error, results) => {
      if (error) {
        res.status(400).send("Database could not insert the user");
      } else {
        console.log(results);
        const jwtToken = jwt.sign(
          { email: email },
          "secret"
        )
        res.json({ message: "Welcome Back!", token: jwtToken });
      }
    });
  } else {
    res.status(400).send("Invalid Input!");
  }
});

// returns all the users
router.get("/", function (req, res, next) {

  const queryString = "SELECT * FROM users";
  connection.query(queryString, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

router.post("/validate", function (req, res) {
  const { email, password } = req.body;

  const isValidEmail = email !== undefined && typeof email == "string";
  const isValidPassword = password !== undefined && typeof password == "string";

  if (isValidEmail && isValidPassword) {
    const queryString = `SELECT * FROM users where (email, password) = ("${email}", "${password}")`;
    connection.query(queryString, (error, results) => {
      if (error) {
        res.send(error);
      } else {
        //console.log(results[0].userID);
        if (results.length == 1) {
          const jwtToken = jwt.sign(
            { userID: results[0].userID },
            "secret"
          )
          res.json({ message: "Welcome Back!", token: jwtToken, userID: results[0].userID });
        } else {
          res.status(404).send("Email or password does not match");
        }
      }
    });
  };
});

router.get('/watchlist', function (req, res, next) {

  const userID = req.query.userID
  const queryString = `SELECT * FROM movies where id in (select mid from Watchlist where userId = ${userID})`;
  connection.query(queryString, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

router.get('/watchlist/check', function (req, res, next) {
  const userID = req.query.userID
  const mid = req.query.mid
  const queryString = `SELECT * FROM Watchlist WHERE userID = ${userID} and mid = ${mid}`;
  connection.query(queryString, (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

router.post('/watchlist/add', function (req, res, next) {
  const {
    userID,
    mid,
  } = req.body;

  // add validators to check that everything is a string

  const queryString = `INSERT into Watchlist (userID,mid) VALUES (${userID}, ${mid})`;

  connection.query(queryString, (error, results) => {
    if (error) {
      res.status(400).send('Database could not insert into watchlist');
    } else {
      res.send("Added new watchlist entry");
    }
  });
});

router.post('/watchlist/remove', function (req, res, next) {
  const {
    userID,
    mid,
  } = req.body;
  // add validators to check that everything is a string

  const queryString = `DELETE from Watchlist WHERE userID = ${userID} and mid = ${mid}`;

  connection.query(queryString, (error, results) => {
    if (error) {
      res.status(400).send('Database could not delete from watchlist');
    } else {
      res.send("Deleted selected watchlist entry");
    }
  });
});

module.exports = router;

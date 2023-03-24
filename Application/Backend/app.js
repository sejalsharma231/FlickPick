const http = require('http');
const port = 8000;

const express = require("express");
const cors = require('cors');
const app = express();
const parse = require("body-parser");

const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');


app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/movies', moviesRouter);


//const request = require("request");

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'CS348Project',
//   database: 'Project'
// });
// connection.connect();

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// connection.query('SELECT * from movies limit 1', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// app.get("/", (req, res) => {
//   res.json({message: "Server is now running on 8000"})
// });

// connection.end();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

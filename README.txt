# CS348Project

# How to load the movie database into sql
 - Download dataset from https://www.kaggle.com/datasets/harshitshankhdhar/imdb-dataset-of-top-1000-movies-and-tv-shows
 - Access MySql and using a new schema create a new database as follows:
    CREATE TABLE movies (
      Poster_Link TEXT,
      Series_Title TEXT,
      Released_Year INT(11),
      Certificate TEXT,
      Runtime TEXT,
      Genre TEXT,
      IMDB_Rating DOUBLE,
      Overview TEXT,
      Meta_score INT(11),
      Director TEXT,
      Star1 TEXT,
      Star2 TEXT,
      Star3 TEXT,
      Star4 TEXT,
      No_of_Votes INT(11),
      Gross TEXT,
      PRIMARY KEY (Series_Title)
    );
  - Load the dataset into the table as follows:
      LOAD DATA INFILE 'Path to the exported csv file'
      INTO TABLE movies
      FIELDS TERMINATED BY ','
      IGNORE 1 ROWS;


# Source code to access the database and print hello world

const http = require('http');
const port = 3000;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CS348Project',
  database: 'Project'
});
connection.connect();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

connection.query('SELECT * from movies limit 1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

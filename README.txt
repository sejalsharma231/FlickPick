## CS348Project

## How to create the sample database

Use the mysql CLI commands to create a new database
 CREATE database Project
 USE Project
 source ./create_tables.sql;
 
 
## How to generate test query output using CLI

 tee ./test-sample.out
 source ./test-sample.sql;
 
 
## How to run database-driven application

 Navigate to movies.js and user.js in the Backend/roots folder of the application.
 Update the following code in both the files to reflect your connection parameters.
 
 var connection = mysql.createConnection({
    host: 'localhost', //update
    user: 'root', //update 
    password: 'CS348Project', //update
    database: 'Project' //update
});

run 'npm install' in the Backend directory and 'npm start' to start the server

run 'npm install' in the Frontend directory and 'npm start' to start the server


## Currently supported features

1) Creating an Account (adding a new user)
2) Login
3) Search Bar Functionality
4) Sort Movies Functionality
5) Adding movies to a Watchlist
6) User Authentication
7) Well Designed UI

Please refer to report.pdf for additional details.

## CS348Project

## How to create tables and populate the sample database

Step 1: Download the SampleDump.sql file from github

Step 2: Log into mysql using your username and password on the command line:
 mysql -u <username> -p 
 
Step 3: Once logged in, run the following commands to load the database:

 CREATE database Project;
 USE Project;
 source <PATH_NAME/SampleDump.sql>;
 
 ## How to create tables and populate the production database

Step 1: Download the ProductionDatabase.sql file from github

Step 2: Log into mysql using your username and password on the command line:
 mysql -u <username> -p 
 
Step 3: Once logged in, run the following commands to load the database:

 CREATE database Project;
 USE Project;
 source <PATH_NAME/ProductionDatabase.sql>;
 
 
## How to generate test query output using CLI for Sample dataset

 tee ./test-sample.out;
 source ./test-sample.sql;
 
 ## How to generate test query output using CLI for Production dataset

 tee ./test-production.out;
 source ./test-production.sql;
 
## How to run database-driven application

 <b>Navigate to movies.js and user.js in the Application/Backend/roots folder of the application.</b>
 
 <u>Update the following code in both the files to reflect your connection parameters or make sure your parameters are the same as follows if you do not want to make any changes in the source code.</u>
 
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
8) Recommend Movie functionality
9) Filter movie functionality
10) Input validation
11) Multi-user access control

Please refer to report.pdf for additional details.

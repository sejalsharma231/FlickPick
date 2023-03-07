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

    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genre, Overview, IMDB_Rating, id, Poster_Link FROM movies';
    // console.log(queryString);
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
            // connection.end();
        } else {
            //console.log(results);
            res.send(results);
        }
    });
    // connection.end();
});

router.get('/search/data', function (req, res, next) {
    const movieName = req.query.name;
    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genre, Overview, IMDB_Rating, id, Poster_Link FROM movies where Series_Title like \'%' + movieName + '%\'';
    console.log(queryString);
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

router.get('/sort/data', function (req, res, next) {
    var sortField = req.query.sort;
    var searchField = req.query.search;
    if (sortField == 'Name') {
        sortField = 'Series_Title'
    } else if (sortField == 'Year') {
        sortField = 'Released_Year'
    } else {
        sortField = 'Runtime'
    }
    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genre FROM movies where Series_Title like \'%' + searchField + '%\' order by ' + sortField;
    console.log(queryString);
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

router.get('/filter/data', function (req, res, next) {
    var List = req.query.list;
    console.log("list: " + List)
    var sortField = req.query.sort;
    var searchField = req.query.search;
    var partialQuery = ""
    var filterList = []
    console.log("list length: " + List.length)
    while (List.length > 0) {
        if (List.indexOf(',') == -1) {
            filterList.push(List)
            console.log("last push : " + List)
            List = ""
            console.log("new list : " + List)
        } else {
            filterList.push(List.substring(0, List.indexOf(',')))
            console.log("pushed to filter : " + List.substring(0, List.indexOf(',')))
            List = List.substring(List.indexOf(',') + 1)
            console.log("new list : " + List)
        }
    }
    console.log(filterList)
    function append(text, bool) {
        if (bool) {
            partialQuery += 'and (Genre like \'%' + text + '%\''
        } else {
            partialQuery += 'or Genre like \'%' + text + '%\''
        }
    }
    for (var i = 0; i < filterList.length; i++) {
        append(filterList[i], (i == 0))
    }
    partialQuery += ')'
    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genre FROM movies where Series_Title like \'%' + searchField + '%\' ' + partialQuery;
    console.log(queryString);
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

module.exports = router;
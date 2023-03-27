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

// returns all the movies
router.get('/', function (req, res, next) {
    // connection.connect();

    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies';
    // console.log(queryString);
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});

router.get('/trending', function (req, res, next) {
    const queryString = `SELECT * from (SELECT Movie_ID, count(*) FROM watchlist GROUP BY Movie_ID ORDER BY count(*) desc) as a join movies on a.Movie_ID = movies.Movie_ID LIMIT 20`;
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});

router.get('/search/data', function (req, res, next) {
    const movieName = req.query.name;
    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like \'%' + movieName + '%\'';
    console.log(queryString);
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
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
    const queryString = 'SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like \'%' + searchField + '%\' order by ' + sortField;
    console.log(queryString);
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});

router.get('/filter/data', function (req, res, next) {
    var List = req.query.list.split(",")
    var sortField = req.query.sort;
    var searchField = req.query.search;
    if (List.length > 0) {
        var partialQuery = "SELECT * from genres where Genres in ("
        for (let i = 0; i < List.length; i++) {
            partialQuery += '\'' + List[i] + '\''
            if (i != List.length - 1) {
                partialQuery += ","
            }
        }
        partialQuery += ")"
    }
    var queryString = 'SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (' + partialQuery + ') as A where movies.Movie_ID = A.Movie_ID and Series_Title like \'%' + searchField + '%\''
    if (sortField != "") {
        queryString += " order by " + sortField
    }
    console.log("final query: " + queryString)
    connection.query(queryString, (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.send(results);
        }
    });
});


router.get('/recommend', function (req, res, next) {
    const movieName = req.query.movieName;
    const isValidMovieName = movieName !== undefined && typeof movieName == "string";
    if (isValidMovieName) {
        const queryString = 'SELECT m.Series_Title, m.Released_Year,m.Overview, input_movies.Released_Year, m.Genres, input_movies.Genres, d.Director, m.IMDB_Rating, SUM(CASE WHEN m.Genres = input_movies.Genres THEN 2 ' +
            'WHEN m.Genres like input_movies.Genres THEN 1 ELSE 0 END' +
            ' + CASE WHEN (Select Director from directors as d where d.Movie_ID = m.Movie_ID) = (Select Director from directors as d where d.Movie_ID = input_movies.Movie_ID) THEN 1 ELSE 0 END'
            + '+ CASE WHEN EXISTS (Select Star as s from actors as a where a.Movie_ID = m.Movie_ID and a.Star IN (SELECT Star from actors as a2 where a2.Movie_ID = input_movies.Movie_ID )) THEN 1 ELSE 0 END'
            + '+ CASE WHEN ABS(m.Released_Year - input_movies.Released_Year) <= 10 THEN 1 ELSE 0 END) AS similarity_score ' +
            'FROM directors as d, movies As m , (SELECT * FROM movies WHERE Series_Title = "' + movieName + '") As input_movies ' +
            'WHERE m.Series_Title <> "' + movieName + '" and m.Movie_ID = d.Movie_ID GROUP BY m.Series_Title, m.Released_Year,m.Overview, input_movies.Released_Year, m.Genres, input_movies.Genres, d.Director, m.IMDB_Rating ' +
            'HAVING similarity_score > 0 Order by similarity_score DESC, m.IMDB_Rating DESC LIMIT 10;'
        connection.query(queryString, (error, results) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        });
    } else {
        res.status(400).send("Invalid Input!");
    }
});

module.exports = router;
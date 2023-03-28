-- adding sample users 
INSERT INTO Users ( firstName, lastName, email, password) VALUES ( 'Test', 'User3', 'testingAgain@example.com', 'passwordCS348' );

-- adding movies to users’ watchlist 
INSERT into Watchlist (userID,Movie_ID) VALUES (1, 5), (2,6), (3,2), (3,5);

-- searching for movies containing “Godfather”
SELECT Movie_ID, Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Poster_Link FROM movies where Series_Title like '%Godfather%';

-- sorting movies by year of release 
SELECT Movie_ID, Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Poster_Link FROM movies order by Released_Year ;

-- sorting movies by Runtime 
SELECT Movie_ID, Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Poster_Link FROM movies order by abs(Runtime) ;

-- sorting movies by year of release if user has already searched for movies containing “The”
SELECT Movie_ID, Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Poster_Link FROM movies where Series_Title like '%The%'  order by Released_Year ;

-- Deleting movies with id = 2 from users (user id = 1) watchlist
DELETE from Watchlist WHERE userID = 1 and Movie_ID = 2;

-- This query checks whether the movie with id = 3 already exists in the user’s (userID =1) watchlist
SELECT * FROM Watchlist WHERE userID = 1 and Movie_ID = 3;

-- This query finds and returns all the movies that exist in the user’s (userID = 1) watchlist 
SELECT * FROM movies where Movie_ID in (select Movie_ID from Watchlist where userId = 2);

-- This query recommends movies similar to The Shawshank Redemption
SELECT m.Series_Title, m.Released_Year, m.Overview, input_movies.Released_Year, m.Genres, input_movies.Genres, d.Director, m.IMDB_Rating,
SUM(CASE WHEN m.Genres = input_movies.Genres THEN 2
	WHEN m.Genres like input_movies.Genres THEN 1 ELSE 0 END 
    + CASE WHEN (Select Director from directors as d where d.Movie_ID = m.Movie_ID) = (Select Director from directors as d where d.Movie_ID = input_movies.Movie_ID) THEN 1 ELSE 0 END
    + CASE WHEN EXISTS (Select Star as s from actors as a where a.Movie_ID = m.Movie_ID and a.Star IN (SELECT Star from actors as a2 where a2.Movie_ID = input_movies.Movie_ID )) THEN 1 ELSE 0 END
    + CASE WHEN ABS(m.Released_Year - input_movies.Released_Year) <= 10 THEN 1 ELSE 0 END) AS similarity_score 
FROM directors as d, movies As m , (SELECT * FROM movies WHERE Series_Title = "The Shawshank Redemption") As input_movies  WHERE m.Series_Title <> "The Shawshank Redemption" and m.Movie_ID = d.Movie_ID
GROUP BY m.Series_Title, m.Released_Year, m.Overview, input_movies.Released_Year, m.Genres, input_movies.Genres, d.Director, m.IMDB_Rating
HAVING similarity_score > 0
Order by similarity_score DESC, m.IMDB_Rating DESC
LIMIT 10;

-- This query filters movies to only show those that qualify as Action, Drama, or Romance where no movie has been searched for
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Drama','Romance','Action')) as A where movies.Movie_ID = A.Movie_ID and Series_Title like '%%'

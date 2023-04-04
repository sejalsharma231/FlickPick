-- Login queries - 

-- Test Case 1: 
INSERT INTO Users ( firstName, lastName, email, password) VALUES ( 'test', 'user3', 'testUser3@gmail.com', 'pp' );

-- Search 

-- Test Case 1: 
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like '%bobby%';

-- Test Case 2: 

SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like '%rings%';

-- Watchlist 
-- Test Case 2
INSERT into watchlist (userID,Movie_ID) VALUES (24, 1);
SELECT * FROM movies where Movie_ID in (select Movie_ID from Watchlist where userID = 24);

-- Test Case 3
DELETE from watchlist WHERE userID = 1 and Movie_ID = 1;
SELECT * FROM movies where Movie_ID in (select Movie_ID from Watchlist where userID = 24);

-- Test Case 4
INSERT into watchlist (userID,Movie_ID) VALUES (3, 8);
INSERT into watchlist (userID,Movie_ID) VALUES (3, 9);
INSERT into watchlist (userID,Movie_ID) VALUES (3, 10);

SELECT * FROM movies where Movie_ID in (select Movie_ID from Watchlist where userID = 3);


-- Test Case 5
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like'%Matrix%';
INSERT into watchlist (userID,Movie_ID) VALUES (3, 15);

-- Sort 

-- Test Case 1
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies order by Series_Title;
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies order by Released_Year;
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies order by Runtime;

-- Test Case 2
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like '%star%' order by Series_Title;
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like '%star%' order by Released_Year;
SELECT Series_Title, Released_Year, Runtime, Genres, Overview, IMDB_Rating, Movie_ID, Poster_Link FROM movies where Series_Title like '%star%' order by Runtime;


-- Recommender 

-- Test Case 1 
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

-- Filter 
-- Test Case 1 
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Comedy')) as A where movies.Movie_ID = A.Movie_ID ;
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Comedy', 'Action')) as A where movies.Movie_ID = A.Movie_ID ;
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Comedy', 'Action', 'Drama')) as A where movies.Movie_ID = A.Movie_ID ;

-- Test Case 2
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Comedy', 'Drama', 'Romance')) as A where movies.Movie_ID = A.Movie_ID order by Released_Year;

-- Test Case 3
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Drama', 'Romance')) as A where movies.Movie_ID = A.Movie_ID and Series_Title like '%for%' ;

-- Test Case 4 
SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Drama')) as A where movies.Movie_ID = A.Movie_ID and Series_Title like '%for%' order by Released_Year;


SELECT distinct Series_Title, Released_Year, Runtime, movies.Genres, Overview, IMDB_Rating, movies.Movie_ID, Poster_Link FROM movies inner join (SELECT * from genres where Genres in ('Drama', 'Romance')) as A where movies.Movie_ID = A.Movie_ID and Series_Title like '%for%' order by Series_Title ;





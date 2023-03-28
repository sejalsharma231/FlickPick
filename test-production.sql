-- Login queries - 

-- Test Case 2: 
INSERT INTO Users ( firstName, lastName, email, password) VALUES ( 'test', 'user2', 'testUser2@gmail.com', 'p' );

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


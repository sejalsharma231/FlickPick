INSERT INTO Movies ( Poster_Link, Series_Title, Released_Year, Certificate, Runtime, Genre, IMDB_Rating, Overview, Meta_Score, Director, Star1, Star2, Star3, Star4, No_of_Votes, Gross) VALUES
("https://www.imdb.com/title/tt0111161/mediaviewer/rm471071744", "The Shawshank Redemption", 1994, "R", "142 min", "Drama", 9.3, "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", 80, "Frank Darabont", "Tim Robbins", "Morgan Freeman", "Bob Gunton", NULL, 2392870, 28.34),
("https://www.imdb.com/title/tt0068646/mediaviewer/rm1521716480", "The Godfather", 1972, "R", "175 min", "Crime, Drama", 9.2, "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.", 100, "Francis Ford Coppola", "Marlon Brando", "Al Pacino", "James Caan", "Richard S. Castellano", 1664354, 134.97),
("https://www.imdb.com/title/tt0071562/mediaviewer/rm1469567744", "The Godfather: Part II", 1974, "R", "202 min", "Crime, Drama", 9.0, "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.", 90, "Francis Ford Coppola", "Al Pacino", "Robert De Niro", "Robert Duvall", NULL, 1151084, 57.30),
("https://www.imdb.com/title/tt0468569/mediaviewer/rm3223338240", "The Dark Knight", 2008, "PG-13", "152 min", "Action, Crime, Drama", 9.0, "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 84, "Christopher Nolan", "Christian Bale", "Heath Ledger", "Aaron Eckhart", NULL, 2386485, 534.86),
("https://www.imdb.com/title/tt1375666/mediaviewer/rm1084172801", "Inception", 2010, "PG-13", "148 min", "Action, Adventure, Sci-Fi", 8.8, "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", 74, "Christopher Nolan", "Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Ken Watanabe", 2112267, 292.58);

-- adding sample users 
INSERT INTO Users ( firstName, lastName, email, password) VALUES ( 'John', 'Doe', 'johndoe@example.com', 'password123' ), ( 'Test', 'User2', 'testing@example.com', 'passwordCS348' );

-- adding movies to users’ watchlist 
INSERT into Watchlist (userID,mid) VALUES (1, 2), (1,3), (2,1), (2,5);

-- searching for movies containing “Godfather”
SELECT id, Series_Title, Released_Year, Runtime, Genre, Overview, IMDB_Rating, Poster_Link FROM movies where Series_Title like '%Godfather%';

-- sorting movies by year of release 
SELECT id, Series_Title, Released_Year, Runtime, Genre, Overview, IMDB_Rating, id, Poster_Link FROM movies order by Released_Year ;

-- sorting movies by year of release if user has already searched for movies containing “The”
SELECT id, Series_Title, Released_Year, Runtime, Genre, Overview, IMDB_Rating, id, Poster_Link FROM movies where Series_Title like '%The%'  order by Released_Year ;

-- Deleting movies with id = 2 from users (user id = 1) watchlist
DELETE from Watchlist WHERE userID = 1 and mid = 2;

-- This query checks whether the movie with id = 3 already exists in the user’s (userID =1) watchlist
SELECT * FROM Watchlist WHERE userID = 1 and mid = 3;

-- This query finds and returns all the movies that exist in the user’s (userID = 1) watchlist 
SELECT * FROM movies where id in (select mid from Watchlist where userId = 2);


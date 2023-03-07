CREATE TABLE Users (
  userID INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(45) NOT NULL
);

CREATE TABLE Movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Poster_Link VARCHAR(455),
  Series_Title VARCHAR(255),
  Released_Year INT(11),
  Certificate VARCHAR(10),
  Runtime VARCHAR(45),
  Genre VARCHAR(255),
  IMDB_Rating DECIMAL(3,1),
  Overview VARCHAR(1000),
  Meta_Score INT(11),
  Director VARCHAR(45),
  Star1 VARCHAR(45),
  Star2 VARCHAR(45),
  Star3 VARCHAR(45),
  Star4 VARCHAR(45),
  No_of_Votes INT(11),
  Gross DECIMAL(15,2)
);

CREATE TABLE Watchlist (
  userID INT(11),
  mid INT(11),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (mid) REFERENCES Movies(id),
  PRIMARY KEY (userID, mid)
);

CREATE TABLE Likes (
  userID INT,
  mid INT,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (mid) REFERENCES Movies(id),
  PRIMARY KEY (userID, mid)
);


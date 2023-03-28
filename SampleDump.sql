-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sample
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `Movie_ID` int(11) DEFAULT NULL,
  `Star` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Tim Robbins'),(2,'Marlon Brando'),(3,'Christian Bale'),(4,'Al Pacino'),(5,'Henry Fonda'),(6,'Elijah Wood'),(7,'John Travolta'),(8,'Liam Neeson'),(9,'Leonardo DiCaprio'),(10,'Brad Pitt'),(1,'Morgan Freeman'),(2,'Al Pacino'),(3,'Heath Ledger'),(4,'Robert De Niro'),(5,'Lee J. Cobb'),(6,'Viggo Mortensen'),(7,'Uma Thurman'),(8,'Ralph Fiennes'),(9,'Joseph Gordon-Levitt'),(10,'Edward Norton'),(1,'Bob Gunton'),(2,'James Caan'),(3,'Aaron Eckhart'),(4,'Robert Duvall'),(5,'Martin Balsam'),(6,'Ian McKellen'),(7,'Samuel L. Jackson'),(8,'Ben Kingsley'),(9,'Elliot Page'),(10,'Meat Loaf'),(1,'William Sadler'),(2,'Diane Keaton'),(3,'Michael Caine'),(4,'Diane Keaton'),(5,'John Fiedler'),(6,'Orlando Bloom'),(7,'Bruce Willis'),(8,'Caroline Goodall'),(9,'Ken Watanabe'),(10,'Zach Grenier');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directors` (
  `Movie_ID` int(11) DEFAULT NULL,
  `Director` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` VALUES (1,'Frank Darabont'),(2,'Francis Ford Coppola'),(3,'Christopher Nolan'),(4,'Francis Ford Coppola'),(5,'Sidney Lumet'),(6,'Peter Jackson'),(7,'Quentin Tarantino'),(8,'Steven Spielberg'),(9,'Christopher Nolan'),(10,'David Fincher');
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `Movie_ID` int(11) DEFAULT NULL,
  `Genres` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Drama'),(2,' Drama'),(2,'Crime'),(3,' Crime'),(3,' Drama'),(3,'Action'),(4,' Drama'),(4,'Crime'),(5,' Drama'),(5,'Crime'),(6,' Adventure'),(6,' Drama'),(6,'Action'),(7,' Drama'),(7,'Crime'),(8,' Drama'),(8,' History'),(8,'Biography'),(9,' Adventure'),(9,' Sci-Fi'),(9,'Action'),(10,'Drama');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `Poster_Link` text,
  `Movie_ID` int(11) DEFAULT NULL,
  `Series_Title` text,
  `Released_Year` int(11) DEFAULT NULL,
  `Certificate` text,
  `Genres` text,
  `IMDB_Rating` double DEFAULT NULL,
  `Overview` text,
  `Runtime` text,
  `Meta_score` int(11) DEFAULT NULL,
  `No_of_Votes` int(11) DEFAULT NULL,
  `Gross` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES ('https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg',1,'The Shawshank Redemption',1994,'A','Drama',9.3,'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','142 min',80,2343110,28341469),('https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY98_CR1,0,67,98_AL_.jpg',2,'The Godfather',1972,'A','Crime, Drama',9.2,'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.','175 min',100,1620367,134966411),('https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg',3,'The Dark Knight',2008,'UA','Action, Crime, Drama',9,'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.','152 min',84,2303232,534858444),('https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY98_CR1,0,67,98_AL_.jpg',4,'The Godfather: Part II',1974,'A','Crime, Drama',9,'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.','202 min',90,1129952,57300000),('https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX67_CR0,0,67,98_AL_.jpg',5,'12 Angry Men',1957,'U','Crime, Drama',9,'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.','96 min',96,689845,4360000),('https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX67_CR0,0,67,98_AL_.jpg',6,'The Lord of the Rings: The Return of the King',2003,'U','Action, Adventure, Drama',8.9,'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.','201 min',94,1642758,377845905),('https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY98_CR0,0,67,98_AL_.jpg',7,'Pulp Fiction',1994,'A','Crime, Drama',8.9,'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.','154 min',94,1826188,107928762),('https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX67_CR0,0,67,98_AL_.jpg',8,'Schindler\'s List',1993,'A','Biography, Drama, History',8.9,'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.','195 min',94,1213505,96898818),('https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX67_CR0,0,67,98_AL_.jpg',9,'Inception',2010,'UA','Action, Adventure, Sci-Fi',8.8,'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.','148 min',74,2067042,292576195),('https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX67_CR0,0,67,98_AL_.jpg',10,'Fight Club',1999,'A','Drama',8.8,'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.','139 min',66,1854740,37030102);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` text,
  `firstName` text,
  `lastName` text,
  `email` text,
  `password` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1','Jane','Doe','john@test.com','CS348Project'),('2','James','Bond','007@bond.com','hello'),('3','John','Doe','johndoe@example.com','password123'),('4','Test','User2','testing@example.com','passwordCS348'),(NULL,'Abc','Xyz','alphabet@gmail.com','testing');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `userID` int(11) DEFAULT NULL,
  `Movie_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (1,1),(1,2),(1,10),(2,5),(3,6),(5,10),(5,2);
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-26 23:51:15

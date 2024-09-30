DROP DATABASE IF EXISTS `Civitas`;
CREATE DATABASE `Civitas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE civitas;
CREATE TABLE `Course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `courseNumber` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `idx_Course_subject` (`subject`),
  UNIQUE KEY `idx_Course_courseNumber` (`courseNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Course (subject, courseNumber, description)
values("MAT", "001", "Business Statistics");

SELECT * FROM Course;
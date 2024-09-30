USE `Civitas`;

CREATE TABLE `Course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(45) NOT NULL,
  `courseNumber` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `idx_Course_subject` (`subject`),
  UNIQUE KEY `idx_Course_courseNumber` (`courseNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

INSERT INTO Course (description, subject, courseNumber) VALUES
('Science Course', 'SCI', '001');
### Schema

CREATE DATABASE grh_db;
USE grh_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	user_name varchar(100) NOT NULL,
	time_create DATETIME NOT NULL,
	PRIMARY KEY (id)
);
import mysql from 'mysql2'
import config from '../config/mysql.config.js';

export const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS categories (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);`);

connection.query(`CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(100) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock INT NOT NULL,
  categoriesId INT,
  FOREIGN KEY (categoriesId) REFERENCES categories(id)
);`);

connection.query(`CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email NVARCHAR(255) NOT NULL UNIQUE
);`);

connection.query(`CREATE TABLE IF NOT EXISTS reasons (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(50) NOT NULL
);`);

connection.query(`CREATE TABLE IF NOT EXISTS contacts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  comments VARCHAR(255) NOT NULL,
  reasonsId INT,
  FOREIGN KEY (reasonsId) REFERENCES reasons(id)
);`);
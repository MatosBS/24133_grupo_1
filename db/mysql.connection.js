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


/*
INSERT INTO categories (name)values ('Crema'), ('Emulsión'), ('Pote');

INSERT INTO products (name, description, price, stock, categoriesId) values 
('Balsamo Dinamizante Celular', '', 2000, 12, 1),
('Completo Antiage Omega Plus', 'Crema', 1500, 8, 1),
('Crema Nutritiva Con Vitamina AyE', '', 8700, 1, 3),
('Diamond Lips Perfil 12ml', '', 12500, 13, 3),
('Diamond Eyes Estuche Lateral', '', 18300, 29, 3),
('Filler Diamond Antiage', '', 1200, 3, 2),
('Pomo Gel Contorno De Ojos', '', 6900, 11, 2),
('Renova Defense', '', 4600, 100, 2),
('Serum Liposomado', '', 14000, 14, 2),
('Stress Control Detox ENVASO', '', 9000, 10, 2);
*/
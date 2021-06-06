DROP DATABASE IF EXISTS employee_trackerDB;

CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (45) NOT NULL,
    budget DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (45),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR (45) NOT NULL,
   last_name VARCHAR (45) NOT NULL,
   department VARCHAR (45) NOT NULL,
   salary DECIMAL NOT NULL,
   roles_id INT NOT NULL,
   manager_id INT
);

CREATE TABLE manager (
    id INT NOT NULL,
    manager_name VARCHAR(45) NOT NULL
);
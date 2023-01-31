DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

/*This is a SQL script that creates three tables in a database called employees_DB.
The department table has two columns:
id: an integer primary key that auto increments
name: a string of up to 45 characters that stores the name of the department
The role table has four columns
id: an integer primary key that auto increments
title: a string of up to 45 characters that stores the title of the role
salary: a decimal number with up to 10 total digits and 3 digits after the decimal point
department_id: an integer that references the id column of the department table
The employee table has five columns:
id: an integer primary key that auto increments
first_name: a string of up to 45 characters that stores the employee's first name
last_name: a string of up to 45 characters that stores the employee's last name
role_id: an integer that references the id column of the role table
manager_id: an integer that references the id column of the employee table for the manager */
USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary DECIMAL(10.3) NULL,
    deparment_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NULL,
    last_name VARCHAR(45)  NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);





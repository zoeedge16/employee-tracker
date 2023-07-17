DROP DATABASE if EXISTS etracker_db;

CREATE DATABASE etracker_db;

USE etracker_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(100) NOT NULL,
    salary DEC(10, 2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);
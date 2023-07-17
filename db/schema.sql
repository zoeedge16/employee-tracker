DROP DATABASE if EXISTS etracker_db;

CREATE DATABASE etracker_db;

USE etracker_db;

CREATE TABLE department (
    id
    name
);

CREATE TABLE role (
    id
    title
    salary
    department_id
);

CREATE TABLE employee (
    id
    first_name
    last_name
    role_id
    manager_id
);
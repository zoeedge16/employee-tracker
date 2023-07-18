USE etracker_db;

INSERT INTO departments (department_name) VALUES ('Laboratory'), ('Sales');

INSERT INTO roles (role_title, department_id, salary) VALUES ('Sales Representative', 1, 50000.00), ('Scientist', 2, 60000.00);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, 1);
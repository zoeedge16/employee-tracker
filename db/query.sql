USE etracker_db;

SELECT department_id, department_name
FROM departments;

/* theres something wrong with this. It keeps saying I have errors */
SELECT roles.role_id, roles.role_title, roles.salary, roles.department_id
FROM roles
INNER JOIN departments ON roles.department_id = departments.department_id;

SELECT employee_id, first_name, last_name, role_id, manager_id
FROM employees
INNER JOIN roles ON employees.role_id = roles.role_id 
INNER JOIN departments ON roles.department_id = departments.department_id
LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id;

INSERT INTO departments (department_name) VALUES ("New Department: ");

INSERT INTO roles (role_title, salary, department_id) VALUES ("New role:", 1, 70000.00);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("New", "Employee", 1, 2);

UPDATE employees SET role_id = 2 WHERE employee_id = 1;
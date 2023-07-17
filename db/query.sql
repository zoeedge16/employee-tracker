USE etracker_db;

SELECT department_id, department_name
FROM departments;

SELECT roles.role_id, roles.role_title, roles.salary, departments.department_name
FROM roles
INNER JOIN departments ON roles.department_id = departments.department_id;

SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary, CONCAT (managers.first_name, " " , managers.last_name) AS manager_name 
FROM employees
INNER JOIN roles ON employees.role_id = roles.role_id 
INNER JOIN departments ON roles.department_id = departments.department_id
LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id;

INSERT INTO departments (department_name) VALUES ("New Department: ");

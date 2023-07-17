USE etracker_db;

SELECT id, name
FROM departments;

SELECT roles.id, roles.title, roles.salary, departments.name AS department_name
FROM roles
INNER JOIN departments ON roles.department_id = departments.id;

SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role_title, departments.name AS department_name, roles.salary, CONCAT(managers.first_name, '', managers.last_name) AS manager_name
FROM employees
INNER JOIN roles ON employees.role_id = roles.id 
INNER JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS managers ON employees.manager_id = managers.id;
const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'etracker_db'
});

connection.connect((err) => {
    if (err) throw (err);
    console.log('Connected!');
    startApplication();
});

function startApplication() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Please choose an action below.',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all Departments':
                    viewAllDepartments();
                    break;
                case 'View all Roles':
                    viewAllRoles();
                    break;
                case 'View all Employees':
                    viewAllEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;            
                case 'Add a Role':
                    addRole();
                    break;            
                case 'Add an Employee':                    
                    addEmployee();                    
                    break;
                case 'Update an Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        });
}

function viewAllDepartments() {
    const query = 'SELECT department_id, department_name FROM departments';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}

function viewAllRoles() {
    const query = 'roles.role_id, roles.role_title, roles.salary, departments.department_name FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}

function viewAllEmployees() {
    const query = 'SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_title, departments.department_name, roles.salary, CONCAT (managers.first_name, " " , managers.last_name) AS manager_name FROM employees';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'departmentName',
            type: 'input',
            message: 'Enter the name of the department: '
        })
        .then((answer) => {
            const query = 'INSERT INTO departments (department_name) VALUES ("New Department: ");'
            connection.query(query, [answer.departmentName], (err,res) => {
                if (err) throw err;
                console.log('Department added!');
                startApplication();
            });
        });
}
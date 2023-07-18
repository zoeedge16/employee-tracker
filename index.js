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
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;            
                case 'Add a role':
                    addRole();
                    break;            
                case 'Add an employee':                    
                    addEmployee();                    
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        });
};

function viewAllDepartments() {
    const query = 'SELECT department_id, department_name FROM departments';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
};

function viewAllRoles() {
    const query = 'SELECT roles.role_id, roles.role_title, roles.salary, roles.department_id FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
};

function viewAllEmployees() {
    const query = 'SELECT employee_id, first_name, last_name, role_id, manager_id FROM employees';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startApplication();
    });
};

function addDepartment() {
    inquirer
        .prompt({
            name: 'departmentName',
            type: 'input',
            message: 'Enter the name of the department: '
        })
        .then((answer) => {
            const query = 'INSERT INTO departments (department_name) VALUES (?);'
            connection.query(query, [answer.departmentName], (err,res) => {
                if (err) throw err;
                console.log('Department added!');
                startApplication();
            });
        });
};

function addRole() {
    inquirer
        .prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'Enter the title of the role: '
            },
            {
                name: 'roleSalary',
                type: 'number',
                message: 'Enter the salary of the role: '
            },
            {
                name: 'departmentId',
                type: 'number',
                message: 'Enter the department ID for the role: '
            }
        ])
        .then((answer) => {
            const query = 'INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, 
                [answer.roleTitle, answer.roleSalary, answer.departmentId], 
                (err,res) => {
                if (err) throw err;
                console.log('Role added!');
                startApplication();
            });
        });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Enter first name: '
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Enter last name: '
            },
            {
                name: 'roleId',
                type: 'number',
                message: 'Enter the employees role id: '
            },
            {
                name: 'managerId',
                type: 'number',
                message: 'Enter the employees manager id: '
            }
        ])
        .then((answer) => {
            const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, 
                [answer.firstName, answer.lastName, answer.roleId, answer.managerId], 
                (err,res) => {
                if (err) throw err;
                console.log('Employee added!');
                startApplication();
            });
        });
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employeeId',
                type: 'number',
                message: 'Enter the employees ID: '
            },
            {
                name: 'newRoleId',
                type: 'number',
                message: 'Enter the new role ID: '
            }
        ])
        .then((answer) => {
            const query = 'UPDATE employees SET role_id = ? WHERE employee_id = ?;';
            connection.query(query, 
                [answer.newRoleId, answer.employeeId], 
                (err,res) => {
                if (err) throw err;
                console.log('Employee updated!');
                startApplication();
            });
        });
};
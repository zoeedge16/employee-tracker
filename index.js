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
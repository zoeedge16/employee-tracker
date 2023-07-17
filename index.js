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
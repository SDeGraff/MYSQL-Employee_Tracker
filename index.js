const mysql = require('mysql');
const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { allowedNodeEnvironmentFlags } = require('process');
require('console.table');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Password',
    database: 'employees_DB'
});

connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
});

function firstPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'task',
        message: 'What do?',
        Choices: [
            'View Employee',
            'View Employees',
            'Add Employee',
            'Remove Employees',
            'Update Employee Role',
            'Add Role',
        ]
    })
    .then(function ({ task }) {
        switch (task) {
            case 'View Employees':
                viewEmployee();
                break;
            case 'View Employees':
                viewEmployees();
                break:
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employees':
                removeEmployees();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'End':
                connection.end();
                break;
        }
    });
}


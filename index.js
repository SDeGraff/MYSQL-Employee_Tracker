const mysql = require('mysql');
const inquirer = require('inquirer');
const { default: Choices } = require('inquirer/lib/objects/choices');
const { allowedNodeEnvironmentFlags } = require('process');
require('console.table');



/* defines a connection to a MySQL database with the following properties: Host: 'localhost' (the database is located on the same machine as the code) Port: 3001 (the database is listening on port 3001) User: 'root' (the user connecting to the database is the root user) Password: 'Password' (the password for the root user is 'Password')
Database: 'employees_DB' (the database being connected to is named 'employees_DB')*/

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Password',
    database: 'employees_DB'
});


/* The code connects to the MySQL database using the connection.connect method, with a callback function that:
Throws an error if one occurs during the connection process
Calls another function firstPrompt if the connection is successful.*/

connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
});


/* The code defines a function named "firstPrompt" that presents a list of options to the user as a prompt using the inquirer library. The options are: "View Employee", "View Employees", "Add Employee", "Remove Employees", "Update Employee Role", and "Add Role". The selected option triggers a specific function call (e.g. "viewEmployee" if "View Employee" is selected) based on a switch statement. The switch statement ends the connection if the "End" option is selected.*/

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



// functions view EMployee outputs 'viewing the employees', creates query to get data from employee role department employee tables with certain info. with a callback that throws an error if there is an error. 
function viewEmployee() {
    console.log('Viewing The Employees');

    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager
    FROM emoloyee e
    LEFT JOIN role r
        ON e.role_id r.id
    LEFT JOIN department d
        ON d.id = r.department_id
    LEFT JOIN employee m
        ON m.id = e.manager_id`

   connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log('Employees Viewed');

    firstPrompt();
   }); 
}


/*a function viewEmployeeByDepartment which:
Prints "Employees By Department" to the console
Defines a SQL query to select department ID, name, role salary and budget from the employee, role, and department tables */

function viewEmployeeByDepartment() {
    console.log('Employees By Department');

    var query = 
        `SELECT d.id, d.name, r.salary, AS budget FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON d.id = re.department_id
        GROUP BY d.id, d.name`


 /* Runs the query using the connection.query function with a callback that:Throws an error if one occurs during the query execution Maps the query result to an array of department choices with value being the department ID and name being the department name Prints the query result to the console using the console.table method Calls another function promptDepartment with the department choices as argument. */

    connection.query(query, function (err,res) {
        if (err) throw err;

    const departmentChoices = res.map(data => ({
        value: data.id, 
        name: data.name
    }));

    console.table(res);
    console.log('Viewing By Department');

    promptDepartment(departmentChoices);
    });
}

/* The code defines a function promptDepartment which takes in an argument departmentChoices. The function:
Uses the inquirer library to prompt the user to choose a department from a list of departmentChoices Then, with the .then method, it runs a callback function that: Defines a SQL query to select employee ID, first name, last name, role title, and department name from the employee, role, and department tables where the department ID matches the selected department. Runs the query using the connection.query method with the selected department ID and a callback function that: Throws an error if one occurs during the query execution Prints the query result to the console using the console.table method Prints the number of employees viewed and logs a message to the console Calls the firstPrompt function. */

function promptDepartment(departmentChoices) {
    inquirer.prompt([{
        type: 'list',
        name: 'departmentId',
        message: 'Which Department Do You Want?'
        choices: departmentChoices
    }])

        .then(function (answer) {
            console.log('answer', answer.departmentId);

        var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e JOIN role r ON e.role_id = r.id
        JOIN department d ON d.id = r.department_id
        WHERE d.id = ?`

        connection.query(query, answer.departmentID, function (err,res) {
            if (err) throw err;

            console.table('resonse', res);
            console.log(res.affectedRows + 'Employees viewed!');

        firstPrompt();
        });
        });
}

/*a function addEmployee which:
Logs a message 'Employee Added!' to the console Defines a SQL query to select the ID, title, and salary of all roles in the role table Runs the query using the connection.query method with a callback function that: Throws an error if one occurs during the query execution Maps the query result to a list of role choices in the format of {value: id, title: title, salary: salary} Prints the query result to the console using the console.table method Logs a message 'RoleToInsert' to the console Calls another function promptInsert with the list of role choices.  */

function addEmployee() {
    console.log('Employee Added!');

    var query =
    `SELECT r.id, r.title, r.salary FROM role r`

    connection.query(query, function (err, res) {
        if (err) throw err;

    const roleChoices = res.map(({ id, title, salary}) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`
        }));

        console.table(res);
        console.log('RoleToInsert');

        promptInsert(roleChoices);
    });
}

/*a function promptInsert which:
Prompts the user to enter the first and last name of the employee and to select the role of the employee from a list of role choices Once the user has made a selection:
Logs the answers to the console Defines a SQL query to insert a new employee record into the employee table
Runs the query using the connection.query method with a callback function that: Throws an error if one occurs during the query execution Prints the query result to the console using the console.table method Logs a message with the number of inserted rows and the message 'Success!' to the console Calls another function firstPrompt to start the process again. */ 

function promptInsert(roleChoices) {
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: 'Employees First Name?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Employees Last Name?'
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'Employees Role?',
        choices: roleChoices
    },
])
    .then(function (answer) {
        console.log(answer);    

        var query = `INSERT INTO employee SET ?`

        connection.query( query,
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            },
            
            function (err, res) {
                if (err) throw err;

                console.table(res);
                console.log(res.insertedRows + 'Success!');

            firstPrompt();
            });
    });
}

/*function that retrieves employee information from a database, formats the data for display in a prompt, and calls another function "promptDelete" with the formatted data. The function logs a string 'Deleting Employee' and selects data for the id, first name, and last name of employees from the employee table. The retrieved data is then formatted into an array of objects, where each object has a "value" property equal to the employee's id and a "name" property equal to a string of the employee's id, first name, and last name. The res data and the deleteEmployeeChoices array are logged to the console. */

function removeEmployees() {
    console.log('Deleting Employee');

        var query = `SELECT e.id, e.first_name, e.last_name FROM employee e`

    connection.query(query, function (err,res) {
        if (err) throw err;

    const deleteEmployeeChoices = res.map(({id, first_name, last_name}) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`
    }));

    console.table(res);
    console.log('ArrayToDelete');

    promptDelete(deleteEmployeeChoices);
    });
}

/* inquirer npm package to create a prompt for the user to choose an employee to remove from the 'employee' database table. The selected employee's ID is then used in a DELETE SQL query to remove the employee from the database. The result of the query is logged in the console along with the number of affected rows, and the function firstPrompt() is called to return to the first prompt.*/

function promptDelete(deleteEmployeeChoices) {
    inquirer.prompt ([
        {
            type:'list',
            name: 'employeeId',
            message: 'Which Employee To Remove?'
            choices: deleteEmployeeChoices
        }
        ])

        .then(function(answer) {
            var query = `DELETE FROM employee WHERE ?`;

            connection.query(query, {id: answer.employeeId},
                function (err, res) {

                    console.table(res);
                    console.log(res.affectedRows + 'Deleted!');

                    firstPrompt();
                });
        });
}

/*The code is defining two functions, updateEmployeeRole() and employeeArray().

The updateEmployeeRole() function calls the employeeArray() function.

The employeeArray() function retrieves a list of employees from a SQL database by executing a SELECT query that joins multiple tables. The result of the query is logged in the console using console.table(res).

The SELECT query retrieves information about employees, including their ID, first name, last name, role title, department, salary, and manager. The retrieved information is then used to create an array of objects, called employeeChoices, where each object contains the ID and name of an employee.

Finally, the roleArray() function is called and passed the employeeChoices array as an argument. */

function updateEmployeeRole() {
    employeeArray();
}

function employeeArray() {
    console.log('Updating Employee');

    var query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e 
    JOIN role r ON e.role+id = r.id
    JOIN department d ON d.id = r.departmen_id
    JOIN employee m ON m.id = e.manager_id`

    connection.query(query, function (err, res) {
        if (err) throw err;

        const employeeChoices = res.map (({id, first_name, Last_name}) => ({
            value:id, 
            name:`${first_name} ${last_name}`
        }));
        console.table(res);
        console.log('Update EmployeeArray');

        roleArray(employeeChoices);
    });
}

/* */

function roleArray(employeeChoices) {
    console.log('Updating Role');

    var query = `SELECT r.id, r.title, r.salary FROM role r`
    let roleChoices;

    connection.query(query, functnion (err, res) {
        if (err) throw err;

        roleChoices = res.map (({ id, title, salary}) => ({
            value: id,
            title:`${title}`,
            salary: `${salary}`
        }));

        console.table(res);
        console.log('Update roleArray');

        promptEmployeeRole(employeeChoices, roleChoices);
    });
}
/* */

function promptEmployeeRole(employeeChoices, roleChoices) {
    inquirer.promp([
        {
            type:'list',
            name: 'employeeId',
            message: 'Which employee for this role?',
            choices: deleteEmployeeChoices
        },
        {
            type:'list',
            name: 'roleId',
            message: 'Which Role To Update?',
            choices: roleChoices
        },
    ])
    .then(function (answer) {
        var query = `UPDATE employee SET role_id = ? WHERE id = ?`

        connection.query(query, [
            answer.roleId,
            answer.employeeId
        ],
        functnion (err, res) {
            if (err) throw err;

            console.table(res);
            console.log(res.affectedRows + 'Update Sucessful');

            firstPrompt();
        });
    });
}


/* */


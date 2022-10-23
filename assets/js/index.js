const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'newuser',
        password: '12345!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

const questions = [
    {
        type: 'list',
        message: 'Choose an option from the list:',
        name: 'option',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
        ],
    }
];

function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
            switch (data.option) {
                case 'View all departments':
                    db.query(
                        'SELECT * FROM `department`',
                        function (err, results) {
                            if (err) {
                                console.log("Error retrieving department table.");
                            }
                            else {
                                const table = cTable.getTable('Departments', results);
                                console.log(table);
                            }    
                        }
                    );
                    break;
                case 'View all roles':
                    db.query(
                        'SELECT * FROM `role`',
                        function (err, results) {
                            if (err) {
                                console.log("Error retrieving employee role table.");
                            }
                            else {
                                const table = cTable.getTable('Roles', results);
                                console.log(table);
                            }
                        }
                    );
                    break;
                case 'View all employees':
                    db.query(
                        'SELECT * FROM `employee`',
                        function (err, results) {
                            if (err) {
                                console.log("Error retrieving employee table.");
                            }
                            else {
                                const table = cTable.getTable('Employees', results);
                                console.log(table);
                            }
                        }
                    );
                    break;
                case 'Add a department':
                    console.log('Add dept');
                    break;
                case 'Add a role':
                    console.log('Add role');
                    break;
                case 'Add an employee':
                    console.log('Add employee');
                    break;
                case 'Update an employee role':
                    console.log('Update role');
                    break;
                default:
                    console.log('default');
            };
        })
}

init();
// const questions = [{
//     type: 'input',
//     name: 'title',
//     message: 'What is the title of your project?',
// },
// {
//     type: 'input',
//     message: 'Enter a description of the project:',
//     name: 'description',
// },
// {
//     type: 'input',
//     message: 'Enter installation instructions:',
//     name: 'installation',
// },
// {
//     type: 'input',
//     message: 'Enter usage information:',
//     name: 'usage',
// },
// {
//     type: 'input',
//     message: 'Enter contribution guidelines:',
//     name: 'contribution',
// },
// {
//     type: 'input',
//     message: 'Enter test instructions:',
//     name: 'test',
// },
// {
//     type: 'input',
//     message: 'Enter your GitHub username:',
//     name: 'username',
// },
// {
//     type: 'input',
//     message: 'Enter your email address:',
//     name: 'email',
// },
// ];

// // Query database using COUNT() and GROUP BY
// db.query('SELECT COUNT(id) AS total_count FROM favorite_books GROUP BY in_stock', function (err, results) {
//     console.log(results);
// });

// // Query database using SUM(), MAX(), MIN() AVG() and GROUP BY
// db.query('SELECT SUM(quantity) AS total_in_section, MAX(quantity) AS max_quantity, MIN(quantity) AS min_quantity, AVG(quantity) AS avg_quantity FROM favorite_books GROUP BY section', function (err, results) {
//     console.log(results);
// });

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

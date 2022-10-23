const mysql = require('mysql2');
const cTable = require('console.table');
const db = require("./db");
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");

// Here is a function which handles the first prompt option:  View all employees
function viewEmployees() {

    // Here we call the method in the db file for finding all employees.
    // we get the result back, and then display the result 
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

function viewRoles() {

    // Here we call the method in the db file for finding all employees.
    // we get the result back, and then display the result 
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
    
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
}

function viewEmployees() {

    // Here we call the method in the db file for finding all employees.
    // we get the result back, and then display the result 
    db.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

// Here we load the initial prompts with a series of options. The first option is provided for you.
function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add A Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add A Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add An Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update An Employee Role",
                    value: "UPDATE_ROLE"
                },
            ]
        }
    ]).then(res => {
        let choice = res.choice;
        // Call the appropriate function depending on what the user chose

        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case 'VIEW_ROLES':
                
                break;
            case 'View all employees':
                let roleResults =
                    db.query(
                        'SELECT * FROM `role`',
                        function (err, results) {
                            if (err) {
                                console.log("Error retrieving employee role table.");
                            }
                            else {
                                return results;
                            }
                        }
                    );

                db.query(
                    'SELECT * FROM `employee`',
                    function (err, results) {
                        if (err) {
                            console.log("Error retrieving employee table.");
                        }
                        else {
                            let newResults = [];
                            let tempEmployee = {
                                ID: 0,
                                First_Name: '',
                                Last_Name: '',
                                Role: '',
                                Manager: ''
                            };
                            let role;
                            let manager;
                            for (let i = 0; i < results.length; i++) {
                                tempEmployee.ID = results[i].id;
                                tempEmployee.First_Name = results[i].first_name;
                                tempEmployee.Last_Name = results[i].last_name;
                                tempEmployee.Role = roleResults[results[i].role_id]
                                if (results[i].manager_id) {
                                    tempEmployee. = results[results[i].manager_id].fist_name + 
                                    }
                            }
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

            // add the other case statements here
        }
    }
    )
}

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
                
        })
}

function init() {

    loadMainPrompts()
}


init();
// const questions = [{
//     type: 'input',
//     name: 'title',
//     message: 'What is the title of your project?',
// },

// /* ======= Controllers ============================================================ */

// /* ======= END Controllers ============================================================ */

/* 
You will write lots of other functions here for the other prompt options.
Note that some prompts will require you to provide more prompts, and these 
may need functions of their own.
 */
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require("./connection");
const db  = require("./db");
const { prompt } = require("inquirer");
//const logo = require("asciiart-logo");

let employeesDb = new db(connection);

// Here is a function which handles the first prompt option:  View all employees
function viewEmployees() {
    // Here we call the method in the db file for finding all employees.
    // we get the result back, and then display the result 
    employeesDb.findAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

function viewRoles() {
    // Here we call the method in the db file for finding all roles.
    // we get the result back, and then display the result 
    employeesDb.findAllRoles()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => loadMainPrompts());
}

function viewDepartments() {
    // Here we call the method in the db file for finding all employees.
    // we get the result back, and then display the result 
    employeesDb.findAllDepartments()
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
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
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
                updateRole();
                break;
            default:
                console.log('default');
        };
    })
}

// function init() {
//     inquirer
//         .prompt(questions)
//         .then((data) => {
//             switch (data.option) {
//                 case 'View all departments':
//                     db.query(
//                         'SELECT * FROM `department`',
//                         function (err, results) {
//                             if (err) {
//                                 console.log("Error retrieving department table.");
//                             }
//                             else {
//                                 const table = cTable.getTable('Departments', results);
//                                 console.log(table);
//                             }    
//                         }
//                     );
//                     break;
//         })
// }

function init() {
    loadMainPrompts()
}

init();
// const questions = [{
//     type: 'input',
//     name: 'title',
//     message: 'What is the title of your project?',
// },

/* 
You will write lots of other functions here for the other prompt options.
Note that some prompts will require you to provide more prompts, and these 
may need functions of their own.
 */
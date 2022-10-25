const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require("./connection");
const db  = require("./db");
const { prompt } = require("inquirer");

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

// Here is a function which handles the second prompt option: View all roles
function viewRoles() {
    // Here we call the method in the db file for finding all roles.
    // we get the result back, and then display the result 
    employeesDb.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => loadMainPrompts());
}

// Here is a function which handles the third prompt option: View all departments
function viewDepartments() {
    // Here we call the method in the db file for finding all departments.
    // we get the result back, and then display the result 
    employeesDb.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => loadMainPrompts());
}

// Here is a function which handles the forth prompt option: Add a department
function addDepart() {
    // Here we ask the user what the new department name will be
    prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?:'
        }
    ])
        .then(res => {
            // Here we call the method in the db file for adding a department to the department table
            employeesDb.addDepartment(res).then(() => loadMainPrompts());
    })
}

// Here is a function which handles the fifth prompt option: Add a role
function addRole() {
    // Here we call the method in the db file for finding all departments
    employeesDb.findAllDepartments()
        .then(([rows]) => {
            let pickDept = [];
            // A for loop to save a list of departments to array pickDept
            for (let i = 0; i < rows.length; i++) {
                pickDept.push(rows[i].Department);
            }
            return pickDept;
        })
        .then(pickDept => {
            prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of the new role?:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the new role?:'
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is the new role under?:',
                    choices: pickDept
                }
            ]).then(res => {
                // for loop that gets the correct department id from the department list
                for (let i = 0; i < pickDept.length; i++) {
                    if (pickDept[i] == res.department) {
                        res.department = i + 1;
                    }
                }
                // Here we call the method in the db file for adding a role
                employeesDb.addNewRole(res).then(() => loadMainPrompts());
            })
        })
}

// Here is a function which handles the sixth prompt option: Add an employee
function addWorker() {
    let pickRole = []; 
    let pickMan = [];
    let managerList = [];
    // Here we call the method in the db file for finding all roles
    employeesDb.findAllRoles()
        .then(([roleRows]) => {
            // A for loop to add roles to array pickRole
            for (let i = 0; i < roleRows.length; i++) {
                pickRole.push(roleRows[i].Title);
            }
            return pickRole;
        })
        .then(() => {
            // Here we call the method in the db file for finding all managers
            employeesDb.findAllManagers()
                .then(([manRows]) => {
                    managerList = manRows;
                    // A for loop to add managers to array pickMan
                    for (let i = 0; i < manRows.length; i++) {
                        pickMan.push(manRows[i].manager);
                    }
                    return pickMan;
                })
                .then(() => {
                    prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the first name of the new employee?:'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the last name of the new employee?:'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the role of the new employee?:',
                            choices: pickRole
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the manager of the new employee?:',
                            choices: pickMan
                        }
                    ])
                        .then(res => {
                            // for loop that gets the correct manager id from the manager list
                            for (let i = 0; i < pickMan.length; i++) {
                                if (managerList[i].manager == res.manager) {  
                                    res.manager = managerList[i].id;
                                }
                            }
                            // for loop that gets the correct role id from the role list
                            for (let i = 0; i < pickRole.length; i++) {
                                if (pickRole[i] == res.role) {
                                    res.role = i + 1;
                                }
                            }
                            // Here we call the method in the db file for adding an employee
                            employeesDb.addEmployee(res).then(() => {
                                loadMainPrompts();
                            })
                        })
        
                })
        })
}

// Here is a function which handles the seventh prompt option: Update an employee role
function updateEmployeeRole() {
    let pickRole = [];
    let pickEmployee = [];
    // Here we call the method in the db file for finding all roles
    employeesDb.findAllRoles()
        .then(([roleRows]) => {
            // A for loop to add roles to array pickRole
            for (let i = 0; i < roleRows.length; i++) {
                pickRole.push(roleRows[i].Title);
            }
            return pickRole;
        })
        .then(() => {
            // Here we call the method in the db file for finding all employees
            employeesDb.returnEmployeeList()
                .then(([employRows]) => {
                    // A for loop to add employees to array pickEmployee
                    for (let i = 0; i < employRows.length; i++) {
                        pickEmployee.push(employRows[i].employee);
                    }
                    return pickEmployee;
                })
                .then(() => {
                    prompt([
                        {
                            type: 'list',
                            name: 'id',
                            message: 'Pick employee to update:',
                            choices: pickEmployee
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the role of the new employee?:',
                            choices: pickRole
                        }
                    ])
                        .then(res => {
                            // for loop that gets the correct role id from the role list
                            for (let i = 0; i < pickRole.length; i++) {
                                if (pickRole[i] == res.role) {
                                    res.role = i + 1;
                                }
                            }
                            // for loop that gets the correct employee id from the employee list
                            for (let i = 0; i < pickEmployee.length; i++) {
                                if (pickEmployee[i] == res.id) {
                                    res.id = i + 1;
                                }
                            }
                            // Here we call the method in the db file for updating an employee role
                            employeesDb.updateRole(res).then(() => {
                                loadMainPrompts();
                            });
                        })
        
                })
                        
                })
}

// Here we load the initial prompts with a series of options.
function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
        choices:[
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
            case 'ADD_DEPARTMENT':
                addDepart();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addWorker();
                break;
            case 'UPDATE_ROLE':
                updateEmployeeRole();
                break;
            default:
                console.log('default');
        };
    })
}

function init() {
    loadMainPrompts();
}

init();

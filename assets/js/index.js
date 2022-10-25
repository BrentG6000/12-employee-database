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

function addDepart() {
    prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?:'
        }
    ])
        .then(res => {
            employeesDb.addDepartment(res).then(() => loadMainPrompts());
    })
}

function addRole() {
    employeesDb.findAllDepartments()
        .then(([rows]) => {
            let pickDept = [];
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
                for (let i = 0; i < pickDept.length; i++) {
                    if (pickDept[i] == res.department) {
                        res.department = i + 1;
                    }
                }
                employeesDb.addNewRole(res).then(() => loadMainPrompts());
            })
        })
}

function addWorker() {
    let pickRole = []; 
    let pickMan = [];
    let managerList = [];
    employeesDb.findAllRoles()
        .then(([roleRows]) => {
            for (let i = 0; i < roleRows.length; i++) {
                pickRole.push(roleRows[i].Title);
            }
            return pickRole;
        })
        .then(() => {
            employeesDb.findAllManagers()
                .then(([manRows]) => {
                    managerList = manRows;
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
                            for (let i = 0; i < pickMan.length; i++) {
                                if (managerList[i].manager == res.manager) {  
                                    res.manager = managerList[i].id;
                                }
                            }
                            for (let i = 0; i < pickRole.length; i++) {
                                if (pickRole[i] == res.role) {
                                    res.role = i + 1;
                                }
                            }
                            employeesDb.addEmployee(res).then(() => {
                                loadMainPrompts();
                            })
        })
        
                })
            })
}

function updateEmployeeRole() {
    let pickRole = [];
    let pickEmployee = [];
    employeesDb.findAllRoles()
        .then(([roleRows]) => {
            for (let i = 0; i < roleRows.length; i++) {
                pickRole.push(roleRows[i].Title);
            }
            return pickRole;
        })
        .then(() => {
            employeesDb.returnEmployeeList()
                .then(([employRows]) => {
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
                            for (let i = 0; i < pickRole.length; i++) {
                                if (pickRole[i] == res.role) {
                                    res.role = i + 1;
                                }
                            }
                            for (let i = 0; i < pickEmployee.length; i++) {
                                if (pickEmployee[i] == res.id) {
                                    res.id = i + 1;
                                }
                            }
                            employeesDb.updateRole(res).then(() => {
                                loadMainPrompts();
                            });
                        })
        
                })
                        
                })
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
    loadMainPrompts()
}

init();

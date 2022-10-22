const inquirer = require('inquirer');

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
//     type: 'list',
//     message: 'Choose an option from the list:',
//     name: 'option',
//     choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//     ],
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
class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;   // here we reach out to the db so we can do a query
    }

    // Find all employees
    // THIS IS NOT THE FINAL QUERY. YOU WILL NEED TO MODIFY THIS QUERY SO THAT YOU JOIN 
    // THE EMPLOYEES WITH THEIR ROLES, SALARIES, DEPARTMENTS, AND MANAGERS
    // HINT: A TABLE CAN BE JOINED ON ITSELF WITH PROPER TABLE ALIASING

    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employ.id AS "ID", employ.first_name AS "First Name", employ.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
FROM employee employ
JOIN role ON employ.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT OUTER JOIN employee manager ON employ.manager_id = manager.id;`
        );
    }

    // Add more class methods below for all the database operations needed.
    // Sometimes you may need to pass an id value into a method so it knows 
    //   how to find the correct record.
    
    findAllDepartments() {
        return this.connection.promise().query(
            "SELECT * FROM department;"
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT * FROM role;"
        );
    }
}

module.exports = DB
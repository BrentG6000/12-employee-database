class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;   // here we reach out to the db so we can do a query
    }

    // Find all employees with managers from database
    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employ.id AS "ID", employ.first_name AS "First Name", employ.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
             FROM employee employ
             JOIN role ON employ.role_id = role.id
             JOIN department ON role.department_id = department.id
             LEFT OUTER JOIN employee manager ON employ.manager_id = manager.id;`
        );
    }

    // Find all employees without managers from database
    returnEmployeeList() {
        return this.connection.promise().query(
            `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee
             FROM employee`
        );
    }

    // Find all departments from database
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT department.id AS "ID", department.name AS "Department"
             FROM employees.department;`
        );
    }

    // Find all roles from database
    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.title AS "Title", role.id AS "ID", department.name AS "Department", role.salary AS "Salary" 
             FROM employees.role
             JOIN department ON role.department_id = department.id`
        );
    }
    
    // Add a department to database
    addDepartment(name) {
        return this.connection.promise().query(
            `INSERT INTO department (name)
             VALUES ('${name.department}')`
        );
    }

    // Add a role to database
    addNewRole(role) {
        return this.connection.promise().query(
            `INSERT INTO role (title, salary, department_id)
             VALUES ('${ role.name }', '${role.salary}', '${role.department}')`
        );
    }

    // Add an employee to database
    addEmployee(employee) {
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
             VALUES ('${ employee.firstName }', '${ employee.lastName }', '${ employee.role }', '${ employee.manager }')`  
        );
    }

    // Find all managers from database
    findAllManagers() {
        return this.connection.promise().query(
            `SELECT DISTINCT manager.id, CONCAT(manager.first_name, ' ', manager.last_name) AS "manager"
             FROM employee employ
             JOIN role ON employ.role_id = role.id
             JOIN department ON role.department_id = department.id
             JOIN employee manager ON employ.manager_id = manager.id;`
        );
    }

    // Update an employee role in database
    updateRole(employee) {
        return this.connection.promise().query(
            `UPDATE employees.employee
             SET role_id = ${employee.role}
             WHERE employee.id = ${employee.id};`
        )
    }
}

module.exports = DB
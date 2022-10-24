class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;   // here we reach out to the db so we can do a query
    }

    // Find all employees
    findAllEmployees() {
        return this.connection.promise().query(
            `SELECT employ.id AS "ID", employ.first_name AS "First Name", employ.last_name AS "Last Name", role.title AS "Job Title", department.name AS "Department", role.salary AS "Salary", CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
             FROM employee employ
             JOIN role ON employ.role_id = role.id
             JOIN department ON role.department_id = department.id
             LEFT OUTER JOIN employee manager ON employ.manager_id = manager.id;`
        );
    }

    // Sometimes you may need to pass an id value into a method so it knows 
    //   how to find the correct record.
    
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT department.id AS "ID", department.name AS "Department"
             FROM employees.department;`
        );
    }

    findAllRoles() {
        return this.connection.promise().query(
            `SELECT role.title AS "Title", role.id AS "ID", department.name AS "Department", role.salary AS "Salary" 
             FROM employees.role
             JOIN department ON role.department_id = department.id`
        );
    }
    
    addDepartment(name) {
        return this.connection.promise().query(
            `INSERT INTO department (name)
             VALUES ('${name.department}')`
        );
    }

    addNewRole(role) {
        return this.connection.promise().query(
            `INSERT INTO role (title, salary, department_id)
             VALUES ('${ role.name }', '${role.salary}', '${role.department}')`
        );
    }

    addEmployee(employee) {
        console.log(employee.firstName);
        console.log(employee.lastName);
        console.log(employee.role);
        console.log(employee.manager);
        return this.connection.promise().query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
             VALUES ('${ employee.firstName }', '${ employee.lastName }', '${ employee.role }', ${ employee.manager })`  
        );
    }

    findAllManagers() {
        return this.connection.promise().query(
            `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
             FROM employee employ
             JOIN role ON employ.role_id = role.id
             JOIN department ON role.department_id = department.id
             JOIN employee manager ON employ.manager_id = manager.id;`
        );
        // let managers = [];
        // let double = false;
        // for (let i = 0; i < results.length; i++) {
        //     for (let j = i + 1; j < results.lenght; j++) {
        //         if (results[i].manager == results[j].manager) {
        //             double = true;
        //         }
        //     }
        //     if (!double) {
        //         managers.push(results[i].manager);
        //     }
        //     else {
        //         double = false;
        //     }
        // }
        // return managers;
        //console.log(managers);
        //return results
    }
}

module.exports = DB
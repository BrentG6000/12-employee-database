const mysql = require("mysql2");

// Setup for database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: '12345!',
    database: 'employees'
});

// Connect to database
connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
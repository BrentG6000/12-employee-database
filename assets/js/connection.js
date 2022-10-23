const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: '12345!',
    database: 'employees'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
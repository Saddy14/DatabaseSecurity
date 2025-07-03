const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'database-1.cicgxeovtqsl.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'admin123*',
    database: 'Assignment',
    multipleStatements: true
});


module.exports = connection;

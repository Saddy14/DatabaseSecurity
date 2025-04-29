require('dotenv').config() //? For .env file

const sql = require('mssql')

const config = {

    server: process.env.server, //? Server name == IP address of your DB | By Default Port is set to = 1433  
    database: process.env.database, // ? Database name == Assignment
    user: process.env.user, //? User name 
    password: process.env.password, //? Password
    options: {
        trustedConnection: true, 
        enableArithabort: true, 
        trustServerCertificate: true // for local dev / self-signed certs

    },
}; 

module.exports = {
    connect: () => sql.connect(config),
    sql,
};

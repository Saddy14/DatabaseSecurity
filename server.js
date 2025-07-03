const express = require('express')
const app = express()
const port = 80
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
// const { connect, sql } = require('./db.js') //? For MSSQL connection

const connection = require('./database.js'); //  MySQL connection file

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err.stack);
        return;
    }
    console.log('MySQL connection successful as id ' + connection.threadId);
});

app.use(bodyParser.json()) //? For JSON data
app.use(bodyParser.urlencoded({ extended: true })) //? For URL encoded data
app.use(cors()) //? For CORS

// Serve static files
app.use(express.static(path.join(__dirname, 'Public')));


// Load certificate and key
const options = {
    key: fs.readFileSync(path.join(__dirname, '/certs/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/certs/server.cert'))
};

// connect() //? Connect to the database

//     .then(() => {
//         console.log("Connected to the database")
//     })
//     .catch((err) => {
//         console.log("Error connecting to the database: " + err)
//     })

//! MSSQL Delete User
// app.delete('/deleteUser/:id', (req, res) => {

//     const userId = req.params.id;
//     console.log("Delete User Info:");
//     console.log(req.body);

//     sql.query(`DELETE FROM Application.Users WHERE id = ${userId}`)
//         .then(result => {
//             if (result.rowsAffected[0] > 0) {
//                 console.log("User deleted Id: " + userId);
//                 res.status(200).send("User deleted Id: " + userId);
//             } else {
//                 console.log("User not found: " + userId);
//                 res.status(404).send("User not found: " + userId);
//             }
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//             res.status(500).send("Error: " + err);
//         });
// });

//! MySQL Delete User
app.delete('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    console.log("Delete User ID:", userId);

    const query = 'DELETE FROM Users WHERE id = ?';

    connection.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).send("Error: " + err);
        }

        if (result.affectedRows > 0) {
            console.log("User deleted Id:", userId);
            res.status(200).send("User deleted Id: " + userId);
        } else {
            console.log("User not found:", userId);
            res.status(404).send("User not found: " + userId);
        }
    });
});


app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

app.get('/login-admin', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'login-admin.html'));
});

app.get('/hello', (req, res) => {
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS Assignment`;
    const useDbQuery = `USE Assignment`;

    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            gender VARCHAR(10),
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            MyKad VARCHAR(14) NOT NULL,
            password VARCHAR(100) NOT NULL,
            Type VARCHAR(20) NOT NULL DEFAULT 'Tenant',
            CHECK (gender IN ('Male', 'Female'))
        )
    `;

    const insertUser = `
        INSERT INTO Users (name, gender, email, phone, MyKad, password, Type) 
        VALUES ('Ali Bin Ahmad', 'Male', 'ali@example.com', '012-3456789', '900101-14-1234', 'passAli123', 'Tenant')
        ON DUPLICATE KEY UPDATE email = email
    `;

    const createStaffTable = `
        CREATE TABLE IF NOT EXISTS Staff (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            gender VARCHAR(10),
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            MyKad VARCHAR(14) NOT NULL,
            password VARCHAR(100) NOT NULL,
            Type VARCHAR(20) NOT NULL DEFAULT 'Admin',
            CHECK (gender IN ('Male', 'Female'))
        )
    `;

    const insertStaff = `
        INSERT INTO Staff (name, gender, email, phone, MyKad, password, Type) VALUES
        ('Ali Bin Ahmad', 'Male', 'ali@homewow.com', '012-3456789', '900101-14-1234', 'admin', 'Admin'),
        ('Siti Nurhaliza', 'Female', 'siti@example.com', '013-7654321', '880212-10-5678', 'sitiPass88', 'Admin')
        ON DUPLICATE KEY UPDATE email = email
    `;

    connection.query(createDbQuery, (err) => {
        if (err) return res.status(500).send("Error creating DB: " + err);

        connection.query(useDbQuery, (err) => {
            if (err) return res.status(500).send("Error using DB: " + err);

            connection.query(createUsersTable, (err) => {
                if (err) return res.status(500).send("Error creating Users table: " + err);

                connection.query(insertUser, (err) => {
                    if (err) return res.status(500).send("Error inserting into Users: " + err);

                    connection.query(createStaffTable, (err) => {
                        if (err) return res.status(500).send("Error creating Staff table: " + err);

                        connection.query(insertStaff, (err) => {
                            if (err) return res.status(500).send("Error inserting into Staff: " + err);

                            res.send("Database Works!");
                        });
                    });
                });
            });
        });
    });
});
//! MSSQL Login
// app.post('/login', (req, res) => {

//     console.log("Login Form Info:");
//     console.log(req.body);

//     sql.query(`SELECT * FROM Users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`)
//         .then(result => {
//             if (result.recordset.length > 0 && result.recordset[0].Type === 'Tenant') {
//                 console.log("User found: " + result.recordset[0].email);
//                 res.sendFile(path.join(__dirname, 'Public', 'tenant-dashboard.html'));
//             } else if (result.recordset.length > 0 && result.recordset[0].Type === 'Owner/Agent') {
//                 console.log("User found: " + result.recordset[0].email);
//                 res.sendFile(path.join(__dirname, 'Public', 'owner-agent-my-property.html'));
//             } else {
//                 console.log("User not found");
//                 res.redirect('/login');
//             }
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//             res.status(500).send("Error: " + err);
//         });

// });

//! MySQL Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Login Form Info:");
    console.log(req.body);

    const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            const user = results[0];
            console.log("User found: " + user.email);

            if (user.Type === 'Tenant') {
                res.sendFile(path.join(__dirname, 'Public', 'tenant-dashboard.html'));
            } else if (user.Type === 'Owner/Agent') {
                res.sendFile(path.join(__dirname, 'Public', 'owner-agent-my-property.html'));
            } else {
                res.redirect('/login');
            }
        } else {
            console.log("User not found");
            res.redirect('/login');
        }
    });
});

//! MSSQL Admin Login
// app.post('/login-admin', (req, res) => {

//     console.log("Login Form Info:");
//     console.log(req.body);

//     sql.query(`SELECT * FROM Staff WHERE email = '${req.body.email}' AND password = '${req.body.password}'`)
//         .then(result => {
//             if (result.recordset.length > 0 && result.recordset[0].Type === 'Admin' || result.recordset[0].Type === 'admin') {
//                 console.log("User found: " + result.recordset[0].email);
//                 res.sendFile(path.join(__dirname, 'Public', 'admin-dashboard.html'));
//             } else {
//                 console.log("User not found");
//                 res.redirect('/login-admin');
//             }
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//             res.status(500).send("Error: " + err);
//         });

// });

//! MySQL Admin Login
app.post('/login-admin', (req, res) => {
    const { email, password } = req.body;

    console.log("Login Form Info:");
    console.log(req.body);

    const query = 'SELECT * FROM Staff WHERE email = ? AND password = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).send("Internal Server Error");
        }

        if (results.length > 0 && (results[0].Type === 'Admin' || results[0].Type === 'admin')) {
            console.log("User found: " + results[0].email);
            res.sendFile(path.join(__dirname, 'Public', 'admin-dashboard.html'));
        } else {
            console.log("User not found");
            res.redirect('/login-admin');
        }
    });
});

app.get('/sign-up', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'sign-up.html'));
});

app.get('/why-us', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'why-us.html'));
});

app.get('/contact', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
});

app.get('/logout', (req, res) => {
    res.redirect('/login');
});

app.get('/admin-dashboard', (req, res) => {

    // res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
    res.sendFile(path.join(__dirname, 'Public', 'admin-dashboard.html'));
});


app.get('/admin-payment-log', (req, res) => {

    // res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
    res.sendFile(path.join(__dirname, 'Public', 'admin-payment-log.html'));
});

app.get('/admin-property-management', (req, res) => {

    // res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
    res.sendFile(path.join(__dirname, 'Public', 'admin-property-management.html'));
});

app.get('/admin-user-management', (req, res) => {

    // res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
    res.sendFile(path.join(__dirname, 'Public', 'admin-user-management.html'));
});

//! MSSQL Get All Users
// app.get('/getAllUser', (req, res) => {

//     sql.query(`SELECT * FROM Users`)
//         .then(result => {
//             if (result.recordset.length > 0) {
//                 console.log("Users found: " + result.recordset.length);
//                 res.json(result.recordset);
//             } else {
//                 console.log("No users found");
//                 res.status(404).send("No users found");
//             }
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//             res.status(500).send("Error: " + err);
//         });
// });

//! MySQL Get All Users
app.get('/getAllUser', (req, res) => {
    connection.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            console.error('Error:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            console.log("Users found: " + results.length);
            res.json(results);
        } else {
            console.log("No users found");
            res.status(404).send("No users found");
        }
    });
});

//! MSSQL Sign Up
// app.post('/signup', (req, res) => {

//     console.log("Sign Up Form Info:");
//     console.log(req.body);
//     // res.json(req.body);

//     sql.query(`INSERT INTO Application.Users (name, gender, email, phone, MyKad, password, Type) VALUES ('${req.body.name}', '${req.body.gender}', '${req.body.email}', '${req.body.phone}', '${req.body.icNum}', '${req.body.password}', '${req.body.userType}')`)
//         .then(result => {
//             console.log("User created: " + req.body.email);
//             // res.status(200).send("User created: " + req.body.email);
//             res.redirect('/login');
//         })
//         .catch(err => {
//             console.log("Error: " + err);
//             res.status(500).send("Error: " + err);
//             res.redirect('/sign-up');
//         });
// });

//! MySQL Sign Up
app.post('/signup', (req, res) => {
    console.log("Sign Up Form Info:");
    console.log(req.body);

    const { name, gender, email, phone, icNum, password, userType } = req.body;

    const query = `
        INSERT INTO Users (name, gender, email, phone, MyKad, password, Type)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, gender, email, phone, icNum, password, userType];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).send("Error: " + err);
        }

        console.log("User created: " + email);
        res.redirect('/login');
    });
});


// app.listen(port, () => {

//     console.log("Listening on port " + port);
// })


// Start HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log('HTTPS Server running on port 80');
});
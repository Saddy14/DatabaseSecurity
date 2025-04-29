const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { connect, sql } = require('./db.js')

app.use(bodyParser.json()) //? For JSON data
app.use(bodyParser.urlencoded({ extended: true })) //? For URL encoded data
app.use(cors()) //? For CORS

// Serve static files
app.use(express.static(path.join(__dirname, 'Public')));


connect() //? Connect to the database

    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.log("Error connecting to the database: " + err)
    })


app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

app.post('/login', (req, res) => {

    console.log("Login Form Info:");
    console.log(req.body);
    
    sql.query(`SELECT * FROM Application.Users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`)
        .then(result => {
            if (result.recordset.length > 0) {
                console.log("User found: " + result.recordset[0].email);
                res.sendFile(path.join(__dirname, 'Public', 'admin-dashboard.html'));
            } else {
                console.log("User not found");
                res.status(401).send("Invalid email or password");
            }
        })
        .catch(err => {
            console.log("Error: " + err);
            res.status(500).send("Error: " + err);
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

    // res.sendFile(path.join(__dirname, 'Public', 'contact.html'));
    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
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

app.get('/getAllUser', (req, res) => {

    sql.query(`SELECT * FROM Application.Users`)
        .then(result => {
            if (result.recordset.length > 0) {
                console.log("Users found: " + result.recordset.length);
                res.json(result.recordset);
            } else {
                console.log("No users found");
                res.status(404).send("No users found");
            }
        })
        .catch(err => {
            console.log("Error: " + err);
            res.status(500).send("Error: " + err);
        });
});










app.listen(port, () => {

    console.log("Listening on port " + port);
})
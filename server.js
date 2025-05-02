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


app.delete('/deleteUser/:id', (req, res) => {

    const userId = req.params.id;
    console.log("Delete User Info:");
    console.log(req.body);

    sql.query(`DELETE FROM Application.Users WHERE id = ${userId}`)
        .then(result => {
            if (result.rowsAffected[0] > 0) {
                console.log("User deleted Id: " + userId);
                res.status(200).send("User deleted Id: " + userId);
            } else {
                console.log("User not found: " + userId);
                res.status(404).send("User not found: " + userId);
            }
        })
        .catch(err => {
            console.log("Error: " + err);
            res.status(500).send("Error: " + err);
        });


});

app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

app.post('/login', (req, res) => {

    console.log("Login Form Info:");
    console.log(req.body);

    sql.query(`SELECT * FROM Application.Users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`)
        .then(result => {
            if (result.recordset.length > 0 && result.recordset[0].Type === 'Admin' || result.recordset[0].Type === 'admin') {
                console.log("User found: " + result.recordset[0].email);
                res.sendFile(path.join(__dirname, 'Public', 'admin-dashboard.html'));
            } else if (result.recordset.length > 0 && result.recordset[0].Type === 'Tenant') {
                console.log("User found: " + result.recordset[0].email);
                res.sendFile(path.join(__dirname, 'Public', 'tenant-dashboard.html'));
            } else {
                console.log("User not found");
                res.redirect('/login');
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

app.post('/signup', (req, res) => {
    
        console.log("Sign Up Form Info:");
        console.log(req.body);
        // res.json(req.body);
    
        sql.query(`INSERT INTO Application.Users (name, gender, email, phone, MyKad, password, Type) VALUES ('${req.body.name}', '${req.body.gender}', '${req.body.email}', '${req.body.phone}', '${req.body.icNum}', '${req.body.password}', '${req.body.userType}')`)
            .then(result => {
                console.log("User created: " + req.body.email);
                // res.status(200).send("User created: " + req.body.email);
                res.redirect('/login');
            })
            .catch(err => {
                console.log("Error: " + err);
                res.status(500).send("Error: " + err);
                res.redirect('/sign-up');
            });
});


app.listen(port, () => {

    console.log("Listening on port " + port);
})
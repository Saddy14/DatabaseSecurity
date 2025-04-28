const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cors = require('cors');
// const bodyParser = require('body-parser');
const { connect } = require('./db.js')

app.use(bodyParser.json()) //? For JSON data
app.use(bodyParser.urlencoded({ extended: true })) //? For URL encoded data
app.use(cors()) //? For CORS

connect() //? Connect to the database

    .then(() => {
        console.log("Connected to the database")
    })
    .catch((err) => {
        console.log("Error connecting to the database: " + err)
    })


app.get('/', (req, res) => {

    res.send("Hello")
});

app.listen(port, () => {

    console.log("Listening on port " + port);
})
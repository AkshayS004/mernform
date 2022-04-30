const express = require('express');
const cors = require("cors");
const fs = require('fs');
const mysql = require('mysql2');



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Port listening on ${port}`)
})

app.use('/db/users', require('./dbRoute'));


const conn = require('./mongoConn');
const ObjectId = require("mongodb").ObjectId;

app.get('/getData', (req, res) => {
    const dbo = conn.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    dbo.collection("sales").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
    console.log(dbo)
})


var con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: "Akshay",
    password: "akshay",
    database: "nodeschema"
});

app.post('/db', (req, res) => {
    const data = req.body;
    data.map((element) => {
        con.query("INSERT INTO form (emailId,roleId,status) VALUES (?,?,?)", [element[0], element[1], element[2]], function (err, result) {
            if (result !== undefined) {
                console.log(result)
            } else {
                console.log(err.sqlMessage)
            }
        })
    });
});

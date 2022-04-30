const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const axios = require('axios');
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.PORT,
    user: "Akshay",
    password: "akshay",
    database: "nodeschema"
});

router.get('/:data', (req, res) => {
    console.log(req.params.data);
})
router.get('/', (req, res) => {
    con.query("SELECT * FROM users", function (err, result) {
        if (result) {
            console.log(result)
            res.json(result)
        } else {
            res.status(400).json({ "msg": "Not Found" })
        }
    });
});

router.get('/:id', (req, res) => {
    con.query("SELECT * FROM users WHERE id=?", req.params.id, function (err, result) {
        if (result.length !== 0) {
            res.json(result);
        } else {
            res.json({ msg: "No record Found" });
        }
    });
});

router.post('/', (req, res) => {
    con.query("INSERT INTO users (name,username,email) VALUES (?,?,?)", [req.body.name, req.body.username, req.body.email], function (err, result) {
        if (result !== undefined) {
            res.json({ msg: "Record Inserted" })
        } else {
            res.json(err.sqlMessage)
        }
    })
})


router.put('/:id', (req, res) => {
    con.query("UPDATE users SET name=?,username=?,email=? WHERE id = ?", [req.body.name, req.body.username, req.body.email, req.params.id], function (err, result) {
        if (result !== undefined) {
            res.json({ msg: "Record Inserted" })
        } else {
            res.json(err.sqlMessage)
        }
    })
});

router.delete('/:id', (req, res) => {
    con.query("DELETE FROM users WHERE id = ?", req.params.id, function (err, result) {
        if (result.affectedRows !== 0) {
            res.json({ msg: "Record Deleted" })
        } else {
            res.json({ msg: "Record Deletion Error" })
        }
    })
});

module.exports = router;
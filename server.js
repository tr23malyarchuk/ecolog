const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'Av_s0l*YaM4)2005',
    database: 'ecolog'
});

app.get('/api/substances', (req, res) => {
    db.query('SELECT DISTINCT назва_забруд_речовини FROM інфа_про_водойми', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/objects', (req, res) => {
    db.query('SELECT DISTINCT обєкт FROM назва_обєкту', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/years', (req, res) => {
    db.query('SELECT DISTINCT Рік FROM інфа_про_повітря', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

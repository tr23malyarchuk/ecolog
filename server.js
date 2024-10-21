const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'Av_s0l*YaM4)2005',
    database: 'ecolog'
});

app.use(express.static('public'));

function connectWithRetry() {
    connection.connect((err) => {
        if (err) {
            console.error('Connection error: ' + err.stack);
            console.log("I'll try to connect in 5 seconds...");
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Connected as id ' + connection.threadId);
        }
    });
}

connectWithRetry();

app.get('/api/tables', (req, res) => {
    connection.query('SHOW TABLES', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        const tables = results.map(row => Object.values(row)[0]);
        res.json(tables);
    });
});

app.get('/api/data/:table', (req, res) => {
    const table = req.params.table;
    connection.query(`SELECT * FROM ??`, [table], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

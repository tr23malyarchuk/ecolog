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

app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM обєкт';
    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

function connectWithRetry() {
    connection.connect((err) => {
        if (err) {
            console.error('Ошибка подключения: ' + err.stack);
            console.log("Попробую подключиться снова через 5 секунд...");
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Подключено как id ' + connection.threadId);
        }
    });
}

connectWithRetry();

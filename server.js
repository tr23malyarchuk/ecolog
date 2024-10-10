const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Av_s0l*YaM4)2005',
    database: 'ecolog'
});

connection.connect((err) => {
    if (err) {
        console.error('Connection error: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'yhhg5bfbhun', 
  database: 'mydb'  
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM обєкт';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query executing error:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

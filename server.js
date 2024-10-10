const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mydbuser',
  password: 'mydb',
  database: 'mydb'
});

connection.connect(err => {
  if (err) {
    console.error('Error connection to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM mydb.обєкт';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query executing error:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

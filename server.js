const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки JSON
app.use(express.json());

// Пример роута для получения данных из базы
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

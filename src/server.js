const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

const connection = mysql.createConnection({
    host: '34.79.184.250',
    user: 'root',
    password: '',
    database: 'NutriNote'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/api/data', (req, res) => {
    connection.query('SELECT * FROM NutriNote', (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

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

//Мок функція
const getCurrentUserId = (req) => {
    return req.headers['user-id'] || 1;
};

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO Users (Tag, `E-mail`, Password) VALUES (?, ?, ?)';

    connection.query(query, [username, email, password], (err) => {
        if (err) {
            console.error('Error during registration:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE `E-mail` = ? AND Password = ?';

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        if (results.length > 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.post('/api/add-friend', (req, res) => {
    const currentUserId = getCurrentUserId(req);
    const { friendId } = req.body;

    const query = 'INSERT INTO Friends (Id, IdOfFriend) VALUES (?, ?)';

    connection.query(query, [currentUserId, friendId], (err) => {
        if (err) {
            console.error('Error adding friend:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/remove-friend', (req, res) => {
    const currentUserId = getCurrentUserId(req);
    const { friendId } = req.body; 

    const query = 'DELETE FROM Friends WHERE Id = ? AND IdOfFriend = ?';

    connection.query(query, [currentUserId, friendId], (err) => {
        if (err) {
            console.error('Error removing friend:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.get('/api/friends', (req, res) => {
    const currentUserId = getCurrentUserId(req);

    const query = `
        SELECT u.Id, u.Tag, u.E-mail
        FROM Users u
        JOIN Friends f ON u.Id = f.IdOfFriend
        WHERE f.Id = ?
    `;

    connection.query(query, [currentUserId], (err, results) => {
        if (err) {
            console.error('Error fetching friends:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true, friends: results });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

const getCurrentUserId = (req) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};

const authenticate = (req, res, next) => {
    const userId = getCurrentUserId(req);
    if (!userId) {
        return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
    req.userId = userId;
    next();
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

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
            const token = generateToken(results[0].Id);
            res.send({ success: true, token });
        } else {
            res.send({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.post('/api/edit-user', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { username, email, password } = req.body;

    const query = 'UPDATE Users SET Tag = ?, `E-mail` = ?, Password = ? WHERE user_id = ?';

    connection.query(query, [username, email, password, currentUserId], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/upload-avatar', authenticate, upload.single('avatar'), (req, res) => {
    const currentUserId = req.userId;
    const avatarURL = `/uploads/avatars/${req.file.filename}`;

    const query = 'UPDATE Users SET AvatarURL = ? WHERE user_id = ?';

    connection.query(query, [avatarURL, currentUserId], (err) => {
        if (err) {
            console.error('Error uploading avatar:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/delete-avatar', authenticate, (req, res) => {
    const currentUserId = req.userId;

    const query = 'UPDATE Users SET AvatarURL = NULL WHERE user_id = ?';

    connection.query(query, [currentUserId], (err) => {
        if (err) {
            console.error('Error deleting avatar:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.get('/api/notes', authenticate, (req, res) => {
    const currentUserId = req.userId;

    const query = 'SELECT * FROM Records WHERE Id = ?';

    connection.query(query, [currentUserId], (err, results) => {
        if (err) {
            console.error('Error fetching calorie records:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true, notes: results });
    });
});

app.post('/api/add-note', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { calories, comment } = req.body;

    const query = 'INSERT INTO Records (Id, Callories, Comment, Date) VALUES (?, ?, ?, NOW())';

    connection.query(query, [currentUserId, calories, comment], (err) => {
        if (err) {
            console.error('Error adding calorie entry:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/delete-note', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { noteId } = req.body;

    const query = 'DELETE FROM Records WHERE IdOfRecord = ? AND Id = ?';

    connection.query(query, [noteId, currentUserId], (err) => {
        if (err) {
            console.error('Error deleting calorie entry:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/edit-note', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { noteId, calories, comment, noteDate } = req.body;

    const query = 'UPDATE Records SET Callories = ?, Comment = ?, Date = ? WHERE IdOfRecord = ? AND Id = ?';

    connection.query(query, [calories, comment, noteDate, noteId, currentUserId], (err) => {
        if (err) {
            console.error('Error updating calorie entry:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.post('/api/add-friend', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { friendTag, comment } = req.body;

    const findFriendQuery = 'SELECT Id FROM Users WHERE Tag = ?';
    const addFriendQuery = 'INSERT INTO Friends (Id, IdOfFriend) VALUES (?, ?)';

    connection.query(findFriendQuery, [friendTag], (err, results) => {
        if (err) {
            console.error('Error finding friend:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).send({ success: false, message: 'Friend not found' });
            return;
        }

        const friendId = results[0].Id;

        connection.query(addFriendQuery, [currentUserId, friendId], (err) => {
            if (err) {
                console.error('Error adding friend:', err);
                res.status(500).send({ success: false, message: 'Server error' });
                return;
            }
            res.send({ success: true });
        });
    });
});

app.post('/api/remove-friend', authenticate, (req, res) => {
    const currentUserId = req.userId;
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

app.get('/api/friends', authenticate, (req, res) => {
    const currentUserId = req.userId;

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

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'Hb7YcAe3rL9gNjP2sR5wT1qZu4vXyB6';

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const connection = mysql.createConnection({
    host: '34.79.184.250',
    user: 'Limbo',
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
    return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
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

app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const checkQuery = 'SELECT * FROM Users WHERE Tag = ? OR Email = ?';

    connection.query(checkQuery, [username, email], (err, results) => {
        if (err) {
            console.error('Error during checking user:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            const existingUser = results[0];
            if (existingUser.Tag === username) {
                res.send({ success: false, message: 'Nickname already exists' });
            } else if (existingUser['Email'] === email) {
                res.send({ success: false, message: 'Email already exists' });
            }
            return;
        }

        const query = 'INSERT INTO Users (Tag, Email, Password) VALUES (?, ?, ?)';
        connection.query(query, [username, email, password], (err, result) => {
            if (err) {
                console.error('Error during registration:', err);
                res.status(500).send({ success: false, message: 'Server error' });
                return;
            }
            const userId = result.insertId;
            const token = generateToken(userId);
            res.send({ success: true, userId, token });
        });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';

    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const userId = user.Id;
            const token = generateToken(userId);
            res.send({ success: true, userId, token });
        } else {
            res.send({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.get('/api/get-user', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const query = 'SELECT Tag AS username, Email AS email, Height AS height, Weight AS weight, Age AS age, Gender AS gender FROM Users WHERE Id = ?';

    connection.query(query, [currentUserId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            res.send(results[0]);
        } else {
            res.status(404).send({ success: false, message: 'User not found' });
        }
    });
});



app.post('/api/edit-user', authenticate, (req, res) => {
    const currentUserId = req.user.userId;
    const { username, email, password, height, weight, age } = req.body;

    const query = `
        UPDATE Users
        SET Tag = ?, Email = ?, Password = ?, Height = ?, Weight = ?, Age = ?
        WHERE Id = ?
    `;

    connection.query(query, [username, email, password, height, weight, age, currentUserId], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

app.get('/api/get-calories', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const query = `
      SELECT Date, SUM(Callories) as TotalCalories
      FROM Records
      WHERE Id = ?
      GROUP BY Date
      ORDER BY Date DESC
      LIMIT 5
    `;

    connection.query(query, [currentUserId], (err, results) => {
        if (err) {
            console.error('Error fetching calorie data:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }

        res.send({ success: true, calories: results });
    });
});

app.get('/api/last-calories/:friendId', authenticate, (req, res) => {
    const { friendId } = req.params;
    const query = 'SELECT Callories, Date FROM Records WHERE Id = ? ORDER BY Date DESC LIMIT 1';
  
    connection.query(query, [friendId], (err, results) => {
      if (err) {
        console.error('Error fetching last calorie record:', err);
        res.status(500).send({ success: false, message: 'Server error' });
        return;
      }
  
      if (results.length > 0) {
        res.send({ success: true, lastCalories: results[0] });
      } else {
        res.send({ success: true, lastCalories: null });
      }
    });
  });
  



app.get('/api/notes', authenticate, (req, res) => {
    const currentUserId = req.userId;

    const query = 'SELECT * FROM Records WHERE Id = ?';

    connection.query(query, [currentUserId], (err, results) => {
        if (err) {
            console.error('Error retrieving notes:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true, records: results });
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
    console.log(`Attempting to delete noteId: ${noteId} for userId: ${currentUserId}`);

    connection.query(query, [noteId, currentUserId], (err, result) => {
        if (err) {
            console.error('Error deleting calorie entry:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        if (result.affectedRows > 0) {
            console.log('Note deleted successfully');
            res.send({ success: true });
        } else {
            console.log('Note not found or not authorized');
            res.send({ success: false, message: 'Note not found or not authorized' });
        }
    });
});


app.post('/api/edit-note', authenticate, (req, res) => {
    const { noteId, calories, comment, date } = req.body;

    if (!date) {
        return res.status(400).json({ success: false, message: 'Date is required' });
    }

    let sql = `UPDATE Records SET Callories = ?, Comment = ?, Date = ? WHERE IdOfRecord = ? AND Id = ?`;
    const values = [calories, comment, date, noteId, req.user.userId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating calorie entry:", err);
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true });
    });
});

app.post('/api/add-friend', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { friendTag } = req.body;

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
    SELECT u.Id, u.Tag, u.Email
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

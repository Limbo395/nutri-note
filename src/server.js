const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 3000 ;
const secretKey = 'Hb7YcAe3rL9gNjP2sR5wT1qZu4vXyB6';

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
    console.log("Token from headers:", token); // Додано для перевірки токену
    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log("Decoded token:", decoded); // Додано для перевірки декодованого токену
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

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/avatars');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
// const upload = multer({ storage: storage });

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
            const userId = result.insertId; // Отримання ідентифікатора користувача з результату вставки
            const token = generateToken(userId); // Створення токена з ідентифікатором користувача
            res.send({ success: true, userId, token }); // Відправка ідентифікатора та токена відповіддю
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
            const userId = user.Id; // Отримання ідентифікатора користувача з результату запиту
            const token = generateToken(userId); // Створення токена з ідентифікатором користувача
            res.send({ success: true, userId, token }); // Відправка ідентифікатора та токена відповіддю
        } else {
            res.send({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.post('/api/edit-user', authenticate, (req, res) => {
    const currentUserId = req.userId;
    const { username, email, password } = req.body;

    const query = 'UPDATE Users SET Tag = ?, Email = ?, Password = ? WHERE user_id = ?';

    connection.query(query, [username, email, password, currentUserId], (err) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).send({ success: false, message: 'Server error' });
            return;
        }
        res.send({ success: true });
    });
});

// app.post('/api/upload-avatar', authenticate, upload.single('avatar'), (req, res) => {
//     const currentUserId = req.userId;
//     const avatarURL = `/uploads/avatars/${req.file.filename}`;

//     const query = 'UPDATE Users SET AvatarURL = ? WHERE user_id = ?';

//     connection.query(query, [avatarURL, currentUserId], (err) => {
//         if (err) {
//             console.error('Error uploading avatar:', err);
//             res.status(500).send({ success: false, message: 'Server error' });
//             return;
//         }
//         res.send({ success: true });
//     });
// });

// app.post('/api/delete-avatar', authenticate, (req, res) => {
//     const currentUserId = req.userId;

//     const query = 'UPDATE Users SET AvatarURL = NULL WHERE user_id = ?';

//     connection.query(query, [currentUserId], (err) => {
//         if (err) {
//             console.error('Error deleting avatar:', err);
//             res.status(500).send({ success: false, message: 'Server error' });
//             return;
//         }
//         res.send({ success: true });
//     });
// });

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
    const { friendTag } = req.body;

    // Перевірка чи користувач не намагається додати себе як друга
    if (friendTag === currentUserId) {
        return res.status(400).send({ success: false, message: "You cannot add yourself as a friend" });
    }

    // Перевірка чи існує вже такий друг
    const checkQuery = 'SELECT * FROM Users WHERE Tag = ?';
    connection.query(checkQuery, [friendTag], (err, results) => {
        if (err) {
            console.error('Error during checking friend:', err);
            return res.status(500).send({ success: false, message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'Friend not found' });
        }

        const friendId = results[0].Id;
        
        // Перевірка чи вже є такий друг
        const checkFriendshipQuery = 'SELECT * FROM Friends WHERE Id = ? AND IdOfFriend = ?';
        connection.query(checkFriendshipQuery, [currentUserId, friendId], (err, results) => {
            if (err) {
                console.error('Error during checking friendship:', err);
                return res.status(500).send({ success: false, message: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).send({ success: false, message: 'You are already friends' });
            }

            // Додавання друга
            const insertQuery = 'INSERT INTO Friends (Id, IdOfFriend) VALUES (?, ?)';
            connection.query(insertQuery, [currentUserId, friendId], (err) => {
                if (err) {
                    console.error('Error adding friend:', err);
                    return res.status(500).send({ success: false, message: 'Server error' });
                }
                res.send({ success: true });
            });
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

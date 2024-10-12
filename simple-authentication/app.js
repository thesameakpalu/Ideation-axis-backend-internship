const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

let users = []; // In-memory storage for users

// Helper function to find a user by username
function findUser(username) {
    return users.find(user => user.username === username);
}

// 1. Account Creation
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    if (findUser(username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Add user to the in-memory array
    users.push({ username, password });
    res.status(201).json({ message: 'Account created successfully' });
});

// 2. Sign In
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const user = findUser(username);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Sign-in successful' });
});

// 3. Change Password
app.put('/changepassword', (req, res) => {
    const { username, currentPassword, newPassword } = req.body;

    const user = findUser(username);
    if (!user || user.password !== currentPassword) {
        return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update the password
    user.password = newPassword;
    res.status(200).json({ message: 'Password updated successfully' });
});

// 4. Delete Account
app.delete('/deleteaccount', (req, res) => {
    const { username, password } = req.body;

    const userIndex = users.findIndex(user => user.username === username && user.password === password);

    if (userIndex === -1) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Remove user from the in-memory array
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Account deleted successfully' });
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

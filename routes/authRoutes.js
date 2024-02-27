// const express = require('express');
// const bcrypt = require('bcrypt'); // For password hashing
// const jwt = require('jsonwebtoken'); // For generating JWT tokens
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await prisma.user.findUnique({
//             where: { email },
//         });

//         // If user is not found or password is incorrect
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // If authentication is successful, generate JWT token
//         const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Register route
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the user in the database
//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword,
//             },
//         });

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Logout route (optional)
// router.post('/logout', (req, res) => {
//     // Clear the session or token, if using session-based authentication
//     res.status(200).json({ message: 'Logout successful' });
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const { PrismaClient } = require("@prisma/client");
// Create an instance of Express router
const router = express.Router();
// Initialize Prisma client
const prisma = new PrismaClient();
// Route for user registration
// router.get("/", (req, res) => {
//   res.send("My first get");
// });
router.post('/', async (req, res) => {
  try {
    // Destructure user details from request body
    const { username, password, firstname, lastname, email } = req.body;
    // Check if username or email already exists in the database
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });
    // If user already exists, send an error response
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user in the database
    const newUser = await prisma.users.create({
      data: {
        username: username,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        email: email
      }
    });
    // Generate JWT token for authentication
    const token = jwt.sign({ userId: newUser.id }, 'your_secret_key');
    // Send success response with token
    res.status(201).json({ token });
  } catch (error) {
    // If any error occurs, send an error response
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Export the router
module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

// Create an instance of Express router
const router = express.Router();

// Initialize Prisma client
const prisma = new PrismaClient();

// Route for user registration

// router.get("/", (req, res) => {
//   res.send("My first get");
// });

router.post('/newuser', async (req, res) => {
 
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

// registered users

// "username": "jew1902",
// "password": "123456j",
// "firstname": "jimmy",
// "lastname": "bones",
// "email": "jw123@gmail.com"





// After completing the registration endpoint for creating new users, there are several possible next steps depending on your application requirements and architecture. Here are a few common steps you might consider:

// Login Endpoint: Implement a login endpoint where users can authenticate using their username/email and password. This endpoint would typically verify the credentials against the database and generate a JWT token for authenticated users.

// Authentication Middleware: Create middleware to authenticate requests using the JWT token. This middleware can be applied to routes that require authentication, ensuring that only authenticated users can access protected resources.

// User Profile Endpoint: Implement an endpoint to retrieve user profile information, update user details, or delete the user account. This allows users to manage their account settings after registration.

// Email Verification: Implement email verification for newly registered users. This involves sending a verification email with a unique token/link to the user's email address and verifying the token/link when the user clicks on it.

// Error Handling and Logging: Enhance error handling in your backend to provide informative error messages to clients and log errors for debugging purposes.

// Testing: Write unit tests and integration tests to ensure that the registration endpoint and other features work as expected. Tools like Jest and Supertest can be helpful for testing Express.js applications.
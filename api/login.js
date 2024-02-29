<<<<<<< HEAD
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
=======
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
>>>>>>> f32fd137be8a68ae4eadc66b6a945dbe98455bbe
const { PrismaClient } = require("@prisma/client");

// Create an instance of Express router
const router = express.Router();

<<<<<<< HEAD
// Initialize Prisma client
const prisma = new PrismaClient();

// Route for user login
router.post("/login", async (req, res) => {
=======


// Initialize Prisma client
const prisma = new PrismaClient();


// Route for user login
router.post('/login', async (req, res) => {
>>>>>>> f32fd137be8a68ae4eadc66b6a945dbe98455bbe
  try {
    // Destructure username and password from request body
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    // If user does not exist, send an error response
    if (!user) {
<<<<<<< HEAD
      return res.status(404).json({ error: "User not found" });
=======
      return res.status(404).json({ error: 'User not found' });
>>>>>>> f32fd137be8a68ae4eadc66b6a945dbe98455bbe
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, send an error response
    if (!passwordMatch) {
<<<<<<< HEAD
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
=======
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
>>>>>>> f32fd137be8a68ae4eadc66b6a945dbe98455bbe

    // Send token in response
    res.json({ token });
  } catch (error) {
<<<<<<< HEAD
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
=======
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
>>>>>>> f32fd137be8a68ae4eadc66b6a945dbe98455bbe

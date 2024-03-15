const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

// Create an instance of Express router
const router = express.Router();

// Initialize Prisma client
const prisma = new PrismaClient();
// Route for user login
router.post("/", async (req, res) => {
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
      return res.status(404).json({ error: "User not found" });
    }
    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    // If passwords don't match, send an error response
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;

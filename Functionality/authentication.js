const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Example user database (replace this with your actual user database)
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$yT89TPaZvhW1nrZjSj8X/uE10v8xTkhUCvQYpADQt8m96q7R03F3O",
  }, // Hashed password for 'password1'
];

// Secret key for JWT (change this to a strong, random key in production)
const JWT_SECRET = "your-secret-key";

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

// Route for user login
function login(req, res) {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((user) => user.username === username);

  // If user not found or password is incorrect, return error
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = generateToken(user);

  // Return token
  res.json({ token });
}

module.exports = {
  verifyToken,
  login,
};

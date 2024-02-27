// app.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const createUsersRoute = require("./routes/users");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes); // Authentication routes

// Initialize user routes
const prisma = require('@prisma/client');
const usersRoute = createUsersRoute(prisma);
app.use("/users", usersRoute); // User routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// routes/users.js

const express = require('express');

function createUsersRoute(prisma) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        try {
            const offset = (page - 1) * limit;
            const users = await prisma.user.findMany({
                skip: offset,
                take: limit,
            });

            const totalCount = await prisma.user.count();
            const totalPages = Math.ceil(totalCount / limit);

            res.json({
                users,
                totalCount,
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
}

module.exports = createUsersRoute;

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

// Get user's anime preferences
router.get("/:userId/preferences", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        preferences: true, // Assuming you have a "preferences" relation in your User model
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.preferences);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user's anime preferences
router.put("/:userId/preferences", async (req, res) => {
  const { userId } = req.params;
  const { preferences } = req.body;

  try {
    // Update user's preferences in the database
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        preferences: preferences, // Assuming you have a "preferences" field in your User model
      },
    });

    res.status(200).json(updatedUser.preferences);
  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Other user routes...

module.exports = router;

const express = require("express");
const userRouter = express.Router();
const axios = require("axios");
// Route to get anime details by ID
userRouter.get("/anime/:id", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to search anime by query
userRouter.get('/anime/:id/episodes', async (req, res) => {
  const animeId = req.params.id;
  try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/episodes`);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.get('/anime/:id/reviews', async (req, res) => {
  const animeId = req.params.id; // Retrieve the anime ID from the route parameters
  try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/reviews`);
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to get anime characters
userRouter.get('/anime/:id/characters', async (req, res) => {
    const animeId = req.params.id;
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// Route to get videos for an anime by ID
userRouter.get('/anime/:id/videos', async (req, res) => {
    const animeId = req.params.id;
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// // Route to user account-need to finish this
// userRouter.get('/anime/:id/videos', async (req, res) => {
//   const animeId = req.params.id;
//   try {
//       const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
//       res.json(response.data);
//   } catch (error) {
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = userRouter;
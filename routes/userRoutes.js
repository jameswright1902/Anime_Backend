const express = require("express");
const userRouter = express.Router();
const axios = require("axios");
const {
  fetchAnimeSchedules,
  fetchTopAnimeCharacters,
  fetchTopAnime,
} = require("../app/recommendation");
// Route to get anime details by ID
userRouter.get("/anime/:id", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to search anime by query
userRouter.get("/anime/:id/episodes", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}/episodes`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
userRouter.get("/anime/:id/reviews", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}/reviews`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to get anime characters
userRouter.get("/anime/:id/characters", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}/characters`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to get videos for an anime by ID
userRouter.get("/anime/:id/videos", async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime/${animeId}/videos`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to fetch Anime Schedules
userRouter.get("/schedules", async (req, res) => {
  const page = req.query.page || 1; // Default page is 1
  try {
    const animeSchedules = await fetchAnimeSchedules(page);
    res.json(animeSchedules);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to fetch Top Anime Characters
userRouter.get("/top/characters", async (req, res) => {
  const page = req.query.page || 1; // Default page is 1
  try {
    const topAnimeCharacters = await fetchTopAnimeCharacters(page);
    res.json(topAnimeCharacters);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to fetch top anime
userRouter.get("/top/anime", async (req, res) => {
  const page = req.query.page || 1; // Default page is 1
  try {
    const response = await fetchTopAnime(page);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = userRouter;
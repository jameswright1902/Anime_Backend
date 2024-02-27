const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/health
router.get("/health", (req, res, next) => {
  res.send("OK");
});


router.get("/anime/:id", async (req, res) => {
  const animeId = req.params.id;
  const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
  res.json(response.data);
  return;
});

module.exports = router;

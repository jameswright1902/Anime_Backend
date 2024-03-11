const axios = require("axios");

// Function to fetch anime recommendations
async function fetchAnimeSchedules(page) {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/schedules?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching anime schedules:", error.message);
    throw error;
  }
}


async function fetchTopAnimeCharacters(page) {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/characters?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top anime characters:", error.message);
    throw error;
  }
}

async function fetchTopAnime(page) {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/top/anime?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top anime:", error.message);
    throw error;
  }
}

module.exports = {
  fetchAnimeSchedules,
  fetchTopAnimeCharacters,
  fetchTopAnime,
};

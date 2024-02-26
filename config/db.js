// Export the PrismaClient instance to be used in other parts of the application
module.exports = prisma;
require("dotenv").config(); // Load environment variables from .env file
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Function to fetch data from the Jikan API and store it in the database
async function fetchDataAndStoreInDB() {
  try {
    // Fetch data from the Jikan API
    const response = await axios.get("https://api.jikan.moe/v4/anime/1");
    const animeData = response.data;

    // Store the data in the database using Prisma
    const createdAnime = await prisma.anime.create({
      data: {
        title: animeData.title,
        synopsis: animeData.synopsis,
        episodes: animeData.episodes,
        // Add other relevant fields from the API response as needed
      },
    });

    console.log("Data from Jikan API stored in the database:", createdAnime);
  } catch (error) {
    console.error("Error fetching and storing data:", error);
  }
}

// Call the function to fetch data from the Jikan API and store it in the database
fetchDataAndStoreInDB();

// Export the PrismaClient instance to be used in other parts of the application
module.exports = prisma;

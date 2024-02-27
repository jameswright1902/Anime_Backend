const axios = require('axios');

// Function to fetch anime details by ID
async function getAnimeDetailsById(animeId) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
        return response.data; // Return anime details
    } catch (error) {
        console.error('Error fetching anime details:', error);
        throw error;
    }
}

// Function to search for anime by query
async function searchAnime(query) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/search/anime?q=${query}`);
        return response.data.results; // Return search results
    } catch (error) {
        console.error('Error searching anime:', error);
        throw error;
    }
}

module.exports = {
    getAnimeDetailsById,
    searchAnime
};

const express = require('express');
const axios = require('axios'); // Import axios for making HTTP requests

const app = express();

// Home page route
// app.get("/", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const offset = (page - 1) * limit;
//     const users = await prisma.user.findMany({
//       skip: offset,
//       take: limit,
//     });

//     const totalCount = await prisma.user.count();
//     const totalPages = Math.ceil(totalCount / limit);

//     res.json({
//       users,
//       totalCount,
//       totalPages,
//       currentPage: page,
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



// // Route to get anime details by ID
// app.get('/anime/:id', async (req, res) => {
//     const animeId = req.params.id;
//     try {
//         const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
//         const animeDetails = response.data;
//         res.json(animeDetails);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route to search for anime by query
// app.get('/search', async (req, res) => {
//     const query = req.query.q;
//     try {
//         const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
//         const searchResults = response.data;
//         res.json(searchResults);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route to get anime genres
// app.get('/genres', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.jikan.moe/v4/genre/anime');
//         const genres = response.data;
//         res.json(genres);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route to get anime recommendations
// app.get('/recommendations/:id', async (req, res) => {
//     const animeId = req.params.id;
//     try {
//         const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
//         const recommendations = response.data;
//         res.json(recommendations);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Route to get reviews for an anime by ID
// app.get('/reviews/:id', async (req, res) => {
//     const animeId = req.params.id;
//     try {
//         const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/reviews`);
//         const reviews = response.data;
//         res.json(reviews);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


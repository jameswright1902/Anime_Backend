const express = require('express');
const router = express.Router();

// Sample data for demonstration
let animeData = [
    // { id: 1, title: 'Naruto', genre: 'Shounen' },
    // { id: 2, title: 'One Piece', genre: 'Shounen' },
    // { id: 3, title: 'Death Note', genre: 'Mystery' }
];

// GET all anime
router.get('/', (req, res) => {
    res.json(animeData);
});

// GET a specific anime by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const anime = animeData.find(anime => anime.id === id);
    if (anime) {
        res.json(anime);
    } else {
        res.status(404).json({ message: 'Anime not found' });
    }
});

// POST a new anime
router.post('/', (req, res) => {
    const { title, genre } = req.body;
    const id = animeData.length + 1; 
    const newAnime = { id, title, genre };
    animeData.push(newAnime);
    res.status(201).json(newAnime);
});

// PUT (update) an existing anime
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, genre } = req.body;
    const index = animeData.findIndex(anime => anime.id === id);
    if (index !== -1) {
        animeData[index] = { id, title, genre };
        res.json(animeData[index]);
    } else {
        res.status(404).json({ message: 'Anime not found' });
    }
});

// DELETE an anime
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = animeData.findIndex(anime => anime.id === id);
    if (index !== -1) {
        animeData.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Anime not found' });
    }
});

module.exports = router;

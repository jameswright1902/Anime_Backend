class Anime {
    constructor(title, genre) {
        this.title = title;
        this.genre = genre;
    }
}

function createAnime(title, genre) {
    return new Anime(title, genre);
}

module.exports = { Anime, createAnime };

const { getAnimeDetailsById, searchAnime } = require('../animeApi');
const axios = require('axios');

jest.mock('axios');

describe('Anime API', () => {
  describe('getAnimeDetailsById', () => {
    it('should return anime details by ID', async () => {
      // Mock Axios response
      const data = { id: 1, title: 'Naruto', description: 'Ninja anime' };
      axios.get.mockResolvedValueOnce({ data });

      // Call the function
      const animeDetails = await getAnimeDetailsById(1);

      // Assertions
      expect(animeDetails).toEqual(data);
    });

    it('should handle errors', async () => {
      // Mock Axios error
      axios.get.mockRejectedValueOnce(new Error('An error occurred'));

      // Call the function
      await expect(getAnimeDetailsById(1)).rejects.toThrow('An error occurred');
    });
  });

  describe('searchAnime', () => {
    it('should return search results', async () => {
      // Mock Axios response
      const data = [{ id: 1, title: 'No Guns Life' }, { id: 2, title: 'One Piece' }];
      axios.get.mockResolvedValueOnce({ data });

      // Call the function
      const searchResults = await searchAnime('No Guns Life');

      // Assertions
      expect(searchResults).toEqual(data);
    });

    it('should handle errors', async () => {
      // Mock Axios error
      axios.get.mockRejectedValueOnce(new Error('An error occurred'));

      // Call the function
      await expect(searchAnime('No Guns Life')).rejects.toThrow('An error occurred');
    });
  });
});

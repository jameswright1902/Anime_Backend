// preferenceController.js

// Sample preferences data (replace this with your actual data source)
let preferences = {
    favoriteGenres: [],
    preferredLanguage: 'english',
    receiveNotifications: true
  };
  
  // Controller functions
  const preferenceController = {
    // Get all preferences
    getAllPreferences: (req, res) => {
      res.json(preferences);
    },
  
    // Get a specific preference by key
    getPreferenceByKey: (req, res) => {
      const { key } = req.params;
      const preference = preferences[key];
      if (preference !== undefined) {
        res.json({ [key]: preference });
      } else {
        res.status(404).json({ message: 'Preference not found' });
      }
    },
  
    // Update a preference
    updatePreference: (req, res) => {
      const { key } = req.params;
      const { value } = req.body;
      if (preferences.hasOwnProperty(key)) {
        preferences[key] = value;
        res.json({ message: 'Preference updated successfully', [key]: value });
      } else {
        res.status(404).json({ message: 'Preference not found' });
      }
    }
  };
  
  module.exports = preferenceController;
  
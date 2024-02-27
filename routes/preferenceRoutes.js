const axios = require("axios"); // For making HTTP requests
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserPreferences(userId) {
  try {
    // Fetch user's likes and dislikes from the database
    const userPreferences = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true, // Include preferences associated with the user
      },
    });

    // Extract likes and dislikes from user's preferences
    const likes = userPreferences.preferences.filter(
      (preference) => preference.type === "like"
    );
    const dislikes = userPreferences.preferences.filter(
      (preference) => preference.type === "dislike"
    );

    return { likes, dislikes };
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
}

async function fetchAnimeData() {
  try {
    // Fetch anime data from the anime API
    const response = await axios.get("https://api.example.com/anime");
    return response.data; // Assuming the API returns an array of anime data
  } catch (error) {
    console.error("Error fetching anime data:", error);
    throw error;
  }
}

async function filterAnimeDataByPreferences(
  animeData,
  userLikes,
  userDislikes
) {
  // Filter anime data based on user's likes and dislikes
  const filteredAnimeData = animeData.filter((anime) => {
    // Check if the anime is liked or disliked by the user
    const liked = userLikes.some((like) => like.animeId === anime.id);
    const disliked = userDislikes.some(
      (dislike) => dislike.animeId === anime.id
    );

    // Include anime in filtered data only if it's liked and not disliked by the user
    return liked && !disliked;
  });

  return filteredAnimeData;
}

// Main function to retrieve preferences based on user's likes and dislikes
async function getPreferencesBasedOnUser(userId) {
  try {
    // Fetch user's preferences
    const { likes, dislikes } = await getUserPreferences(userId);

    // Fetch anime data from the anime API
    const animeData = await fetchAnimeData();

    // Filter anime data based on user's likes and dislikes
    const filteredAnimeData = await filterAnimeDataByPreferences(
      animeData,
      likes,
      dislikes
    );

    return filteredAnimeData;
  } catch (error) {
    console.error("Error retrieving preferences based on user:", error);
    throw error;
  }
}

// Example usage:
const userId = 1; // Assuming the user's ID is 1
getPreferencesBasedOnUser(userId)
  .then((preferences) => {
    console.log("Preferences based on user:", preferences);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const { PrismaClient } = require("@prisma/client");
const axios = require("axios"); // For making HTTP requests
const prisma = new PrismaClient();

// Function to fetch user preferences from the database
async function getUserPreferences(userId) {
  try {
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

// Function to fetch anime recommendations from an external API
async function fetchAnimeRecommendations() {
  try {
    const response = await axios.get(
      "https://api.jikan.moe/v4/anime"
    );
    return response.data; // Assuming the API returns an array of recommendations
  } catch (error) {
    console.error("Error fetching anime recommendations:", error);
    throw error;
  }
}

// Function to filter recommendations based on user preferences
async function filterRecommendationsByPreferences(
  recommendations,
  userLikes,
  userDislikes
) {
  const filteredRecommendations = recommendations.filter((anime) => {
    // Check if the anime is liked or disliked by the user
    const liked = userLikes.some((like) => like.animeId === anime.id);
    const disliked = userDislikes.some(
      (dislike) => dislike.animeId === anime.id
    );

    // Include anime in recommendations only if it's liked and not disliked by the user
    return liked && !disliked;
  });

  return filteredRecommendations;
}

// Main function to generate recommendations for a user
async function generateRecommendations(userId) {
  try {
    // Fetch user's preferences
    const { likes, dislikes } = await getUserPreferences(userId);

    // Fetch anime recommendations from the anime API
    const recommendations = await fetchAnimeRecommendations();

    // Filter recommendations based on user's likes and dislikes
    const filteredRecommendations = await filterRecommendationsByPreferences(
      recommendations,
      likes,
      dislikes
    );

    return filteredRecommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}

// Example usage:
const userId = 1; // Assuming the user's ID is 1
generateRecommendations(userId)
  .then((recommendations) => {
    console.log("Recommendations:", recommendations);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

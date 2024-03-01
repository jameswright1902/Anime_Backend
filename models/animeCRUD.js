

// Import the Prisma Client
import { PrismaClient } from "@prisma/client";

// Instantiate the Prisma Client
const prisma = new PrismaClient();

// Define an async function to interact with the database
async function main() {
  // Example: Create a new Anime record
  const newAnime = await prisma.anime.create({
    data: {
      title: "",
      description: "",
      episodes: 12,
      releaseDate: new Date(""),
    },
  });
  console.log("Created anime:", newAnime);

  // Example: Query all Anime records
  const allAnime = await prisma.anime.findMany();
  console.log("All anime:", allAnime);
}

// Call the main function to execute database operations
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Close the Prisma Client connection when done
    await prisma.$disconnect();
  });

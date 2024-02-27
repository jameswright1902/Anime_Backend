// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const router = require("express").Router();

// // Deny access if user is not logged in
// router.use((req, res, next) => {
//   if (!req.user) {
//     return res.status(401).send("You must be logged in to do that.");
//   }
//   next();
// });

// // Get all users
// router.get("/", async (req, res, next) => {
//   try {
//     const users = await prisma.users.findMany();
//     res.send(users);
//   } catch (error) {
//     next(error);
//   }
// });

// // Get user by id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const user = await prisma.users.findFirst({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// // create new user
// router.post("/", async (req, res, next) => {
//   try {
//     const { firstname, lastname, email, password } = req.body;
//     const user = await prisma.users.create({
//       data: {
//         firstname,
//         lastname,
//         email,
//         password,
//       },
//     });
//     res.status(201).send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// // Update user
// router.put("/:id", async (req, res, next) => {
//   try {
//     const { firstname, lastname, email, password } = req.body;
//     const user = await prisma.users.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         firstname,
//         lastname,
//         email,
//         password,
//       },
//     });
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;

// Import the Prisma Client
import { PrismaClient } from "@prisma/client";

// Instantiate the Prisma Client
const prisma = new PrismaClient();

// Define an async function to interact with the database
async function main() {
  // Example: Create a new Anime record
  const newAnime = await prisma.anime.create({
    data: {
      title: "Example Anime",
      description: "This is an example anime.",
      episodes: 12,
      releaseDate: new Date("2022-01-01"),
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

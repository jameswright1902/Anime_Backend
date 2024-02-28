const router = require("express").Router();
const axios = require('axios'); // Import axios for making HTTP requests
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../db/user");

const { isLoggedIn } = require("./middleware");

// get all users
router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// router.get("/user/verify-token", async (req, res, next) => {
//   const test = await getUserById("Foo");
//   res.status(401).send(test);
// });

// get user by id
router.get("/user/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

// user login
router.post("/user/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await loginUser(username, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
// user logout
router.delete("/user/logout", async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const loggedOut = await logoutUser(userId);

    if (loggedOut) {
      res.status(200).json({ message: "User successfully logged out" });
    } else {
      res.status(500).json({ error: "An error occurred during logout" });
    }
  } catch (error) {
    console.error("Error in user logout:", error);
    res.status(500).json({ error: "An error occurred during logout" });
  }
});

// register new user
router.post("/user/register", async (req, res, next) => {
  try {
    const user = await createNewUser(req);
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
});

// edit user
router.put("/user/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete("/user/:id", async (req, res, next) => {
  try {
    const user = await deleteUser(req);

    res.send("successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;







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


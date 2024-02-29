const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();
const app = express();
const PORT = 3000;
app.use(express.json());

if (require.main === module) {
app.listen(PORT, () => {
  console.log(`We are listening on port number ${PORT}`);
});
}

// app.get("/", (req, res) => {
//   res.send("My first get");
// });
app.use('/', require('./api'));



module.exports = router;

// router.get("/", async (req, res) => {
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

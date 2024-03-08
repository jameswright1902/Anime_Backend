const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Use CORS middleware with the defined options
app.use(cors());

// Other middleware setup
app.use(express.json());

// Mount routes
app.use("/", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

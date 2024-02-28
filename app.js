const express = require("express");
const app = express();
const PORT = 3000;
const userRouter = require("./routes/userRoutes");
app.listen(PORT, () => {
  console.log(`We are listening on port number ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("My first get");
});
app.use("/api", userRouter);

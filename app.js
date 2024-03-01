const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

if (require.main === module) {
app.listen(PORT, () => {
  console.log(`We are listening on port number ${PORT}`);
});
}


app.use('/', userRouter);



// module.exports = router;


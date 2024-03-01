const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/healthy", (req, res, next) => {
  res.send("OK");
});

router.use("/register", require("./register"));
router.use("/login", require("./login"));
module.exports = router;

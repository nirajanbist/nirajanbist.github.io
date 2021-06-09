const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.get("/register", (req, res) => {
  const password = "Nepal";
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      res.json({ hash });
    });
  });
});

router.post("/:id", (req, res) => {
  res.json({
    age: 34,
    play: "game",
    hd: "hi",
    query: req.query,
    dynamicPath: req.params,
    ok: req.query["ok hi"],
  });
  // res.sendFile(path.join(__dirname,'pages','home.html'))
});
router.get("/login", (req, res) => {
  const { email, pass } = req.body;
  res.json({ email, pass });
});

module.exports = router;

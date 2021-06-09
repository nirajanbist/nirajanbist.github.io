const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  bcrypt.compare(
    "Nepal",
    "$2a$10$NpWqWrmIhtMSbGmQPPKVR.kYqK7OaOB3ZuK9yxzLL0gHTqWnZZ28e",
    (err, pass) => {
      if (pass) {
        const userDetails = {
          user: "Hero",
          dob: "Jan-23",
        };
        let token = jwt.sign(userDetails, "funnysecret");

        res.json({
          response: token,
        });
      } else res.json({ error: "Some Error" });
    }
  );
});

module.exports = router;

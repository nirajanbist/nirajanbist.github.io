const router = require("express").Router();

const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
router.use("/user", userController);
router.use("/post", postController);

module.exports = router;

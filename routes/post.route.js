const express = require("express");
const router = express.Router();
const controllers = require("../controllers/post.controller");

router.get("/:id", controllers.getPost);
router.get("/", controllers.getPosts);
router.get("/profile/:id", controllers.profilePosts);
router.post("/add", controllers.addPost);
router.delete("/delete/:id", controllers.deletePost);
router.put("/update/:id", controllers.updatePost);

module.exports = router
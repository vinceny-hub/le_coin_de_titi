
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const posts = require("../controllers/post.controller");
const multer = require('../middleware/multer-config')


  // Create a new Post
  router.post("/", auth, multer, posts.create);

  // Retrieve all Posts
  router.get("/", auth, posts.findAll);

  // Retrieve all published Posts
  router.get("/published", auth, posts.findAllPublished);

  // Retrieve a single Post with id
  router.get("/:id", auth, posts.getOnePost);

  // Update a Post with id
  router.put("/:id", auth, multer, posts.updatePost);

  // Delete a Post with id
  router.delete("/:id", auth, posts.delete);

  // Delete all Posts
  router.delete("/", auth, posts.deleteAll);



module.exports = router;
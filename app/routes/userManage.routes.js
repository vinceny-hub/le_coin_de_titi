
const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const  userManageCtrl= require("../controllers/userManageCtrl");
const multer = require('../middleware/multer-config')


  // Delete an User
  router.delete("/:id", auth, userManageCtrl.delete);

  // Retrieve all Users
  router.get("/", auth,   userManageCtrl.findAll);


  // Retrieve a single User with id
  router.get("/:id", auth,  userManageCtrl.findAnUser);
 

  // Update a User with id
  router.put("/:id", auth, userManageCtrl.updateUser);



module.exports = router;
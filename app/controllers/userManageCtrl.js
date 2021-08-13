const db = require("../models/");
require('../middleware/auth')
const fs = require('fs')
const User = db.user;
const Post = db.posts;
const Op = db.Sequelize.Op;

// User.hasMany(Post);

      // FInd all users
exports.findAll = (req, res) => {
    
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };


      // Delete an user
exports.delete = (req, res) => {
    const id = req.params.id
    console.log(id)
    User.destroy({
      where: { id : id},
    
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "USER was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete USER with post=${id}. Maybe USER was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete USER with id=" + id
        });
      });
  };
      // Update an user
  exports.updateUser = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
            
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
    // Find an user
exports.findAnUser = (req, res) => {
  const username = req.params.id;

  User.findByPk(username)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + username
      });
    });
};


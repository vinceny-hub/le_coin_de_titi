const db = require("../models/");
require('../middleware/auth')
const Comment = db.comments;
const User = db.user;
const Op = db.Sequelize.Op;


exports.createComment = (req, res) => {
    // Validate request
    let id = req.body.u
    console.log(req.body)
    if (!req.body.description) {
      res.status(425).send({
        message: "Content can not be empty!"
      });
      return;
    }

    
    // Create a Comment
    const comment = {
      // post_id: req.body.post_id,
      description: req.body.description,
      userId: id,
      postId: req.body.postId,
  
    };
    console.log(req.params.id)
    // Save Comment in the database
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      });
  };
    // Find all comment in database
exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
    Comment.findAll({ where: condition, 
       include: [
      {
        model: User,
        attributes: ["username"]
     
      }
    ] 
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments."
      });
    });
};
    // Find a by id comment in database
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findOne({
    // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
    where: { id: id },
    include: [
      {
        model: User,
        attributes: ["username"],
       } ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
};
    // Update a commment 

    // const id = req.params.id;
    // if (req.body.description != null){ 
   
    // Post.update(req.body, {
    //   where: { id : id }
    // })

exports.update = (req, res) => {
  const id = req.params.id;
  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id
      });
    });
};

exports.deletePostComment = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Comment.destroy({
    where: { id : id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot Comment with id=${id}. Maybe Comment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id
      });
    });
};

    // Delete a Comment in database
  // exports.delete = (req, res) => {
  //   const post_id = req.params.id;
  //   // comment.findOne({ where: { post_id : req.params.id } })
  //   console.log(post_id)
  //   Comment.destroy({
  //     where: {post_id : post_id}
  //   })
  //     .then(num => {
  //       if (num == 1) {
  //         res.send({
  //           message: "Comment was deleted successfully!"
  //         });
  //       } else {
  //         res.send({
  //           message: `Cannot delete Comment with post=${post_id}. Maybe Comment was not found!`
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Could not delete Commment with id=" + post_id
  //       });
  //     });
  // };
    // Delete All comments in database
  exports.deleteAll = (req, res) => {
    Comment.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Comments were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Comments."
        });
      });
  };

  // Published : in progress...

  exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
  };
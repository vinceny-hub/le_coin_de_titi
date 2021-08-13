const db = require("../models/");
require('../middleware/auth')
const fs = require('fs')
const User = db.user;

const Post = db.posts;
const Op = db.Sequelize.Op;


// Post.belongsTo(User, {as: "User", foreignKey: "userId"});
// Post.belongsTo(User);

      // Create a post and save in database
exports.create = (req, res, next) => {
  console.log('/post')
  const postObject = {

      description: req.body.description,
      userId: req.body.id,
      // username:  req.body.username,
      // published: req.body.published ? req.body.published : false

    }
  delete postObject._id
  const post = new Post({
      ...postObject,

      //répertoire images
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null,
      
    
  })
      // Save in database
  post.save()
  .then(() => res.status(201).json({message: 'Post enregistré !'}))
  .catch(error => res.status(400).json({error}))
}
      // Find all posts
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

  Post.findAll({ where: condition, include: [
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
          err.message || "Some error occurred while retrieving posts."
      });
    });
};
      // Find a post
exports.getOnePost = (req, res) => {
  const id = req.params.id;

  // Post.findByPk(id)

  Post.findOne({
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
        message: "Error retrieving Post with id=" + id
      });
    });
};
      // Update a post or an image
      // Update post :
      
exports.updatePost = (req, res) => {
  const id = req.params.id;
  if (req.body.description != null){ 
 
  Post.update(req.body, {
    where: { id : id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    })
    // .then(POST => res.status(200).json({message:'sauce modifié !'}))
    .catch(error => res.status(400).json({ error }))

  }else{                    // Update image
    Post.findByPk(id)
    .then(data => {
      res.send(data)
      if(data.imageUrl){ 
      const imageUrl = data.imageUrl.split('/images/')[1];
      fs.unlink(`images/${imageUrl}`, (err) => {
        // if (err) throw err;
        console.log(`images/${imageUrl} was deleted`);
        })
      Post.update({
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename}`
        },
        { where: {id : id },
        })
        .then((message) => res.status(201).json({ message }))
        .catch((error) => res.status(500).json(error));
        };
      })

    }
  }

      // Delete a post
      // Delete image :
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
    .then(data => {
      res.send(data)
      if(data.imageUrl){ 
        const imageUrl = data.imageUrl.split('/images/')[1];
        Post.destroy({ where: { id: id }
      })
    .then(fs.unlink(`images/${imageUrl}`, (err) => {
        // if (err) throw err;
        console.log(`images/${imageUrl} was deleted`);
      }))
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
          });
        }
      })}
    else{
        // Delete a post
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Post was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
          });
        }
      })
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Post with id=" + id
    });
  })
};
      // Delete all posts
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};

    // Published : in progress...

exports.findAllPublished = (req, res) => {
  Post.findAll({ where: { published: true } })
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
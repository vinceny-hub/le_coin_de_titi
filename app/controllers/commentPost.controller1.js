// const db = require("../models/");
// require('../middleware/auth')
// const Comment = db.comments;
// const Op = db.Sequelize.Op;

// delete a commment of a post

// exports.deletePostComment = (req, res) => {
//     const id = req.params.id;
//     console.log(id)
//     Comment.destroy({
//       where: { id : id}
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Comment was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot Comment with id=${id}. Maybe Comment was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Comment with id=" + id
//         });
//       });
//   };
  

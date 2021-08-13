const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Post = db.posts
const User_Roles = db.user_roles
const Op = db.Sequelize.Op;

function setPost(req, res) {  
Post.create({
    id:5,
    description: "Oh ! Z'ai cru voir un 'rominet... (I Tawt I Taw a Puddy Tat)",
    userId: 15,
    // email: "titi@live.fr",
    // password: bcrypt.hashSync('ADMIN19760112', 8),
    // roles: ['admin', 'user']

                                      // password hashed 8 times
    // user_Id: bcrypt.hashSync(req.body.username,1),
    //  userId: User.id,
  }) 
  
//   .then(() =>{
    
//     console.log({ message: "post created successfully!" })
//   })
}


module.exports = setPost();
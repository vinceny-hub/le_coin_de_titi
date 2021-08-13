const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Post = db.posts
const User_Roles = db.user_roles
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const setAdminRole =  "admin"

function setUser(req, res) {  
       
  User.create({
    username: "titi",
    email: "titi@live.fr",
    password: bcrypt.hashSync('ADMIN19760112', 8),
    roles: ['admin', 'user']

                                      // password hashed 8 times
    // user_Id: bcrypt.hashSync(req.body.username,1),
    //  userId: User.id,
  }) 
                                      // Find Roles  
    // .then(user => {
    //   if (roles) {
        // Role.findAll({
        //   where: {
        //     name: {
        //       [Op.or]: 'admin'
        //     }
        //   }
        //                             // Set Role
        // })
        // .then(roles => {
        

             .then(user => {
                if (setAdminRole) {
                  Role.findAll({
                    where: {
                      name: 'admin'
                    //    {
                    //     [Op.or]: 'admin'
                    //   }
                    }
                                              // Set Role
                  })
                  .then(roles => {
                    user.setRoles(roles).then(() => {
                        console.log({ message: "admin, admin role and admin authorities were registered successfully!" });
                    });
                  });
                } 
                else {
                                              // user role = 1
             
                    console.log({ message: "admin was registered successfully!" });
               
                }
              })
              .catch(err => {
                console.log({ message: err.message });
              });


                   
           
            
}  

module.exports = setUser();

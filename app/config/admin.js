

const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const User_Roles = db.user_roles
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const setAdminRole =  "admin"

function setAdmin(req, res) {                                   // Save User to Database
    Role.create({
      id: 1,
      name: "user"
    });
    
    Role.create({
      id: 2,
      name: "moderator"
    });

    Role.create({
        id: '3',
        name: "admin",
      // email: "admin@live.fr",
      // password: bcrypt.hashSync('ADMIN', 8),
      roles: ['admin', 'user']
       })  

  User.create({
    username: "vince_administrator",
    email: "admin@live.fr",
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
module.exports = setAdmin();
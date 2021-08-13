// const dbConfig = require("../config/db.config.js");
const dbConfig = require("../config/config.json");

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {  // database parameters declaration 
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquizre,
//     idle: dbConfig.pool.idle
//   }
// });
const HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'us-cdbr-east-04.cleardb.com';
const USER = process.env.NODE_ENV === 'development' ? 'administrator' : 'bc01683a59f1ae';
const PASSWORD = process.env.NODE_ENV === 'development' ? 'admin' : '39e7c0e4';
const DB = process.env.NODE_ENV === 'development' ? 'database_development' : 'heroku_3b2b8dfa8d264d5';
console.log('iNDEX', HOST)
const sequelize = new Sequelize(DB, USER, PASSWORD, {  // database parameters declaration 
   host: HOST,
   dialect: "mysql",
   operatorAliases: false
  //   operatorsAliases: 0,
  
  //   pool: {
  //     max: dbConfig.pool.max,
  //     min: dbConfig.pool.min,
  //     acquire: dbConfig.pool.acquire,
  //     idle: dbConfig.pool.idle
  //   }
   });

const db = {};                    // Sequelize from db models

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);


// associate posts/users

// db.user.hasMany(db.posts, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.posts.belongsTo(db.user, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// associate comments/user

// db.user.hasMany(db.comments, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.comments.belongsTo(db.user, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// associate comments/posts

// db.posts.hasMany(db.comments, {
//   foreignKey: {
//     allowNull: false
//   }, onDelete:'CASCADE', 
// }),

db.comments.belongsTo(db.posts, {
  foreignKey: {
    allowNull: false
  }, onDelete:'CASCADE', 
}),

// db.posts.belongsTo(db.user, {as:"User", foreignKey: "userId"})

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

//  Associations






module.exports = db;
// global.sequelize = sequelize;



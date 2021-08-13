
const express = require('express') // framework node.js
const bodyParser = require('body-parser') //  JSON objects 
require('dotenv').config()
const path = require('path')   // path of files

console.log('VARIABLE ENV' , process.env.NODE_ENV);

// const dotenv = require('dotenv').config() // module whom hides connexion datas 
const helmet = require('helmet')   // helps to secure Express apps by setting various HTTP headers



const app = express()

app.use((req, res, next) => {   // headers access informations
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
    })


// protection X-XSS -activate a script filter for (XSS) on websites-
app.use(helmet())


// const db = require("./app/models/index"); // get db from models and sequelize
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   // initial();
// });


// const dblogin = require("./app/modelsUser/index");
// const Role = db.role;
// const User = db.user;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   // initial();
// });


// require("./app/config/admin")
// require("./app/config/roles")
// Role.sequelize.sync();
// initial();

// function initial() {  // Roles indexes
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
//   User.create({
//     id:1,
//     username: 'admin',
//     email: 'admin@live.fr',
//     password: "admin",
//     roles: ['admin', 'user']

//   });
//   User.create({
//     id:2,
//     username: 'moderator',
//     email: 'moderator@live.fr',
//     password: "moderator",
//     roles: ['moderator', 'user']
//   });

// }


//  POST request format to JSON
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ****

const postRoutes = require("./app/routes/post.routes"); // get route post
const commentRoutes = require("./app/routes/comment.routes") // get route comments
// const commentPostRoutes = require("./app/routes/commentPost.routes") // get route delete a comment of a post
const userManageRoutes = require("./app/routes/userManage.routes")
const { role } = require('./app/models/index')


require('./app/routes/auth.routes')(app);  // autjentification route
require('./app/routes/user.routes')(app);  // user connxion route


app.use('/images', express.static(path.join(__dirname,'images')))  // image path/ route path
app.use('/api/posts', postRoutes); // post route path
app.use('/api/user', userManageRoutes); // user modification route path
app.use('/api/comment', commentRoutes); // comment route path
// app.use('/api/comments', commentPostRoutes); // route path to delete a comment of a post

// app.use('*', express.static(path.join(__dirname,'/dist/index.html')))
// if (process.env.NODE_ENV === 'dev')
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    });
}


module.exports = app


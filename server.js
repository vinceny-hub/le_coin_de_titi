const http = require('http')//l'obtention d'un ssl https serait plus sûre
const app = require('./app')


// configuration du port de connection en fonction de l'environnement (port valide)
const normalizePort = val => {
const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
// port de connection, 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
console.log(process.env.PORT)

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
// Lancement du serveur 
const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind)
})
const db = require("./app/models/index"); // get db from models and sequelize
// require("./app/config/roles")

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');

// initial();
db.sequelize.sync().then(() => {
console.log('Drop and Resync Db');
require("./app/config/admin")
require("./app/config/titiUser") 
require("./app/config/post") 

//  }).then(()=>{
  // require("./app/config/admin")
 })
//  require("./app/config/role")
// require("./app/config/roles")
// require("./app/config/admin")




server.listen(port);

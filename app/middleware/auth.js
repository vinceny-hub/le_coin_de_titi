const jwt = require('jsonwebtoken');   
const config = require("../config/auth.config.js");         // Importation du package jsonwebtoken (authentification par token)

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
  
    console.log(token)                   // Extraction du token du header authorization
    const decodedToken = jwt.verify(token, config.secret);         // Décodage du token
    const userId = decodedToken.userId;
    console.log(decodedToken.userId)
    if (req.body.userId && req.body.userId !== userId) {          // Compare 
      throw 'Invalid user ID';
      
    } else {
      next();
    }
  } catch {
    res.status(408).json({
      error: new Error('Erreur d\'authentification')
    });
  }
};
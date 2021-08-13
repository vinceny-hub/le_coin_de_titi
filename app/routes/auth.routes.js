const { verifySignUp } = require("../middleware/index");    
const controller = require("../controllers/auth.controller");
                                                            // Authentification Routes Signin and Signup 
module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};

module.exports = (sequelize, Sequelize) => {


    const User = sequelize.define("users", {
      
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },     
      username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },   
    });

    
    return User;
  };
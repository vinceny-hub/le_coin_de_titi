'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('users', {
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
      type: Sequelize.STRING(35),
      allowNull: false,
      unique:true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
   });
  
},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('posts', {
    id:{
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    imageUrl: { 
      type: Sequelize.STRING(99),
    },
    description: {
      // allowNull: false,
      type: Sequelize.STRING(255),
      },  
      userId: {
        type: Sequelize.INTEGER(11),
      //   // references : { model : 'users', key:'id'},
      //   onDelete:'cascade',
      //   allowNull:false
      }, 
    // username: {
    //     type: Sequelize.STRING(35),
    //     allowNull: true,
    //     // unique:true
    //   },
    // userId: Sequelize.INTEGER(11),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE    
  });
  
},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('posts');
  }
};

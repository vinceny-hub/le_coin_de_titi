'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('comments', {
      id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
    // userId:{
    // allowNull: true,
    //     type: Sequelize.INTEGER(11),
    //     // references: {
    //     //   model: 'users',
    //     //   key: 'id'
    //     // }
    //     },
  
    // postId:{
    //   allowNull: true,
    //     type: Sequelize.INTEGER(11),
    //     // references: {
    //     //   model: 'posts',
    //     //   key: 'id'
    //     // }
    //     },
  
    description: {
      type: Sequelize.STRING
    },
  
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE  

  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('comments');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

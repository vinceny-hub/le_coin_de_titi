'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  queryInterface.createTable('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  
  })
},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('roles');
  }
};
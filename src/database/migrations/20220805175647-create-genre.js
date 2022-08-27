'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('genres', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('genres');
  }
};

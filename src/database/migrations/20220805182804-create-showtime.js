'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('showtimes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: 'genres'}, key: 'id'},
        allowNull: false
      },
      hall_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seats_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      datetime: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('showtimes');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('movie_genres', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: 'movies'}, key: 'id'},
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: 'genres'}, key: 'id'},
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movie_genres');
  }
};

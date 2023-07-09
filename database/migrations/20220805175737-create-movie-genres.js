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
      movieId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: { tableName: 'movies' }, key: 'id' },
      },
      genreId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: { model: { tableName: 'genres' }, key: 'id' },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movie_genres');
  },
};

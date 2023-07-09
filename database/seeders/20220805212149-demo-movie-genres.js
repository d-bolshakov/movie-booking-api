'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'movie_genres',
      [
        {
          movieId: 1,
          genreId: 1,
        },
        {
          movieId: 1,
          genreId: 2,
        },
        {
          movieId: 2,
          genreId: 2,
        },
        {
          movieId: 2,
          genreId: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movie_genres', null, {});
  },
};

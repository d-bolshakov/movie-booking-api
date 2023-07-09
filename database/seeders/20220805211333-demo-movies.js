'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'movies',
      [
        {
          title: 'Nope',
          cover: 'c803b186-47a3-4f41-ac2e-00aa257d2fe4.jpg',
          director: 'Jordan Peele',
          releaseDate: '2022-07-22',
        },
        {
          title: 'Vengeance',
          cover: 'af9c59d4-f109-40a0-a737-2c9392c2d459.jpg',
          director: 'B.J. Novak',
          releaseDate: '2022-07-2',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};

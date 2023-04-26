'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('movie_genres', [{
      movie_id: 1,
      genre_id: 1
     }, 
     {
      movie_id: 1,
      genre_id: 2
     },
     {
      movie_id: 2,
      genre_id: 2
     },  
     {
      movie_id: 2,
      genre_id: 3
     }, 
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movie_genres', null, {});
  }
};

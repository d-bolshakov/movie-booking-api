'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('genres', [{
      value: "horror",
      title: "Horror"
    },
    {
      value: "mystery",
      title: "Mystery"
    },
    {
      value: "comedy",
      title: "Comedy"
    }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  }
};

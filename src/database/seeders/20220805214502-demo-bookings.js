'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bookings', [{
      showtime_id: 1,
      user_id: 1,
      seat: 12,
      created_at: new Date()
    },
    {
      showtime_id: 6,
      user_id: 1,
      seat: 20,
      created_at: new Date()
    },
    {
      showtime_id: 4,
      user_id: 2,
      seat: 15,
      created_at: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};

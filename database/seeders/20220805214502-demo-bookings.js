'use strict';

const { truncate } = require("fs/promises");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bookings', [{
      showtime_id: 1,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 1,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 1,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 2,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 2,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 2,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 3,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 3,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 3,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },{
      showtime_id: 4,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 4,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 4,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },{
      showtime_id: 5,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 5,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 5,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },{
      showtime_id: 6,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 6,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 6,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },{
      showtime_id: 7,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 7,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 7,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },{
      showtime_id: 8,
      user_id: 1,
      seat: 12,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 8,
      user_id: 2,
      seat: 25,
      created_at: new Date(),
      paid: true
    },
    {
      showtime_id: 8,
      user_id: 2,
      seat: 26,
      created_at: new Date(),
      paid: true
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
  }
};

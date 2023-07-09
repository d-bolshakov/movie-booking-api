'use strict';

const { truncate } = require('fs/promises');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'bookings',
      [
        {
          showtimeId: 1,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 1,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 1,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 2,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 2,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 2,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 3,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 3,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 3,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 4,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 4,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 4,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 5,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 5,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 5,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 6,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 6,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 6,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 7,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 7,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 7,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 8,
          userId: 1,
          seat: 12,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 8,
          userId: 2,
          seat: 25,
          createdAt: new Date(),
          paid: true,
        },
        {
          showtimeId: 8,
          userId: 2,
          seat: 26,
          createdAt: new Date(),
          paid: true,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bookings', null, {});
  },
};

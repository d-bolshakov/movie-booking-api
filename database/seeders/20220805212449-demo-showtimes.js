'use strict';

const createDatetimes = (times, dateOffsets) => {
  const date = new Date();
  let datetimes = [];
  times.forEach((time) => {
    dateOffsets.forEach((dateOffset) => {
      let datetime = new Date(date.getTime());
      datetime.setDate(date.getDate() + dateOffset);
      datetime.setHours(time, 0, 0, 0);
      datetimes.push(datetime);
    });
  });
  return datetimes;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const times = [12, 18];
    const dateOffsets = [1, 2, 3, 4];
    const datetimes = createDatetimes(times, dateOffsets);
    await queryInterface.bulkInsert(
      'showtimes',
      [
        {
          movieId: 1,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[0],
        },
        {
          movieId: 1,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[1],
        },
        {
          movieId: 1,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[2],
        },
        {
          movieId: 1,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[3],
        },
        {
          movieId: 2,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[4],
        },
        {
          movieId: 2,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[5],
        },
        {
          movieId: 2,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[6],
        },
        {
          movieId: 2,
          hallId: 2,
          seatsCount: 40,
          datetime: datetimes[7],
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('showtimes', null, {});
  },
};

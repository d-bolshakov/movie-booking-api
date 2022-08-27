'use strict';

function createDatetimes () {
  const date = new Date();
  let datetimes = []
  const times = [12, 18]
  const dateOffsets = [10, 11, 12, 13]
  times.forEach(time => {
          dateOffsets.forEach(dateOffset => {
          let datetime = new Date(date.getTime())
          datetime.setDate(date.getDate() + dateOffset)
          datetime.setHours(time, 0, 0, 0)
          datetimes.push(datetime) 
      })
  })
  return datetimes
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const datetimes = createDatetimes();
    await queryInterface.bulkInsert('showtimes', [{
      movie_id: 1,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[0]
    }, 
    {
      movie_id: 1,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[1]
     },
     {
      movie_id: 1,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[2]
     },
     {
      movie_id: 1,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[3]
     },
     {
      movie_id: 2,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[4]
    }, 
    {
      movie_id: 2,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[5]
     },
     {
      movie_id: 2,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[6]
     },
     {
      movie_id: 2,
      hall_id: 2,
      seats_count: 40,
      datetime: datetimes[7]
     },    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('showtimes', null, {});
  }
};

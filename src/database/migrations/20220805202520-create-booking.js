'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      showtime_id: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: 'showtimes'}, key: 'id'},
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: 'users'}, key: 'id'},
        allowNull: false
      },
      seat: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};

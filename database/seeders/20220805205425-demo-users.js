'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: "User1",
      email: "user1@test.com",
      password: "$2a$04$U2Jl7hPpZOFDOu3y1PN9DuErKiyKIw3NA2VSWil4xoBzH3egz4pLm",
      role: "user"
     },
     {
      username: "User2",
      email: "user2@test.com",
      password: "$2a$04$aejevj7zqUWCduXDZYX3ruGJa9y0DCFMLYHF687XY4JSlISKoOBg6",
      role: "user"
     }, 
     {
      username: "Admin",
      email: "admin@test.com",
      password: "$2a$04$0MJg7ghAzzPrarEc8fSpq./0Mh8wgsWqx0n.fqTsR0p/sidlNqbp6",
      role: "admin"
     }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

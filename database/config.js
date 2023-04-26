const dotenv = require('dotenv')
dotenv.config({ path: `.${process.env.NODE_ENV}.env`})

module.exports = {
    development: {
       dialect: 'postgres',
       host: process.env.DB_HOST,
       port: process.env.DB_PORT,
       username: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE,
    },
    test: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    production: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
 }
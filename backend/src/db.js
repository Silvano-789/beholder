const Sequelize = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_NAME || 'beholder',
    process.env.DB_USER || 'postgres',
    process.env.DB_PWD,
    {
        dialect: process.env.DB_DIALECT || 'pg',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        logging: process.env.DB_LOGS === 'true'
    });

    module.exports = sequelize;
'use strict';
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('../src/utils/crypto');

module.exports = {
  async up(queryInterface, Sequelize) {

    const defaultEmail = 'silvano789@hotmail.com';
    const settingsId = await queryInterface.rawSelect('settings', { where: { email: defaultEmail } }, ['id']);
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: defaultEmail,
        password: bcrypt.hashSync('123456'),
        apiUrl: 'https://testnet.binance.vision/api/',
        streamUrl: 'wss://testnet.binance.vision/ws',
        accessKey: '8e6EFN0f08JIxuBbm5zyF9Uxe8n4nX0FObgOQa8Z8mh1bL5S2l9a2XGD3CM7B0Qn',
        secretKey: crypto.encrypt('E4GU3atUj5Vq44P2JEdtupBlQjfm4oZOlQcqf3ZQw28wfXR1HN15OTNkDx2D5xNk'),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {});
  }
};

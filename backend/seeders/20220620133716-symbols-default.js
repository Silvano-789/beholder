'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultSymbol = 'BTCBUSD';
    const symbol = await queryInterface.rawSelect('symbols', { where: { symbol: defaultSymbol } }, ['id']);
    if (!symbol) {
      return queryInterface.bulkInsert('symbols', [{
        symbol: defaultSymbol,
        basePrecision: 8,
        quotePrecision: 8,
        minNotional: '0.1',
        minLotSize: '0.1',
        isFavorite: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('symbols', null, {});
  }
};

const symbolModel = require('../models/symbolModel');

function getAllSymbols() {
    return symbolModel.findAll();
}

function getSymbol(symbol) {
    return symbolModel.findOne({ where: { symbol } });
}

async function updateSymbol(symbolId, newSymbol) {
    const currentSymbol = await getSymbol(symbolId);

    if (newSymbol.basePrecision && newSymbol.basePrecision !== currentSymbol.basePrecision)
        currentSymbol.basePrecision = newSymbol.basePrecision;

    if (newSymbol.quotePrecision && newSymbol.quotePrecision !== currentSymbol.quotePrecision)
        currentSymbol.quotePrecision = newSymbol.quotePrecision;

    if (newSymbol.minNotional && newSymbol.minNotional !== currentSymbol.minNotional)
        currentSymbol.minNotional = newSymbol.minNotional;

    if (newSymbol.minLotSize && newSymbol.minLotSize !== currentSymbol.minLotSize)
        currentSymbol.minLotSize = newSymbol.minLotSize;

    if (newSymbol.isFavorite !== null && newSymbol.isFavorite !== undefined
        && newSymbol.isFavorite !== currentSymbol.isFavorite)
        currentSymbol.isFavorite = newSymbol.isFavorite;

    await currentSymbol.save();
}

async function deleteAll() {
    return symbolModel.destroy({ truncate: true })
}

function bulkInsert(symbols) {
    return symbolModel.bulkCreate(symbols);
}

module.exports = {
    getAllSymbols,
    getSymbol,
    updateSymbol,
    deleteAll,
    bulkInsert
}
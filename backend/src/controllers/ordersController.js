const ordersRepository = require('../repositories/ordersRepository');
const settingsRepository = require('../repositories/settingsRepository');

/* busca ordens salvas na base de dados */
async function getOrders(req, res, next) {
    const symbol = req.params.symbol && req.params.symbol.toUpperCase();
    const page = parseInt(req.query.page);
    const orders = await ordersRepository.getOrders(symbol, page || 1);
    res.json(orders);
}

/* create de ordem e salva na base de dados */
async function placeOrder(req, res, next) {
    const id = res.locals.token.id;
    const settings = await settingsRepository.getDecryptedSettings(id);
    const exchange = require('../utils/exchange')(settings);

    const { side, symbol, quantity, price, type, options, automationId } = req.body;

    /* Chamada na BINANCE API */
    let result;
    try {
        if (side === 'BUY')
            result = await exchange.buy(symbol, quantity, price, options);
        else
            result = await exchange.sell(symbol, quantity, price, options);
    } catch (error) {
        return res.status(400).json(error.body);
    }

    const order = await ordersRepository.insertOrder({
        automationId,
        symbol,
        quantity,
        type,
        side,
        limitPrice: price,
        stopPrice: options ? options.stopPrice : null,
        iceBergQuantity: options ? options.iceBergQty : null,
        orderId: result.orderId,
        clientOrderId: result.clientOrderId,
        transactTime: result.transactTime,
        status: result.status
    })

    res.status(201).json(order.get({ plain: true }));
}

async function cancelOrder(req, res, next) {
    const id = res.locals.token.id;
    const settings = await settingsRepository.getDecryptedSettings(id);
    const exchange = require('../utils/exchange')(settings);

    const { symbol, orderId } = req.params;

    let result;
    try {
        result = await exchange.cancel(symbol, orderId);
    } catch (error) {
        return res.status(400).json(error.body);
    }

    const order = await ordersRepository.updateOrderByOrderId(result.orderId, result.origClientOrderId, {
        status: result.status
    })
    res.json(order.get({ plain: true }));

}

module.exports = {
    getOrders,
    placeOrder,
    cancelOrder
}
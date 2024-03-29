const orderModel = require('../models/orderModel')
const Sequelize = require('sequelize');

const PAGE_SIZE = 7;

/* função de paginação de resultados */
function getOrders(symbol, page = 1) {
    const options = {
        where: {},
        order: [['updatedAt', 'DESC']],
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * (page - 1)
    }

    if (symbol) {
        if (symbol.length < 6)
            options.where = { symbol: { [Sequelize.Op.like]: `%${symbol}%` } }
        else
            options.where = { symbol };
    }

    return orderModel.findAndCountAll(options);
}

function insertOrder(newOrder) {
    return orderModel.create(newOrder);
}

async function getOrderById(id) {
    return orderModel.findByPk(id);
}

async function getOrder(orderId, clientOrderId) {
    const order = await orderModel.findOne({ where: { orderId, clientOrderId } });
    return order;
}

async function updateOrderByOrderId(orderId, clientOrderId, newOrder) {
    const order = await getOrder(orderId, clientOrderId);
    //console.log('ORDEM: ',order)
    if (!order) return false;
    return updateOrder(order, newOrder);
}

async function updateOrder(currentOrder, newOrder) {
    if (newOrder.status && newOrder.status !== currentOrder.status)
        currentOrder.status = newOrder.status;

    if (newOrder.avgPrice && newOrder.avgPrice !== currentOrder.avgPrice)
        currentOrder.avgPrice = newOrder.avgPrice;

    if (newOrder.obs && newOrder.obs !== currentOrder.obs)
        currentOrder.obs = newOrder.obs;

    if (newOrder.trasactionTime && newOrder.trasactionTime !== currentOrder.trasactionTime)
        currentOrder.trasactionTime = newOrder.trasactionTime;

    if (newOrder.trasactionTime && newOrder.trasactionTime !== currentOrder.trasactionTime)
        currentOrder.trasactionTime = newOrder.trasactionTime;

    if (newOrder.commission && newOrder.commission !== currentOrder.commission)
        currentOrder.commission = newOrder.commission;

    if (newOrder.net && newOrder.net !== currentOrder.net)
        currentOrder.net = newOrder.net;

    if (newOrder.isMaker !== null && newOrder.isMaker !== undefined && newOrder.isMaker !== currentOrder.isMaker)
        currentOrder.isMaker = newOrder.isMaker;

    await currentOrder.save();

    return currentOrder;
}

module.exports = {
    insertOrder,
    getOrderById,
    getOrder,
    getOrders,
    updateOrderByOrderId
}
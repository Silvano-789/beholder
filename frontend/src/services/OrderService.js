import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const ORDERS_URL = `${API_URL}/orders/`;
const { STOP_TYPES } = require('./ExchangeService');

/* lista as ordens */
export async function getOrders(symbol, page, token) {
    const ordersUrl = `${ORDERS_URL}${symbol}?page=${page}`;
    const headers = { 'authorization': token }

    const response = await axios.get(ordersUrl, { headers });
    return response.data;
}

/* cancela uma ordem */
export async function cancelOrder(symbol, orderId, token) {
    const ordersUrl = `${ORDERS_URL}${symbol}/${orderId}`;
    const headers = { 'authorization': token }

    const response = await axios.delete(ordersUrl, { headers });
    return response.data;
}

export async function placeOrder(order, token) {

    const orderBody = {
        symbol: order.symbol.toUpperCase(),
        quantity: order.quantity,
        type: order.type.toUpperCase(),
        side: order.side.toUpperCase()
    }

    if (order.type !== 'MARKET') orderBody.price = order.price;
    else if (order.type === 'ICEBERG') orderBody.options = { icebergQty: order.icebergQty };
    else if (STOP_TYPES.indexOf(order.type !== -1)) orderBody.options = {
        stopPrice: order.stopPrice, type: order.type
    }

    const headers = { 'authorization': token }
    const response = await axios.post(ORDERS_URL, orderBody, { headers });
    return response.data;
}

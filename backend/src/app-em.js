const crypto = require('./utils/crypto');
const WebSocket = require('ws');
const ordersRepository = require('./repositories/ordersRepository');

module.exports = (settings, wss) => {

    if (!settings) throw Error(`Can´t start Exchange monitor without settings`);

    const exchange = require('./utils/exchange')(settings);

    function broadcast(jsonObject) {
        if (!wss || !wss.clients) return;
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(jsonObject))
            }
        });
    }

    /* miniTicker monitor on binance */
    exchange.miniTickerStream((markets) => {
        broadcast({ miniTicker: markets });
    });

    /* Orders book monitor on binance */
    let book = [];
    exchange.bookStream((order) => {
        if (book.length === 100) {
            broadcast({ book });
            book = [];
        }
        else book.push(order);
    });

    /* escuta a Stream de execução da Binance e faz a 
    * atualização na base de dados da api local */
    function processExecutionData(executionData) {

        if (executionData.x === 'NEW') return;
        const order = {
            symbol: executionData.s,
            orderId: executionData.i,
            clientOrderId: executionData.X === 'CANCELED' ? executionData.C : executionData.c,
            side: executionData.S,
            type: executionData.o,
            status: executionData.X,
            isMaker: executionData.m,
            transactTime: executionData.T
        }

        if (order.status === 'FILLED') {
            const quoteAmount = parseFloat(executionData.Z);
            order.avgPrice = quoteAmount / parseFloat(executionData.z);
            order.commission = executionData.n;

            // verifica tipos de comissões (quote ou base assets)
            const isQuoteCommission = executionData.N && order.symbol.endsWith(executionData.N);
            order.net = isQuoteCommission ? quoteAmount - parseFloat(order.commission) : quoteAmount;
        }

        if (order.status === 'REJECTED') order.obs = executionData.r;

        setTimeout(() => {
            ordersRepository.updateOrderByOrderId(order.orderId, order.clientOrderId, order)
                .then(order => order && broadcast({ execution: order }))
                .catch(err => console.error(err));
        }, 3000)
    }

    /* wallet balance monitor on binance */
    exchange.userDataStream(balanceData => {
        broadcast({ balance: balanceData });
    },
        executionData => {
            processExecutionData(executionData);
        }
    );

    console.log(`App Exchange Monitor server is running! `);
}
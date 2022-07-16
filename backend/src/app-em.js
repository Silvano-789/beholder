const crypto = require('./utils/crypto');
const WebSocket = require('ws');

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

    /* wallet balance monitor on binance */
    exchange.userDataStream(balanceData => {
        broadcast({ balance: balanceData });
    },
        excutionData => { console.log(excutionData) }
    );

    console.log(`App Exchange Monitor server is running! `);
}
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Menu from '../../components/Menu/Menu';
import MiniTicker from './Miniticker/Miniticker';
import BookTicker from './BookTicker/BookTicker';
import Wallet from './Wallet/Wallet';
import CandleChart from './CandleChart';
import NewOrderButton from '../../components/NewOrder/NewOrderButton';

function Dashboard() {

    const [miniTickerState, setMiniTickerState] = useState('');
    const [bookState, setBookState] = useState({});
    const [balanceState, setBalanceState] = useState({});

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
        onOpen: () => console.log(`Connected to App ws Server.`),
        onMessage: () => {
            if (lastJsonMessage) {
                if (lastJsonMessage.miniTicker) setMiniTickerState(lastJsonMessage.miniTicker);
                else if (lastJsonMessage.balance) {
                    setBalanceState(lastJsonMessage.balance);
                }
                else if (lastJsonMessage.book) {
                    lastJsonMessage.book.forEach(b => bookState[b.symbol] = b);
                    setBookState(bookState);
                }
            }
        },
        queryParams: {"token": localStorage.getItem('token')},
        onError: (err) => console.error(err),
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000,
    });

    return (
        <React.Fragment>
            <Menu />
            <main className='content'>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Dashboard</h1>
                    </div>
                    <div className='mb-4'>
                        <NewOrderButton/>
                    </div>
                </div>
                <CandleChart symbol="BTCUSDT"/>
                <div className="row">
                    <div className="col-12">
                        <MiniTicker data={miniTickerState} />
                    </div>
                </div>
                <div className='row'>
                    <BookTicker data={bookState} />
                    <Wallet data={balanceState}/>
                </div>
                
            </main>
        </React.Fragment>
    );
}

export default Dashboard;
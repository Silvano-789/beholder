import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import NewOrderButton from '../../components/NewOrder/NewOrderButton';
import SearchSymbol from '../..//components/SearchSymbol/SearchSymbol';
import NewOrderModal from '../../components/NewOrder/NewOrderModal';
import { getBalance } from '../../services/ExchangeService';
import { getOrders } from '../../services/OrderService';
import OrderRow from './OrderRow';
import OrderPagination from './OrdersPagination';
import ViewOrderModal from './ViewOrderModal';
import WalletButton from '../Dashboard/Wallet/WalletButton';
import WalletModal from '../Dashboard/Wallet/WalletModal';

function Orders() {

    const defaultLocation = useLocation();

    /* function to get the url page */
    function getPage(location) {
        if (!location) location = defaultLocation;
        return new URLSearchParams(location.search).get('page');
    }

    const history = useHistory();
    /* useEffect to change the page useState */
    useEffect(() => {
        return history.listen((location) => {
            setPage(getPage(location));
        })
    }, [history]);

    const { symbol } = useParams();
    const [viewOrder, setViewOrder] = useState({});
    const [search, setSearch] = useState(symbol ? symbol : '');

    /* hooks section */
    const [balances, setBalances] = useState({});
    const [orders, setOrders] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(getPage());

    function errorProcedure(err) {
        if (err.response && err.response.status === 401) return history.push('/');
        console.error(err);
    }

    /* loading the wallet balance to open manual orders */
    function getBalanceCall(token) {
        getBalance(token)
            .then(info => {
                const balances = Object.entries(info).map(item => {
                    return {
                        symbol: item[0],
                        available: item[1].available,
                        onOrder: item[1].onOrder
                    }
                })
                setBalances(balances);
            })
            .catch(err => errorProcedure(err));
    }

    /* loading all orders data from data base to show on table screen */
    function getOrdersCall(token) {
        getOrders(search, page || 1, token)
            .then(result => {
                setOrders(result.rows);
                setCount(result.count);
            })
            .catch(err => errorProcedure(err));
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        getBalanceCall(token);
        getOrdersCall(token);
    }, [page, search]);

    function onOrderSubmit(order) {
        history.go(0);
    }

    function onSearchChange(event) {
        setSearch(event.target.value);
    }

    function onViewClick(event){
        const id = parseInt(event.target.id.replace('view', ''));
        setViewOrder(orders.find(f => f.id === id));
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h2 className="h4">Ordens</h2>
                    </div>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="d-inline-flex align-items-center">
                            <NewOrderButton />
                        </div>
                        <div className="btn-group ms-2 ms-lg-3">
                            <WalletButton />
                        </div>
                        <div className="btn-group ms-2 ms-lg-3">
                            <SearchSymbol placeholder="Pesquisar Simbolo" onChange={onSearchChange} />
                        </div>
                    </div>
                </div>
                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Simbolo</th>
                                <th className="border-gray-200">Data Criação</th>
                                <th className="border-gray-200">Tipo</th>
                                <th className="border-gray-200">Quantidade</th>
                                <th className="border-gray-200">Preço Unt.</th>
                                <th className="border-gray-200">Valor Liquido</th>
                                <th className="border-gray-200">Status</th>
                                <th className="border-gray-200">Detalhes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders && orders.length
                                    ? orders.map(order => (
                                        <OrderRow key={order.clientOrderId} data={order} onClick={onViewClick}/>
                                    ))
                                    : <React.Fragment></React.Fragment>
                            }
                        </tbody>
                    </table>
                    <OrderPagination count={count} />
                </div>
            </main>
            <ViewOrderModal data={viewOrder}/>
            <WalletModal/>
            <NewOrderModal wallet={balances} onSubmit={onOrderSubmit} />
        </React.Fragment>
    );
}

export default Orders;
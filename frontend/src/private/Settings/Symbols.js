import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getSymbols, syncSymbols } from "../../services/SymbolsService";
import SymbolRow from './SymbolRow';
import SelectQuote, { getDefaultQuote, filterSymbolObjects, setDefaultQuote } from '../../components/SelectQuote/SelectQuote';
import SymbolModal from "./SymbolModal";

function Symbols() {

    const history = useHistory();
    const [symbols, setSymbols] = useState([]);
    const [error, setError] = useState('');
    const [quote, setQuote] = useState(getDefaultQuote());
    const [success, setSuccess] = useState('');
    const [isSyncing, setisSyncing] = useState(false);
    const [editSymbol, setEditSymbol] = useState({
        symbol: '',
        basePrecision: '',
        quotePrecision: '',
        minNotional: '',
        minLotSize: ''
    });

    function loadSymbols() {
        const token = localStorage.getItem('token');
        getSymbols(token)
            .then(symbols => {
                setSymbols(filterSymbolObjects(symbols, quote));
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    history.push('/');
                console.error(err.message);
                setError(err.message);
                setSuccess('');
            })
    }

    /* sync symbol from binance exchange */
    function onSyncClick(event) {
        const token = localStorage.getItem("token");
        setisSyncing(true);
        syncSymbols(token)
            .then(response => {
                setisSyncing(false);
                if (!isSyncing) {
                    setSuccess('Moedas sincronizadas com sucesso.');
                    setError('');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    console.error(err.message);
                setError(err.message);
                setSuccess('');
                setisSyncing(false);
            });
    }

    function onQuoteChange(event) {
        setQuote(event.target.value);
        setDefaultQuote(event.target.value);
    }

    /* set a object to edit a symbol */
    function onEditSymbol(event) {
        const symbol = event.target.id.replace('edit', '');
        const symbolObj = symbols.find(s => s.symbol === symbol);
        setEditSymbol(symbolObj);
    }

    function onModalSubmit(event) {
        loadSymbols();
    }

    useEffect(() => {
        loadSymbols();
    }, [isSyncing, quote]);

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12">
                    <div className="col-12 mb-4">
                        <div className="card border-0 shadow">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h2 className="fs-5 fw-bold mb-0">Simbolos</h2>
                                    </div>
                                    <div className="col">
                                        <SelectQuote onChange={onQuoteChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="border-bottom" scope="col">Simbolo</th>
                                            <th className="border-bottom" scope="col">Base Prec</th>
                                            <th className="border-bottom" scope="col">Quote Prec</th>
                                            <th className="border-bottom" scope="col">Min Notional</th>
                                            <th className="border-bottom" scope="col">Min Lot Size</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {symbols.map(item => <SymbolRow key={item.symbol} data={item} onClick={onEditSymbol} />)}
                                    </tbody>
                                </table>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary animate-up-2" type="button" onClick={onSyncClick}>
                                                    <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                    {isSyncing ? "Sincronizando..." : "Sincronizar"}
                                                </button>
                                            </div>
                                            {
                                                error
                                                    ? <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>
                                                    : <React.Fragment></React.Fragment>
                                            }
                                            {
                                                success
                                                    ? <div className="alert alert-success mt-2 col-9 py-2">{success}</div>
                                                    : <React.Fragment></React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SymbolModal data={editSymbol} onSubmit={onModalSubmit} />
        </React.Fragment>
    );

}

export default Symbols;
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getSymbols, syncSymbols } from "../../services/SymbolsService";
import SymbolRow from './SymbolRow';
import SelectQuote from '../../components/SelectQuote/SelectQuote';

function Symbols() {

    const history = useHistory();
    const [symbols, setSymbols] = useState([]);
    const [error, setError] = useState('');
    const [quote, setQuote] = useState('USDT');
    const [success, setSuccess] = useState('');
    const [isSyncing, setisSyncing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSymbols(token)
            .then(symbols => {
                setSymbols(symbols);
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    history.push('/');
                console.error(err.message);
                setError(err.message);
                setSuccess('');
            })
    }, [isSyncing])

    function onSyncClick(event) {
        const token = localStorage.getItem("token");
        setisSyncing(true);
        syncSymbols(token)
            .then(response => setisSyncing(false))
            .catch(err => {
                if (err.response && err.response.status === 401)
                    console.error(err.message);
                setError(err.message);
                setSuccess('');
                setisSyncing(false);
            });
    }

    function onQuoteChange(event) {
        
    }

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
                                        <SelectQuote onChange={onQuoteChange}/>
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
                                        {symbols.map(item => <SymbolRow key={item.symbol} data={item} />)}
                                    </tbody>
                                </table>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col">
                                            <button className="btn btn-primary animate-up-2" type="button" onClick={onSyncClick}>
                                                <svg className="icon icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                {isSyncing ? "Sincronizando moedas da corretora..." : "Sincronizado"}
                                            </button>
                                        </div>
                                        <div className="col">
                                            {error ? <div className="alert alert-danger">{error}</div> : <React.Fragment></React.Fragment>}
                                            {success ? <div className="alert alert-success">{success}</div> : <React.Fragment></React.Fragment>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Symbols;
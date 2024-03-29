import React, { useState, useEffect } from "react";
import SelectQuote, {filterSymbolsNames, getDefaultQuote} from "../../../components/SelectQuote/SelectQuote";
import TickerRow from "./TickerRow";
import { getSymbols } from '../../../services/SymbolsService';
import { useHistory } from 'react-router-dom';
import '../Dashboard.css';

/**
 *   props
 * - data
 */
function MiniTicker(props) {

    const history = useHistory();

    const [symbols, setSymbols] = useState([]);
    const [quote, setQuote] = useState(getDefaultQuote());

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSymbols(token)
            .then(symbols => setSymbols(filterSymbolsNames(symbols, quote)) )
            .catch(err => {
                if (err.response && err.response.status === 401)
                    return history.push('/');
                    console.error(err);
            })
    }, [quote]);

    if (!props || !props.data) return (<React.Fragment></React.Fragment>);

    function onQuoteChange(event) {
        setQuote(event.target.value);
    }

    return (
        <div className="col-12 mb-4">
            <div className="card border-0 shadow">
                <div className="card-header">
                    <div className="row">
                        <div className="col">
                            <h2 className="fs-5 fw-bold mb-0"> Mercado 24h</h2>
                        </div>
                        <div className="col offset-md-3">
                            <SelectQuote onChange={onQuoteChange} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive divScroll">
                    <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                        <thead className="thead-light">
                            <th className="border-botton" scope="col">Simbolo</th>
                            <th className="border-botton col-2" scope="col">Fechamento</th>
                            <th className="border-botton col-2" scope="col">Abertura</th>
                            <th className="border-botton col-2" scope="col">Alta</th>
                            <th className="border-botton col-2" scope="col">Baixa</th>
                        </thead>
                        <tbody>
                            {
                               symbols.map(item => (
                                <TickerRow key={item} symbol={item} data={props.data[item]}/>
                               ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MiniTicker;
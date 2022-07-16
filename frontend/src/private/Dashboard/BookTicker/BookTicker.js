import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSymbols } from '../../../services/SymbolsService';
import SelectQuote, { filterSymbolsNames, getDefaultQuote } from "../../../components/SelectQuote/SelectQuote";
import '../Dashboard.css';
import BookRow from "./BookRow";

/**
 * props
 * - data
 */
function BookTicker(props) {

    const history = useHistory();

    const [symbols, setSymbols] = useState([]);
    const [quote, setQuote] = useState(getDefaultQuote());

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSymbols(token)
            .then(symbols => setSymbols(filterSymbolsNames(symbols, quote)))
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
        <React.Fragment>
            <div className="col-sm-12 col-md-6 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h2 className="fs-5 fw-bold mb-0"> Livro de Ordens</h2>
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
                                <th className="border-botton col-2" scope="col">BID</th>
                                <th className="border-botton col-2" scope="col">ASK</th>
                            </thead>
                            <tbody>
                                {
                                    Array.isArray(symbols) && symbols.map(item => (
                                        <BookRow key={item} symbol={item} data={props.data[item]} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default BookTicker;
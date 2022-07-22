import React, { useState, useEffect } from "react";
import { getBalance } from '../../../services/ExchangeService';
import { useHistory } from 'react-router-dom';
import '../Dashboard.css';

/**
 *   props
 * - data
 * - onUpdate
 * Componente de carteira buscando saldo no backend, que busca na binance.
 */
function Wallet(props) {

    const history = useHistory();
  
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        getBalance(token)
            .then(info => {
             const balances = Object.entries(info).map(item => {
                 return {
                    symbol: item[0],
                    available: item[1].available,
                    onOrder: item[1].onOrder
                 }
               })
               /* manda informações da carteira para ser usadas na order*/
               if(props.onUpdate) props.onUpdate(balances);
               
                setBalances(balances);
            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    return history.push('/');
                    console.error(err);
            })
    }, [props.data]);

    if (!props || !props.data) return (<React.Fragment></React.Fragment>);

    return (
        <React.Fragment>
            <div className="col-sm-12 col-md-6 mb-4">
                <div className="card border-0 shadow">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h2 className="fs-5 fw-bold mb-0">Sua Carteira</h2>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive divScroll">
                        <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
                            <thead className="thead-light">
                                <th className="border-botton" scope="col">Simbolo</th>
                                <th className="border-botton col-2" scope="col">Disponível</th>
                                <th className="border-botton col-2" scope="col">Em Ordens</th>
                            </thead>
                            <tbody>
                                {
                                    balances.map(item => (
                                        <tr key={`wallet${item.symbol}`}>
                                            <td className="text-gray-900">{item.symbol}</td>
                                            <td className="text-gray-900">{item.available}</td>
                                            <td className="text-gray-900">{item.onOrder}</td>
                                        </tr>
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
export default Wallet;
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../public/login/Footer';

/**
 * 
 * props 
 * - data 
 * - onCancel 
 */
function ViewOrderModal(props) {

    console.log(props.data);

    const btnClose = useRef();
    const btnCancel = useRef();
    const [error, setError] = useState('');
    const [order, setOrder] = useState({
        symbol: ''
    });

    useEffect(() => {
        if (props.data) {
            setOrder(props.data);
        }
    }, [props.data]);

    function getStatusClass(status) {
        let className;
        let translateName;
        switch (status) {
            case 'PARTIALLY_FILLED': className = "badge bg-warning py-1"; translateName = 'Não Encerrada'; break;
            case 'FILLED': className = "badge bg-info py-1"; translateName = 'Fechada'; break;
            case 'REJECTED': translateName = 'Rejeitada';
            case 'EXPIRED': translateName = 'Expirada';
            case 'CANCELED': className = "badge bg-danger py-1"; translateName = 'Cancelada'; break;
            default: className = "badge bg-success py-1"; translateName = 'Aberta'; break;
        }
        return (<span className={className}>{status = translateName}</span>);
    }

    function sideTranslate(side) {
        if (side === 'BUY')
            return (<b className='text-success'>Compra</b>);
        else
            return (<b className='text-danger'>Venda</b>)
    }

    function sideView(side) {
        if (side === 'BUY')
            return (<b>Compra</b>);
        else
            return (<b>Venda</b>);
    }

    function getDate(timestamp) {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const frmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
        return frmt;
    }

    function onCancelClick(event){
        console.log(event);
    }

    return (
        <div className="modal fade" id="modalViewOrder" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="title">Informações da Ordem</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>
                    <form>
                        <div className="modal-body">
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <b>Simbolo:</b> {order.symbol}
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        {getStatusClass(order.status)}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <b>Nosso Nº:</b> {order.id}
                                    </div>
                                    {
                                        order.automationId
                                            ? (
                                                <div className='col-md-6 mb-3'>
                                                    <b>Id de Automação:</b> {order.automationId}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 mb-3'>
                                        <b>Binance Nº:</b> {order.orderId} / {order.clientOrderId}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <b>V/C:</b> {sideTranslate(order.side)}
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <b>Tipo:</b> {order.type}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <b>Quantidade:</b> {order.quantity}
                                    </div>
                                    <div className='col-md-6 mb-3'>
                                        <b>Preço {sideView(order.side)}:</b> ${order.limitPrice}
                                    </div>
                                </div>

                                <div className='row'>
                                    {
                                        order.stopPrice
                                            ? (
                                                <div className='col-md-6 mb-3'>
                                                    <b>Preço de Stop:</b> {order.stopPrice}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                    {
                                        order.icerBergQuantity
                                            ? (
                                                <div className='col-md-6 mb-3'>
                                                    <b>Quantidade IceBerg:</b> {order.icerBergQuantity}
                                                </div>
                                            )
                                            : <React.Fragment></React.Fragment>
                                    }
                                    {
                                        order.avgPrice
                                            ?
                                            <div className='col-md-6 mb-3'>
                                                <b>Preço médio:</b> {`${order.avgPrice}`.substring(0, 9)}
                                            </div>
                                            :
                                            <div className='col-md-6 mb-3'>
                                                <b>Preço médio:</b> $0,00
                                            </div>
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 mb-3'>
                                        <b>Data de Transação:</b> {getDate(order.transactTime)}
                                    </div>
                                </div>
                                <div className='row'>
                                    {
                                        order.avgPrice
                                            ?
                                            <div className='col-md-6 mb-3'>
                                                <b>Comissão:</b> {`${order.commission}`.substring(0, 9)}
                                            </div>
                                            :
                                            <div className='col-md-6 mb-3'>
                                                <b>Comissão:</b> $0,00
                                            </div>
                                    }
                                    {
                                        order.avgPrice
                                            ?
                                            <div className='col-md-6 mb-3'>
                                                <b>Valor Liq:</b> <b className='vlrLiqui'>{`${order.net}`.substring(0, 9)}</b>
                                            </div>
                                            :
                                            <div className='col-md-6 mb-3'>
                                                <b>Valor Liq:</b> $0,00
                                            </div>
                                    }
                                </div>
                                {
                                    order.obs
                                        ? (
                                            <div className="row">
                                                <div className="col-12 mb-3">
                                                    <b>Obs:</b> {order.obs}
                                                </div>
                                            </div>
                                        )
                                        : <React.Fragment></React.Fragment>
                                }
                            </div>
                        </div>
                    </form>
                    <div className="modal-footer">
                            {
                                error ?
                                    <div className="alert alert-danger mt-1 col-9 py-1">{error}</div>
                                    : <React.Fragment></React.Fragment>
                            }
                            <button ref={btnCancel} type="button" className="btn btn-sm btn-danger button-modal" onClick={onCancelClick}>
                                <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" onClick={onCancelClick}>
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>Cancelar Ordem</button>
                        </div>
                        <div className="modal-footer"></div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ViewOrderModal;
import React from 'react';

/**
 * 
 * props:
 * - data
 * - onClick
 */
function OrderRow(props) {

    function getDate(timestamp) {
        const date = new Date(timestamp);
        const frm = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
        return frm;
    }

    /* function to changes the lines style based on status, 
    * and translate to portuguese all the binance orders status 
    */
    function getStatus(status) {
        let className;
        let translateName;
        switch (status) {
            case 'PARTIALLY_FILLED': className = "badge bg-warning py-1"; translateName = 'Não Encerrada' ; break;
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

    return (
        <tr>
            <td>
                {props.data.symbol}
            </td>
            <td><span className="fw-normal">{getDate(props.data.transactTime)}</span></td>
            <td><span className="fw-normal">{sideTranslate(props.data.side)}</span></td>
            <td><span className="fw-normal">{props.data.quantity}</span></td>
            <td><span className="fw-normal">{props.data.avgPrice ? `$${props.data.avgPrice}`.substring(0, 9) : ''}</span></td>
            <td><span className="fw-bold">{props.data.net ? `$${props.data.net}`.substring(0, 10) : ''}</span></td>
            <td>{getStatus(props.data.status)}</td>
            <td>
                <button id={"view" + props.data.id} type="button" className="btn btn-info btn-xs" data-bs-toggle="modal" data-bs-target="#modalViewOrder" onClick={props.onClick}>
                    <svg className="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default OrderRow;
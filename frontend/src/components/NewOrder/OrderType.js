import React, { useMemo } from 'react';

/**
 * 
 * props 
 * - type
 * - onChange 
 */
function OrderType(props) {
    const orderType = useMemo(() => (
        <div className='form-group'>
            <label htmlFor='type'>Tipo de Ordem</label>
            <select id='type' className='form-select' defaultValue={props.type} onChange={props.onChange}>
                <option value="LIMIT">Limit</option>
                <option value="ICEBERG">Iceberg</option>
                <option value="MARKET">Market</option>
                <option value="STOP_LOSS">Stop Loss</option>
                <option value="STOP_LOSS_LIMIT">Stop Loss Limit</option>
                <option value="TAKE_PROFIT">Take Profit</option>
                <option value="TAKE_PROFIT_LIMIT">Take Profit Limit</option>
            </select>
        </div>
    ), [props.type])

    return orderType;
}

export default OrderType;
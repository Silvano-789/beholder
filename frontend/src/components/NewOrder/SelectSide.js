import React, {useMemo} from 'react';

/**
 * 
 * props 
 * - side
 * - onChange 
 */
function SelectSide(props) {

    const selectSide = useMemo(() => (
        <div className='form-group'>
            <label htmlFor='side'>Ordem</label>
            <select id='side' className='form-select' defaultValue={props.side} onChange={props.onChange}>
                <option value='BUY'>Compra</option>
                <option value='SELL'>Venda</option>
            </select>
        </div>
    ), [props.side])

    return selectSide;
}

export default SelectSide;
import React, { useEffect, useState } from "react";

/**
 * 
 *  props 
 * - onChange
 */
function SelectQuote(props) {

    const [defaultQuote, setDefaultQuote] = useState(getDefaultQuote());


    return (
        <select id="selectQuote" className="form-select" defaultValue={defaultQuote} onChange={props.onChange}>
            <option value="FAVORITE">FAVORITAS</option>
            <option value="BNB">BNB</option>
            <option value="BRL">BRL</option>
            <option value="BTC">BTC</option>
            <option value="USD">USD</option>
            <option value="USDT">USDT</option>
        </select>
    )
}

export function getDefaultQuote(){
    return localStorage.getItem('defaultQuote') ? localStorage.getItem('defaultQuote') : "USDT";
}

export default SelectQuote;
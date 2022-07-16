import React from "react";

/**
 * props.data:
 * - symbol
 * - basePrecision
 * - quotePrecision
 * - minNotional 
 * - minLotSize
 * - isFavorite
 * - onClick
 */
function SymbolRow(props) {
    return (
        <tr>
            <td className="text-gray-900">
                {props.data.symbol}
                {props.data.isFavorite ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-xs" fill="yellow" viewBox="0 0 24 24" stroke="orange" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    : <React.Fragment></React.Fragment>}
            </td>
            <td className="text-gray-900">
                {props.data.basePrecision}
            </td>
            <td className="text-gray-900">
                {props.data.quotePrecision}
            </td>
            <td className="text-gray-900">
                {props.data.minNotional}
            </td>
            <td className="text-gray-900">
                {props.data.minLotSize}
            </td>
            <td>
                <button id={"edit" + props.data.symbol} className="btn btn-secondary animate-up-2" with={32} data-bs-toggle="modal" data-bs-target="#modalSymbol" onClick={props.onClick}>
                    <svg id={"edit" + props.data.symbol} className="icon icon-xs" fill="none" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}  onClick={props.onClick}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default SymbolRow;
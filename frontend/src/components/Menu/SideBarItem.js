import React from "react";
import { Link } from "react-router-dom";

/**
 * 
 * props 
 * - to: endereço do link
 * - text: texto do item 
 * - onClick: callBack de click (quando necessario).
 * - children: tag SVG
 */
function SideBarItem(props) {

    function getClassName(itemName) {
        return window.location.pathname === itemName ? 'nav-item active' : 'nav-item';
    }

    return (
        <li className={getClassName(props.to)}>
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                <span>
                    <span className="sidebar-icon">
                        {props.children}
                    </span>
                </span>
                <span className="sidebar-text">{props.text}</span>
            </Link>
        </li>
    );
}

export default SideBarItem;
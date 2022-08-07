import React from "react";

function Footer() {
    const year = process.env.REACT_APP_YEAR;
    return (
        <div className="content-footer">
            <small><b>Powered by </b></small>
            <small><b className="name">Niu Soluções</b></small>
            <small> - {year}</small>
        </div>
    );
}

export default Footer;
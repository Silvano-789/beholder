import React from "react";
import Footer from "../../../public/login/Footer";
import Wallet from "./Wallet";

function WalletModal() {

    return (
        <div className="modal fade" id="modalWallet" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="title">Minha Carteira</p>
                        <Wallet/>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default WalletModal;
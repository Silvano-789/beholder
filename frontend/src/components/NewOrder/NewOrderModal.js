import React,{useRef} from 'react';

function NewOrderModal() {

    const bntClose = useRef();

    return (
        <div className="modal fade" id="modalOrder" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title" id="modalTitleNotify">Nova Ordem</p>
                        <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
                    </div>

                    <div className="modal-body">
                    </div>
                    
                    <div className="modal-footer">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewOrderModal;
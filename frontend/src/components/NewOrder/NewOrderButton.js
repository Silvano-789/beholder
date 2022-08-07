import React from 'react';

function NewOrderButton() {
    return (
        <button id="btnNewOrder" className="btn btn-primary animate-up-2" data-bs-toggle="modal" data-bs-target="#modalOrder">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-xs me-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nova Ordem
        </button>
    );
}
export default NewOrderButton;
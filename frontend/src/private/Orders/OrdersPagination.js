import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PAGE_SIZE = 7;
/**
 * 
 * props 
 * - count
 */
function OrderPagination(props) {

    /* função para paginação de resultados */
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const pagesQty = Math.ceil(props.count / PAGE_SIZE);
    const pages = [];
    for (let i = 1; i <= pagesQty; i++) {
        pages.push(i);
    }

    /* função para aplicar css na pagina atual da paginação */
    function getPageClass(page){
        const queryPage = query.get('page');
        const isActive = queryPage == page || (!queryPage && page === 1);
        return isActive ? "page-item active" : "page-item";
    }
  
    /* função que retorna a url da pagina com a page 
     * concatenada, para redirecionamento */
    function getPageLink(page){
        return `${window.location.pathname}?page=${page}`;
    }

    return (
        <div className="card-footer px-3 border-0 d-flex flex-column flex-lg-row align-items-center justify-content-between">
            <nav aria-label="Page navigation">
                <ul className="pagination mb-0">
                    {
                        pages.map(p => (
                            <li key={p} className={getPageClass(p)}>
                                <Link className='page-link' to={getPageLink(p)}>{p}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className='fw-normal small mt-4 mt-lg-0'>
                <b>
                    {props.count} resultados.
                </b>
            </div>
        </div>
    );
}

export default OrderPagination;
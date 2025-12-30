import React from 'react';

interface Props {
    currentPage: number;
    total: number;
    totalPage: number;
    totalElement: number
    onChangePage: (page: number) => void;
}

const CustomPagination = ({ currentPage, total, totalElement, totalPage, onChangePage }: Props) => {
    const isLastPage = currentPage * totalElement >= total;


    const handleClickPage = (page: number) => {
        if (page !== currentPage) {
            onChangePage(page);
        }
    };

    const handlePreviousPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (currentPage !== 1) {
            onChangePage(currentPage - 1);
        }
    };
    const handleNextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!isLastPage) {
            onChangePage(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages: number[] = [];

        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }

        return pages.map((page) => (
            <li key={page} className={page === currentPage ? 'active' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleClickPage(page); }}>
                    {page}
                </a>
            </li>
        ));
    };

    return (
        <div className="ps-pagination">
            <ul className="pagination">
                {
                    currentPage !== 1
                }
                <li>
                    <a onClick={(e) => handlePreviousPage(e)}>
                        <i className="icon-chevron-left"></i> Trước
                    </a>
                </li>
                {renderPageNumbers()}
                <li>
                    <a onClick={(e) => handleNextPage(e)}>
                        Sau <i className="icon-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPagination;

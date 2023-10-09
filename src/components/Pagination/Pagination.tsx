import React, { FC } from 'react';
import { Updater } from '@tanstack/react-table';
//UI
import classes from './Pagination.module.css'


interface IPaginationProps {
    pageSize: number,
    setPageSize: (updater: Updater<number>) => void,
    pageIndex: number,
    totalCount: number | undefined,
    previousPage: () => void,
    nextPage: () => void,
    getCanPreviousPage: () => boolean,
    getCanNextPage: () => boolean,
    getPageCount: () => number
}

const Pagination: FC<IPaginationProps> = ({ pageSize, pageIndex, totalCount, setPageSize, nextPage, previousPage, getCanPreviousPage, getCanNextPage, getPageCount }) => {

    const pageCount = getPageCount();
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? totalCount : (pageIndex + 1) * pageSize;
    return (
        <div className={classes.pagination}>
            <div className={classes.selector}>
                <span>Rows per page: </span>
                <select
                    value={pageSize}
                    className={classes.select}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[4, 6, 8, 16, 24].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <span className={classes.counter}>
                {`${startIndex} - ${endIndex}`} of{' '}
                {totalCount}
            </span>
            <div className={classes.nav}>
                <button
                    className={classes.btn}
                    onClick={() => previousPage()}
                    disabled={!getCanPreviousPage()}
                >
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <button
                    className={classes.btn}
                    onClick={() => nextPage()}
                    disabled={!getCanNextPage()}
                >
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Pagination;
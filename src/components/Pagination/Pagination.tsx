import React, {ChangeEvent, MouseEvent} from 'react';
//UI
import classes from './Pagination.module.css'

interface IPaginationProps{
    rowsPerPage: number,
    setRowsPerPage: (ctx: number) => void,
    lastAction: number,
    firstAction: number,
    totalActions: number,
    page: number,
    setPage: (ctx: number) => void
}

const Pagination = ({rowsPerPage, setRowsPerPage, lastAction, firstAction, totalActions, page, setPage}: IPaginationProps) => {

    const setRowsPerPageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(+e.target.value)
    } 
    const updatePage = (e: MouseEvent<HTMLButtonElement>, option: 'prev' | 'next') => {
        if(option === 'next') setPage(page + 1)
        else setPage(page - 1)
    }

    return (
        <div className={classes.inner}>
            <div className={classes.selector}>
                <span>Rows per page: </span>
                <select 
                defaultValue={'6'}
                className={classes.select} 
                name="rowsPerPage"
                onChange={setRowsPerPageHandler}>
                    <option value={4}>4</option>
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={24}>24</option>
                </select>
            </div>
            <div className={classes.counter}>
                <span>{firstAction}-{lastAction}</span>
                <span> of {totalActions}</span>
            </div>
            <div className={classes.nav}>
                <button
                    disabled={page === 1}
                    onClick={e => updatePage(e, 'prev')}
                    type="submit"
                    className={classes.btn + ' ' + classes.previous}
                >
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <button
                    disabled={lastAction === totalActions}
                    onClick={e => updatePage(e, 'next')}
                    type="submit"
                    className={classes.btn + ' ' + classes.next}
                >
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </div>

        </div>
    );
};

export default Pagination;
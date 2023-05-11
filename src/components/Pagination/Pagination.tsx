import React from 'react';
//UI
import classes from './Pagination.module.css'
const Pagination = () => {
    return (
        <div className={classes.inner}>
            <div className={classes.selector}>
                <span>Rows per page: </span>
                <select className={classes.select} name="select">
                    <option value="1">1</option>
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <div className={classes.counter}>
                <span>1-8</span>
                <span> of 1240</span>
            </div>
            <div className={classes.nav}>
                <button
                    type="submit"
                    className={classes.btn + ' ' + classes.previous}
                >
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <button
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
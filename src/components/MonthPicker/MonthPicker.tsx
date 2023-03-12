import React from 'react';
import classes from './MonthPicker.module.css'
import arrow from '../../assets/arrow.svg'


const MonthPicker = () => {
    return (
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button type="submit" className={classes.btn + ' ' + classes.previous}>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <h4 className={classes.title}>February 23</h4>
                <button type="submit" className={classes.btn + ' ' + classes.next}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
            
        </div>
    );
};

export default MonthPicker;
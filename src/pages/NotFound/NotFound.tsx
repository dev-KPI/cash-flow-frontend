import React from "react";
import { Link } from "react-router-dom";
//UI
import classes from './NotFound.module.css';
import robot from '@assets/404Robot.png';

const NotFound = () => {
    return (<>
        <div className={classes.NotFound}>
            <img className={classes.robot} width="300px" src={robot} alt="Robot" />
            <div className={classes.rightSide}>
                <h5 className={classes.title}>Oops... Page not found!</h5>
                <Link to={'/dashboard'}>
                    <p className={classes.backBtn}>Back to homepage</p>
                </Link>
            </div>
        </div>
    </>)
}

export default NotFound
import React, { FC } from 'react';

//UI
import classes from './ToggleButton.module.css';

interface ToggleButtonProps {
    isToggle: boolean;
    onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ToggleButton:FC<ToggleButtonProps> = ({isToggle, onToggle}) => {
    return (
        <label className={classes.switch}>
            <input type='checkbox' className={classes.checkbox} checked={isToggle} onChange={onToggle} />
            <span className={classes.slider} />
        </label>
    );
};

export default ToggleButton;


export const ToggleCurrencyButton: FC<ToggleButtonProps> = ({ isToggle, onToggle }) => {
    return (
        <label className={classes.toggleArrow}>
            <input type='checkbox' className={classes.checkbox} checked={isToggle} onChange={onToggle} />
            <div>
                <span className={!isToggle ? classes.active : ''}>UAH</span>
                <i className="bi bi-arrow-left-right"></i>
                <span className={isToggle ? classes.active : ''}>USD</span>
            </div>
        </label>
    );
};

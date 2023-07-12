import React, { FC } from 'react';

//UI
import classes from './ToggleButton.module.css';

interface ToggleButtonProps {
    isToggle: boolean;
    onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const ToggleButton:FC<ToggleButtonProps> = ({isToggle, onToggle}) => {
    return (
        <label className={classes.switch}>
            <input type='checkbox' className={classes.checkbox} checked={isToggle} onChange={onToggle} />
            <span className={classes.slider}/>
        </label>
    );
};

export default ToggleButton;
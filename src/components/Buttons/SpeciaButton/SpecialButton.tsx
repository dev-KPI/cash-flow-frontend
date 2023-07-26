import { FC } from 'react';

//UI
import classes from './SpecialButton.module.css'

interface IButtonProps {
    handleClick: () => void;
    type: 'add' |'view'
    className?: string;
}
const SpecialButton: FC<IButtonProps> = ({ handleClick, type, className }) => {
    const buttonText = type === 'add' ? 'Add More' : 'View More';
    const icon = type === 'add' ? 'bi bi-plus-lg' : 'bi bi-chevron-right';

    return (
        <li
            className={`${classes.item} ${className ? className : ''}`} onClick={handleClick}>
            <div className={classes.dashed}>
                <i className={icon}></i>
            </div>
            <h6 className={classes.itemTitle}>{buttonText}</h6>
        </li>
    );
};

export default SpecialButton;
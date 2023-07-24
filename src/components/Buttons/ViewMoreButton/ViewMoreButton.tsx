import { FC } from 'react';

//UI
import classes from './ViewMoreButton.module.css'

interface IButtonProps {
    handleClick: () => void;
    className?: string;
}
const AddMoreButton: FC<IButtonProps> = ({ handleClick, className }) => {
    return (
        <li
            className={`${classes.item} ${className ? className : ''}`} onClick={handleClick}>
            <div className={classes.dashed}>
                <i className="bi bi-chevron-right"></i>
            </div>
            <h6 className={classes.itemTitle}>View More</h6>
        </li>
    );
};

export default AddMoreButton;
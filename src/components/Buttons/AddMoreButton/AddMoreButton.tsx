import { FC } from 'react';

//UI
import classes from './AddMoreButton.module.css'

interface IButtonProps {
    handleClick: () => void;
    className?: string;
}
const AddMoreButton: FC<IButtonProps> = ({ handleClick, className }) => {
    return (
        <li className={`${classes.item} ${className ? className : ''}`}
            onClick={handleClick}>
            <div className={classes.dashed}>
                <i className="bi bi-plus-lg"></i>
            </div>
            <h6 className={classes.itemTitle}>Add More</h6>
        </li>
    );
};

export default AddMoreButton;
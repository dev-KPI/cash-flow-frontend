import React, {FC} from 'react';

//UI
import classes from './CloseButton.module.css';

interface ICloseButtonProps {
    closeHandler: () => void
}

const CloseButton: FC<ICloseButtonProps> = ({closeHandler}) => {
    return(<>
        <button className={classes.closeModalBtn} onClick={() => closeHandler()}>
            <i className="bi bi-x-lg"></i>
        </button>
    </>)
}

export default CloseButton
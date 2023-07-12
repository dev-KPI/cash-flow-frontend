import React, {FC} from 'react';

//UI
import classes from './CloseButton.module.css';

interface ICloseButtonProps {
    closeHandler: () => void
    size?: number
}

const CloseButton: FC<ICloseButtonProps> = ({closeHandler, size = 42}) => {
    return(<>
        <button className={classes.closeModalBtn} onClick={() => closeHandler()}>
            <i style={{fontSize: size + 'px'}} className="bi bi-x-lg"></i>
        </button>
    </>)
}

export default CloseButton
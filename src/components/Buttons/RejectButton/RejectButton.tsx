import React, {FC} from 'react';

//UI
import classes from './RejectButton.module.css';

interface IRejectButtonProps {
    RejectHandler: () => void
    title: string
}

const RejectButton: FC<IRejectButtonProps> = ({RejectHandler, title}) => {
    return(<>
        <button className={classes.rejectBtn} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault();RejectHandler()}}>
            <p className={classes.rejectBtnTitle}>{title}</p>
        </button>
    </>)
}

export default RejectButton
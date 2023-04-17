import React, {FC, ReactNode} from 'react';

//UI
import classes from './ModalAnimation.module.css';

interface IModalAnimation {
    children: ReactNode,
    isAnimation: boolean,
    onAnimationEnd: () => void
}

const ModalAnimation: FC<IModalAnimation> = ({children, isAnimation, onAnimationEnd}) => {
    const classNames = isAnimation ? classes['in'] : classes['out']

    return(<>
        <div 
        onAnimationEnd={onAnimationEnd}
        style={{width: '100%', height: '100%'}} 
        className={classNames}>
            {children}
        </div>
    </>)
}

export default ModalAnimation;
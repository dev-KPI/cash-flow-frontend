import React, {FC, ReactNode, useMemo} from 'react';

//UI
import classes from './ModalAnimation.module.css';

interface IModalAnimation {
    children: ReactNode,
    isAnimation: boolean,
    disablePortal: () => void
}

const ModalAnimation: FC<IModalAnimation> = ({children, isAnimation, disablePortal}) => {
    const classNames = useMemo(() => { return isAnimation ? classes['in'] : classes['out'] }, [isAnimation])
    return(<>
        <div 
        onAnimationEnd={() => disablePortal()}
        style={{width: '100%', height: '100%'}} 
        className={classNames}>
            {children}
        </div>
    </>)
}

export default ModalAnimation;
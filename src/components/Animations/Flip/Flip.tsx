import React, {FC, ReactNode} from 'react'

import classes from './Flip.module.css';

export interface IFlipProps {
    children: ReactNode,
    duration?: number,
    isAnimation: boolean
}

const Flip: FC<IFlipProps> = ({children, isAnimation}) => {

    const classNames = isAnimation ? classes.out : classes.in

    return <>
        <div className={classNames}>
            {children}
        </div>
    </>
}
export default Flip
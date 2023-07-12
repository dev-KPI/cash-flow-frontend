import React, {FC, ReactNode} from 'react'

import classes from './SlideX.module.css';

export interface ISlideProps {
    children: ReactNode,
    isAnimation: boolean
}

const SlideX: FC<ISlideProps> = ({children, isAnimation}) => {

    const classNames = isAnimation ? classes['slide-in-left'] : classes['slide-out-left']

    return <>
        <div className={classNames}>
            {children}
        </div>
    </>
}
export default React.memo(SlideX)
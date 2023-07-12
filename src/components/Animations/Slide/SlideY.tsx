import React, {FC, ReactNode} from 'react'

import classes from './SlideY.module.css';

export interface ISlideProps {
    children: ReactNode,
    isAnimation: boolean
}

const SlideY: FC<ISlideProps> = ({children, isAnimation}) => {

    const classNames = isAnimation ? classes['slide-in-blurred-top'] : classes['slide-out-blurred-top']

    return <>
        <div className={classNames}>
            {children}
        </div>
    </>
}
export default SlideY
import React, {FC, ReactNode} from 'react';

//UI

interface IButtonHover {
    children: ReactNode,
    isAnimation: boolean,
}

const ButtonHover: FC<IButtonHover> = ({children, isAnimation}) => {
    return(<>
        <div style={{
            transform: isAnimation ? 'scale(1.05)' : 'scale(1)',
            transition: 'all .2s ease'
        }}>
            {children}
        </div>
    </>)
}

export default ButtonHover;
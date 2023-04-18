import React, {FC, MouseEvent, useState} from 'react';

//UI
import classes from './ConfirmButton.module.css'
import ButtonHover from '@components/Animations/ButtonHover/ButtonHover';
import PreLoader from '@components/PreLoader/PreLoader';

interface IConfirmButtonProps {
    btnWidth?: number
    btnHeight?: number
    type: 'submit' | 'button'
    callback: () => void
    isPending: boolean
    title: string
}

const ConfirmButton: FC<IConfirmButtonProps> = ({type, btnWidth = 100, btnHeight = 50, callback, isPending, title = '' }) => {

    const [isAnimation = false, setIsAnimation] = useState<boolean>();

    const setStartHover = () => setIsAnimation(true)
    const setEndHover = () => setIsAnimation(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => callback() 

    return <>
    {!isPending ?
        <ButtonHover
        isAnimation={isAnimation}
        >        
            <button
            onMouseEnter={setStartHover}
            onMouseLeave={setEndHover}
            type={type}
            onClick={handleClick}
            style={{
                maxWidth: btnWidth + 'px',
                height: btnHeight + 'px',
                transition: 'transform 0.3s ease, opacity 0.1s ease',
            }}
            className={classes.ConfirmButton}>
                <i className="bi bi-check2"></i>
                <p>Confirm</p>
            </button>
        </ButtonHover> 
    : 
        <div 
        style={{
            width: btnWidth + 'px',
            height: btnHeight + 'px',
            transition: 'all 0.3s ease',
        }}
        className={classes.loadingButton}>
            <p>{title}</p>
            <PreLoader type="confirmButton" preLoaderSize={20}/>
        </div>
    }
    </>
}

export default ConfirmButton
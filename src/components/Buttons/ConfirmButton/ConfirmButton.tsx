import React, {FC, MouseEvent, useState} from 'react';

//UI
import classes from './ConfirmButton.module.css'
import ButtonHover from '@components/Animations/ButtonHover/ButtonHover';
import PreLoader from '@components/PreLoader/PreLoader';

interface IConfirmButtonProps {
    btnWidth?: number
    btnHeight?: number
    type: 'submit' | 'button' | 'add'
    callback: () => void
    isPending: boolean
    title: string
}

const ConfirmButton: FC<IConfirmButtonProps> = ({type, btnWidth = 100, btnHeight = 50, callback, isPending, title = '' }) => {

    const [isAnimation = false, setIsAnimation] = useState<boolean>();

    const setStartHover = () => setIsAnimation(true)
    const setEndHover = () => setIsAnimation(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => callback() 
    const getIcon = () => {
        return type === 'submit' ? 
        <i className="bi bi-check2"></i> :
        type === 'add' ? <i style={{fontSize:'24px'}} className="bi bi-plus"></i> : <div></div>
    }

    return <>
    {!isPending ?
        <ButtonHover
        isAnimation={isAnimation}
        >        
            <button
            onMouseEnter={setStartHover}
            onMouseLeave={setEndHover}
            onClick={handleClick}
            style={{
                width: btnWidth + 'px',
                height: btnHeight + 'px',
                transition: 'transform 0.3s ease, opacity 0.1s ease',
            }}
            className={classes.ConfirmButton}>
                <div className={classes.wrapperbtn}>
                    {getIcon()}
                    <p>{title ? title : 'Confirm'}</p>
                </div>
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
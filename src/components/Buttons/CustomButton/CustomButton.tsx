import React, {FC, MouseEvent, useState} from 'react';

//UI
import classes from './CustomButton.module.css'
import ButtonHover from '@components/Animations/ButtonHover/ButtonHover';
import PreLoader from '@components/PreLoader/PreLoader';

interface ICustomButtonProps {
    btnWidth?: number
    btnHeight?: number
    children?: React.ReactNode
    icon: 'submit' | 'button' | 'add' | 'refuse' | 'disband' | 'none',
    type: 'primary' | 'danger' | 'white'
    background?: 'outline'
    callback: () => void
    isPending: boolean
    className?: string
    disableScale?: boolean
}

const CustomButton: FC<ICustomButtonProps> = ({ icon, btnWidth, btnHeight, callback, isPending, type, background, children, className, disableScale = false}) => {
    const [isAnimation = false, setIsAnimation] = useState<boolean>();

    const setStartHover = () => setIsAnimation(!disableScale)
    const setEndHover = () => setIsAnimation(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callback()
    } 
    const getIcon = () => {
        return icon === 'submit' ? <i className="bi bi-check2"></i>
            : icon === 'add' ? <i style={{ fontSize: '24px' }} className="bi bi-plus"></i>
            : icon === 'refuse' ? <i style={{ fontSize: '24px' }} className="bi bi-x"></i> 
            : icon === 'disband' ? <i style={{ fontSize: '24px' }} className="bi bi-person-slash"></i>
            : ''
    }

    const getClassType = () => {
        return type === 'primary' ? classes.btnPrimary
            : type === 'danger' ? classes.btnDanger
            : type === 'white' ? classes.btnWhite
            : classes.btnPrimary    
    }
    const getBackgroundType = () => {
        return background === 'outline' ? classes.outline
            : ''
    }
    className = className ? className : '';
    const classList = `${getClassType()} ${getBackgroundType()} ${className}`;
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
                    transition: 'transform 0.3s ease, opacity 0.1s ease, color 0.1s ease, background 0.3s ease'
                    }}
                className={`${classes.CustomButton} ${classList}`}>
                <div className={classes.wrapperbtn}>
                    {getIcon()}
                    {children}
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
            className={`${classes.loadingButton} ${className}`}>
            {children}
            <PreLoader type="confirmButton" preLoaderSize={20}/>
        </div>
    }
    </>
}

export default CustomButton
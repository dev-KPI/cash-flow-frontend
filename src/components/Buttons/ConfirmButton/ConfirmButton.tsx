import React, {FC, MouseEvent, useState} from 'react';

//UI
import classes from './ConfirmButton.module.css'
import ButtonHover from '@components/Animations/ButtonHover/ButtonHover';
import PreLoader from '@components/PreLoader/PreLoader';

interface IConfirmButtonProps {
    btnWidth?: number
    btnHeight?: number
    titleFontSize?: number
    titleFontWeight?: number
    type: 'submit' | 'button' | 'add' | 'refuse' | 'none',
    background?: 'solid' | 'outline'
    callback: () => void
    isPending: boolean
    title: string
    className?: string
}

const ConfirmButton: FC<IConfirmButtonProps> = ({ titleFontWeight, titleFontSize, type, btnWidth = 100, btnHeight = 50, callback, isPending, background, title = '', className}) => {

    const [isAnimation = false, setIsAnimation] = useState<boolean>();

    const setStartHover = () => setIsAnimation(true)
    const setEndHover = () => setIsAnimation(false)

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callback()
    } 
    const getIcon = () => {
        return type === 'submit' ? <i className="bi bi-check2"></i>
            : type === 'add' ? <i style={{ fontSize: '24px' }} className="bi bi-plus"></i>
            : type === 'refuse' ? <i style={{ fontSize: '24px' }} className="bi bi-x"></i> 
            : ''
    }
    className = className ? className : '';
    const backgroundStyle = background === 'outline' ?
        {
            border: '1px solid var(--confrimBtn)',
            background: 'transparent',
            color: 'var(--confrimBtn)'
        } : 
        {
            color: 'var(--btnText)'  
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
                    ...backgroundStyle,
                    width: btnWidth + 'px',
                    height: btnHeight + 'px',
                    transition: 'transform 0.3s ease, opacity 0.1s ease'
                    }}
                className={`${classes.ConfirmButton} ${className}`}>
                <div className={classes.wrapperbtn}>
                    {getIcon()}
                    <p style={{
                        display: 'flex', 
                        alignItems: 'center',  
                        fontSize: titleFontSize! > 0 ? titleFontSize + '' : '',
                        fontWeight: titleFontWeight! > 0 ? titleFontWeight + 'px' : ''}}>{title ? title : 'Confirm'}</p>
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
            <p>{title}</p>
            <PreLoader type="confirmButton" preLoaderSize={20}/>
        </div>
    }
    </>
}

export default ConfirmButton
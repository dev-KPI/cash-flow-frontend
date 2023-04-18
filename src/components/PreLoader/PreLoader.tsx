import React, {FC} from 'react';

import classes from './Preloader.module.css'

interface IPreLoaderProps{
    preLoaderSize: number
    type: 'light' | 'dark' | 'confirmButton' | 'auto'
}

const PreLoader: FC<IPreLoaderProps> = ({preLoaderSize, type = 'auto'}) => {

    const loaderColorType = [
        (type === 'light') ? 'loaderLight' : '',
        (type === 'dark') ? 'loaderDark' : '',
        (type === 'auto') ? 'loaderAuto' : '',
        (type === 'confirmButton') ? 'confirmButton' : ''
    ]
    return <div 
    style={{
        width: preLoaderSize + 'px',
        height: preLoaderSize + 'px',
    }}
    className={classes[loaderColorType.find(el => el.length > 1) || 'loaderAuto']}></div>
}

export default PreLoader
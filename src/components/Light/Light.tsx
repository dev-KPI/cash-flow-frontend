import React, {FC, useEffect, useState} from 'react';
import classes from './Light.module.css';
import { isThemeInStorage } from '../../localStorage/theme';

export interface ILight {
    type: 'red'|'blue'|'green'|'purple'|'orange'
}

const Light: React.FC<ILight> = ({type}: ILight) => {
    
    const [ThemeInStorage, setThemeInStorage] = useState<string>('');
    useEffect(()=>{
        setThemeInStorage(isThemeInStorage())
    },[])
    return(<>
        <div 
        data-theme={ThemeInStorage}
        data-light-color={type} 
        className={classes.light}></div>
    </>)
}

export default Light;
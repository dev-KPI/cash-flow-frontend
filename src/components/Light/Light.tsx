import {FC} from 'react';
import classes from './Light.module.css';

//store
import { useAppSelector } from '@hooks/useAppStore';
import { parseColors } from '@services/UsefulMethods/UsefulMethods';

export interface ILight {
    type: 'solid' | 'hollow'
    color: string,
    className?: string
}

const Light: FC<ILight> = ({ type, color, className }: ILight) => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const shadow = actualTheme === 'light' ? 'none' : `0px 0px 8px ${parseColors(color)}`
    if (type === 'solid') {
        return  (
        <div
            style={{ backgroundColor: color, boxShadow: shadow }}
            className={`${classes.lightSolid} ${className}`}>
        </div>)
    }
    else if (type === 'hollow') {
        return (
        <div
                style={{ borderColor: color, boxShadow: shadow }}
                className={`${classes.lightHollow} ${className}`}>
            </div>
        )
    }
    return <></>
}

export default Light;
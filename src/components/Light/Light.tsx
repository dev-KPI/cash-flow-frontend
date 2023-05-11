import { FC } from 'react';
import classes from './Light.module.css';

//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { parseColors } from '@services/UsefulMethods/UIMethods';

export interface ILight {
    type: 'solid' | 'hollow'
    color: string,
    className?: string,
    style?: React.CSSProperties
}

const Light: FC<ILight> = ({ type, color, style, className }: ILight) => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const shadow = actualTheme === 'light' ? 'none' : `0px 0px 8px ${parseColors(color)}`
    if (type === 'solid') {
        return (
            <div
                style={{ ...style, backgroundColor: color, boxShadow: shadow }}
                className={`${classes.lightSolid} ${className}`}>
            </div>)
    }
    else if (type === 'hollow') {
        return (
            <div
                style={{ ...style, borderColor: color, boxShadow: shadow }}
                className={`${classes.lightHollow} ${className}`}>
            </div>
        )
    }
    return <></>
}

export default Light;
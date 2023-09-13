import { FC } from 'react';
import classes from './Light.module.css';

//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { parseColors } from '@services/UsefulMethods/UIMethods';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';

export interface ILight {
    type: 'solid' | 'hollow'
    color: string,
    className?: string,
    style?: React.CSSProperties
}

const Light: FC<ILight> = ({ type, color, style, className }: ILight) => {

    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const shadow = actualTheme === 'light' ? 'none' : `0px 0px 8px ${parseColors(color)}`
    className = className ? className : '';
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
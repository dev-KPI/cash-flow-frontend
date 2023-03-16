import {FC} from 'react';
import classes from './Light.module.css';

//store
import { useAppSelector } from '@hooks/useAppStore';

export interface ILight {
    type: 'red'|'blue'|'green'|'purple'|'orange'
}

const Light: FC<ILight> = ({type}: ILight) => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const styles = {
        lightShadow: actualTheme === 'light' ? 'none' : `0px 0px 8px var(--main-${type})`
    }

return(<>
        <div 
        data-light-color={type} 
        style={{boxShadow: styles.lightShadow}}
        className={classes.light}></div>
    </>)
}

export default Light;
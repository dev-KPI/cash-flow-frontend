import React, {FC} from 'react';
import classes from './Light.module.css';

export interface ILight {
    type: 'red'|'blue'|'green'|'purple'|'orange'
    neonOnlyDark: boolean
}

const Light: React.FC<ILight> = ({type, neonOnlyDark}: ILight) => {
    return(<>
        <div 
        data-light-color={type} 
        neon-only={neonOnlyDark} 
        className={classes.light}></div>
    </>)
}

export default Light;
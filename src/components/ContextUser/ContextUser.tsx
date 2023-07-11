import React, {FC, useState, MouseEvent} from 'react';
import { Link } from 'react-router-dom';

import classes from './ContextUser.module.css'

interface IContextUser {
    animation: boolean,
    closeContextUser: () => void
}

const ContextUser: FC<IContextUser> = ({animation, closeContextUser}) => {

    const [Animation = 'in', setAnimation] = useState<'in'|'out'>();

    const closeContextUserHandler = () => {
        if (Animation === 'out'){
            closeContextUser()
        }
    }
    const setAnimationOut = () => setAnimation('out')

    return(<>
    <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 4884}} 
        onClick={(e: MouseEvent<HTMLDivElement>) => {e.preventDefault(); e.stopPropagation(); setAnimationOut()}}></div>
    <ul onAnimationEnd={e => closeContextUserHandler()}
        className={classes.List  + ' ' + classes[Animation]}>
            <li>
                <Link to={'/login'}>
                    <h4 className={classes.Link}>Settings</h4>
                </Link>
            </li>
            <li>
                <Link to={'/login'}>
                    <h4 className={classes.Link}>Personal information</h4>
                </Link>
            </li>
            <li>
                <Link to={'/login'}>
                    <h4 className={classes.Link}>Log <span style={{color: 'var(--main-green)'}}>Out</span></h4>
                </Link>
            </li>
    </ul>
    </>)
}
export default ContextUser
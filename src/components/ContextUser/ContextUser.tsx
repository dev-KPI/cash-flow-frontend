import React, { FC, MouseEvent, ReactNode, useState, SetStateAction, Dispatch } from "react";
import { Link } from 'react-router-dom';

//UI
import classes from './ContextUser.module.css'
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";

interface IContenxtUserProps {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLElement>
}

const ContextUser: FC<IContenxtUserProps> = ({ isActive, setIsActive, buttonRef }) => {

    return (
        <SmallModal
            active={isActive}
            setActive={setIsActive}
            className={classes.contextModal}
            title='User'
            buttonRef={buttonRef}
            disableHeader={true}
            children={
                <ul 
                    className={classes.List}>
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
                            <h4 className={classes.Link}>Log <span style={{ color: 'var(--main-green)' }}>Out</span></h4>
                        </Link>
                    </li>
                </ul>}
        />
    )
}
export default ContextUser
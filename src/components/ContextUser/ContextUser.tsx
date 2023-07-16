import React, { FC, MouseEvent, ReactNode, useState, SetStateAction, Dispatch } from "react";
import { Link, useNavigate } from 'react-router-dom';

//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IUserState } from "@store/UserSlice/UserInterfaces";
import { UserSliceActions } from "@store/UserSlice/UserSlice";
//logic
import { auth } from "@services/Auth/firebaseInitialization";
//UI
import classes from './ContextUser.module.css'
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";

interface IContenxtUserProps {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLElement>
}

const ContextUser: FC<IContenxtUserProps> = ({ isActive, setIsActive, buttonRef }) => {

    const UserStore = useAppSelector<IUserState>(state => state.UserSlice);
    const UserDispatch = useActionCreators(UserSliceActions);
    const navigate = useNavigate();

    const GoogleLogOut = async () => {
        try {
            auth.signOut()
            UserDispatch.setNullCredentials();
            navigate('/login')
        } catch (err) { 
            console.log(err)
        }
    }

    return (
        <SmallModal
            active={isActive}
            setActive={setIsActive}
            className={classes.contextModal}
            title='User'
            buttonRef={buttonRef}
            disableHeader={true}
            children={
                <ul className={classes.List}>
                    <li className={classes.item}>
                        <Link to={'/'}>
                            <h4 className={classes.Link}>Settings</h4>
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <Link to={'/'}>
                            <h4 className={classes.Link}>Personal information</h4>
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <button style={{cursor: 'pointer'}} onClick={GoogleLogOut}>
                            <h4 className={classes.Link}>Log <span style={{ color: 'var(--main-green)' }}>Out</span></h4>
                        </button>
                    </li>
                </ul>}
        />
    )
}
export default ContextUser
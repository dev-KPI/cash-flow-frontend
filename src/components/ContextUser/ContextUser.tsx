import React, { FC, SetStateAction, Dispatch, useState } from "react";
import { Link } from 'react-router-dom';

//store
import { useActionCreators} from "@hooks/storeHooks/useAppStore";
import { UserSliceActions } from "@store/User/UserSlice";
//logic
//UI
import classes from './ContextUser.module.css'
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";
import { ToggleCurrencyButton } from "@components/Buttons/ToggleButton/ToggleButton";
interface IContenxtUserProps {
    isActive: boolean,
    setIsActive: Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLElement>
}

const ContextUser: FC<IContenxtUserProps> = ({ isActive, setIsActive, buttonRef }) => {
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    const LogOut = () => {
        UserSliceDispatch.setIsAuth(false)
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
                        <Link to={'/faq'}>
                            <h4 className={classes.Link}>FAQ</h4>
                        </Link>
                    </li>
                    <li className={classes.item}>
                        <ToggleCurrencyButton/>
                    </li>
                    <li className={classes.item}>
                        <button onClick={LogOut}>
                            <Link to={"https://api.cash-money.store/logout"} style={{cursor: 'pointer'}}>
                                <h4 className={classes.Link}>Log <span style={{ color: 'var(--main-green)' }}>Out</span></h4>
                            </Link>
                        </button>
                    </li>
                </ul>}
        />
    )
}
export default ContextUser
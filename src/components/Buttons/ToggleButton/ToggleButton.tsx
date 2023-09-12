import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { CurrencyActions } from '@store/UI_store/CurrencySlice/CurrencySlice';
import React, { FC, useState } from 'react';

//UI
import classes from './ToggleButton.module.css';

interface ToggleButtonProps {
    isToggle: boolean;
    onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ToggleButton:FC<ToggleButtonProps> = ({isToggle, onToggle}) => {
    return (
        <label className={classes.switch}>
            <input type='checkbox' className={classes.checkbox} checked={isToggle} onChange={onToggle} />
            <span className={classes.slider} />
        </label>
    );
};

export default ToggleButton;


export const ToggleCurrencyButton: FC = () => {
    const currency = useAppSelector(state => state.persistedCurrencySlice.currency)
    const CurrencyDispatch = useActionCreators(CurrencyActions);
    const [isCurrencyToggled, setIsCurrencyToggled] = useState<boolean>(currency === '$');

    const onToggle = () => { setIsCurrencyToggled(!isCurrencyToggled); CurrencyDispatch.setCurrency(); }
    return (
        <label className={classes.toggleArrow}>
            <input type='checkbox' className={classes.checkbox} checked={isCurrencyToggled} onChange={onToggle} />
            <div>
                <span className={!isCurrencyToggled ? classes.active : ''}>UAH</span>
                <i className="bi bi-arrow-left-right"></i>
                <span className={isCurrencyToggled ? classes.active : ''}>USD</span>
            </div>
        </label>
    );
};

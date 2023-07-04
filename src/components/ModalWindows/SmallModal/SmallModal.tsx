import CloseButton from '@components/Buttons/CloseButton/CloseButton';
import React, {FC, SetStateAction, Dispatch, useRef, ReactNode} from 'react';
import { useOnClickOutside } from 'usehooks-ts'
//UI
import classes from './SmallModal.module.css';

interface ISmallModalProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    children: ReactNode,
    title: string;
    className: string
}
const SmallModal: FC<ISmallModalProps> = ({ active, setActive, children, className, title }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => {
        setActive(false)
    })
    return (
        <div
            className={`${className ? className : ''} + ${active ? `${classes.modal} ${classes.active}` : classes.modal}`}
            onClick={(e) => e.stopPropagation()}
            ref={ref}>
            <div className={classes.modalHeader}>
                <h5 className={classes.title}>{title}</h5>
                    <CloseButton size={24} closeHandler={() => { setActive(false) }} />
                </div>
            <div className={classes.modal__content}>
                {children}
            </div>
        </div>
    );
};

export default SmallModal;
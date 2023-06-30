import React, { useState, FC, ReactNode, useEffect, useCallback } from 'react';
import classes from './Accordion.module.css'; 

type AccordionTabProps = {
    title: string;
    children: ReactNode;
    choosedItem?: ReactNode
};

export const AccordionTab: FC<AccordionTabProps> = ({ title, children, choosedItem }) => {
    const [isOpen = false, setIsOpen] = useState<boolean>();

    const bindClose = useCallback(() => {
        setIsOpen(false);
    }, [choosedItem]);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        bindClose()
    }, [choosedItem])

    return (
        <li key={title + '219idjk'} className={classes.accordionTab}>
            <div className={classes.accordionHeader + ` ${isOpen ? classes.open : ''}`} onClick={handleToggle}>
                <h5 className={classes.title}>{title}</h5>
                <div className={classes.HeaderEnd}>
                    {choosedItem ? choosedItem : null}
                    <i 
                    style={{color: 'var(--main-text)'}}
                    className={classes.chevron + " bi bi-chevron-down"}></i>
                </div>
            </div>
            <div className={classes.accordionContent + ` ${isOpen ? classes.open : ''}`}>
                {children}
            </div>
        </li>
    );
};

interface IAccordionProps {
    width?: number,
    children: ReactNode[]
}
const Accordion: FC<IAccordionProps> = ({width = 440, children}) => {
    return (
        <ul 
        style={{
            width: width + 'px',
        }}
        className={classes.accordion}>
            {children}
        </ul>
    );
};

export default Accordion;
import React, { useState, FC } from 'react';

//UI
import classes from "./OperationCard.module.css"

interface OperactionCardProps {
    operation: string;
}

const OperationCard:FC<OperactionCardProps> = ({operation}) => {
    const [amount, setAmount] = useState<number>(0);
    const [source, setSource] = useState<string>('');

    const updateIncome = (e:React.MouseEvent):void => {
        e.preventDefault();
        if (operation !== "Income")
            return;
        let newAmount = amount + (Number(prompt("Set income:")) | 0);
        setAmount(newAmount);
        setSource(prompt("Set source:") || '');
    }

    const styles = {
        operationColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentColor:  operation === "Income"  ? "var(--main-green)": "var(--main-red)",
        percentBackground: operation === "Income"  ? "rgba(128, 214, 103, 0.20)" : "rgba(255, 45, 85, 0.20)",
        cursor: operation === "Income" ? "pointer" : "auto"
    }
    return (
        <div className={classes.incomeCard}
            onClick = {updateIncome}
            style ={{cursor: styles.cursor}}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <div className={classes.info}>
                        <h6 className={classes.title}>{operation}</h6>
                        <p className={classes.amount}>{amount}$</p>
                    </div>
                    <div 
                    className={classes.icon}
                        style={{ background: styles.operationColor }}
                    >
                        {operation === "Income" ? 
                        <i className="bi bi-credit-card-2-front"></i> : <i className="bi bi-graph-down"></i>}             
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div 
                    className={classes.percent}
                        style={{ background: styles.percentBackground }}
                    >
                        <span style={{ color: styles.percentColor }}>13%</span>
                    </div>
                    <p className={classes.time}>since last month</p>
                </div>
            </div>
        </div>
    );
};

export default OperationCard;
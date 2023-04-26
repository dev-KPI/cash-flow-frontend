import React, { useState, FC, useEffect } from 'react';

//UI
import classes from "./OperationCard.module.css"
import SalaryModal from '@components/ModalWindows/OperationModal/SalaryModal';

interface OperactionCardProps {
    operation: string;
}

const OperationCard: FC<OperactionCardProps> = ({ operation }) => {

    const [amount, setAmount] = useState<number>();
    const [source, setSource] = useState<string>();

    const [isOperationModalOpen = false, setIsOperationModalOpen] = useState<boolean>();

    const updateIncome = (e: React.MouseEvent): void => {
        e.preventDefault();
        if (operation !== "Income") return;

        const amountAll = 321;
    }

    const styles = {
        operationColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentBackground: operation === "Income" ? "rgba(128, 214, 103, 0.20)" : "rgba(255, 45, 85, 0.20)",
        cursor: operation === "Income" ? "pointer" : "auto"
    }
    return (<>
        {operation === 'Income' ?
            <SalaryModal
                setIsSalaryModalOpen={setIsOperationModalOpen}
                isSalaryModalOpen={isOperationModalOpen}
            /> : null
        }
        <div className={classes.operationCard}
            onClick={() => operation === "Income" ? setIsOperationModalOpen(!isOperationModalOpen) : null}
            style={{ cursor: styles.cursor }}>
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
    </>);
};

export default OperationCard;
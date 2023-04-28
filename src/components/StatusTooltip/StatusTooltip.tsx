import React, {FC, useState, useMemo, useCallback} from "react";

import classes from './StatusTooltip.module.css'

interface IStatusTooltipProps {
    title: string
    type: 'success' | 'error'
}

const StatusTooltip: FC<IStatusTooltipProps> = ({title, type}) => {

    const [showTooltip = true, setShowTooltip] = useState<boolean>();
    const [showTooltipAnim = classes.slideIn, setShowTooltipAnim] = useState<string>();

    const icon = type === 'success' ? 
    <i className="bi bi-check"></i> : 
    <i className="bi bi-x"></i>
    const color = type === 'success' ? 
    'var(--main-green)' : 'var(--main-red)'

    const closeAnimTooltip = () => {
        const tooltip = document.getElementById('StatusTooltip')
        setShowTooltipAnim(classes.slideOut);
        if(tooltip) setTimeout(() => setShowTooltip(false), 1000)
    }


    const tooltipLayout = <div 
    id="StatusTooltip" 
    className={classes.StatusTooltip + ' ' + showTooltipAnim}>
        <div className={classes.upSide}>
            <div style={{color: color}} className={classes.iconTooltip}>{icon}</div>
            <p className={classes.text}>{title}</p>
        </div>
        <div style={{color: color}}
        id="timerLine"
        onAnimationEnd={() => closeAnimTooltip()}
        className={classes.timerLine}></div>
    </div>

    return(<>
    {showTooltip && tooltipLayout}
    </>)
}

export default StatusTooltip;
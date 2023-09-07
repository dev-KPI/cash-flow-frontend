import {FC, useState, ReactNode} from "react";

import classes from './StatusTooltip.module.css'
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { TooltipSliceActions } from "@store/UI_store/TooltipSlice/TooltipSlice";

interface IStatusTooltipProps {
    title: ReactNode
    type: 'success' | 'error'
    callback?: () => void
}

const StatusTooltip: FC<IStatusTooltipProps> = ({title, type, callback = () => {}}) => {

    const [showTooltip, setShowTooltip] = useState<boolean>(true);
    const [showTooltipAnim, setShowTooltipAnim] = useState<string>(classes.slideIn);
    const TooltipDispatch = useActionCreators(TooltipSliceActions)

    const icon = type === 'success' ? 
    <i className="bi bi-check"></i> : 
    <i className="bi bi-x"></i>
    const color = type === 'success' ? 
    'var(--main-green)' : 'var(--main-red)'

    const closeAnimTooltip = () => {
        const tooltip = document.getElementById('StatusTooltip')
        setShowTooltipAnim(classes.slideOut);
        if(tooltip) setTimeout(() => {
            TooltipDispatch.setTooltip({
                shouldShowTooltip: false,
                modeTooltip: 'leave',
                textTooltip: '',
                status: 'success'
            })
            setShowTooltip(false)
            callback()
        }, 1000)
    }


    const tooltipLayout = <div 
    id="StatusTooltip" 
    className={classes.StatusTooltip + ' ' + showTooltipAnim}>
        <div className={classes.upSide}>
            <div style={{color: color}} className={classes.iconTooltip}>{icon}</div>
            <div className={classes.text}>
                {title}
            </div>
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
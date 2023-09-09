import {FC, useState, ReactNode, useMemo, useCallback} from "react";

import classes from './StatusTooltip.module.css'
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { TooltipSliceActions } from "@store/UI_store/TooltipSlice/TooltipSlice";
import ITooltipState from "@store/UI_store/TooltipSlice/TooltipSliceInterfaces";

interface IStatusTooltipProps {
    title: ReactNode
    type: 'success' | 'error'
    callback?: () => void
}

const StatusTooltip: FC<IStatusTooltipProps> = ({title, type, callback = () => {}}) => {

    const [showTooltipAnim, setShowTooltipAnim] = useState<string>(classes.slideIn);
    const TooltipDispatch = useActionCreators(TooltipSliceActions)
    const TooltipStore = useAppSelector<ITooltipState>(store => store.TooltipSlice)

    const icon = type === 'success' ? 
    <i className="bi bi-check"></i> : 
    <i className="bi bi-x"></i>
    const color = type === 'success' ? 
    'var(--main-green)' : 'var(--main-red)'

    const closeAnimTooltip = () => {
        const tooltip = document.getElementById('StatusTooltip')
        setShowTooltipAnim(classes.slideOut);
        if(tooltip) { 
            setTimeout(() => {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: false,
                    textTooltip: '',
                    status: 'success'
                })
            }, 1000)
        }
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
    {TooltipStore.tooltip.shouldShowTooltip && tooltipLayout}
    </>)
}

export default StatusTooltip;
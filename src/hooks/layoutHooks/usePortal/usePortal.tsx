import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import { FC, useEffect, Dispatch, useRef, SetStateAction, memo, ReactNode, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import useEscapeKey from "../useEscapeKey";

import classes from './usePortal.module.css';
interface IPortalProps {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode
    headerIcon?: ReactNode
    title?: string
    containerWidth?: number
    className?: string
}

const Portal: FC<IPortalProps> = ({ isModalOpen, setIsModalOpen, children, headerIcon, title = 'Title', containerWidth, className }) => {
    const [isVisible, setIsVisible] = useState<boolean>(isModalOpen)
    const [isFadeOut, setIsFadeOut] = useState<boolean>(false)
    const el = useRef<HTMLDivElement | null>(null);
 
    if (!el.current) el.current = document.createElement("div");
    useEffect(() => {
        const mount = document.getElementById("portal-root");
        const { current } = el;

        if (mount && current) {
            mount.appendChild(current);
        }

        return () => {
            if (mount && current) {
                mount.removeChild(current);
            }
        };
    }, []);
    useEffect(() => {
        const body = document.body;
        const yScroll = window.scrollY;
        if (isModalOpen) {
            setIsVisible(true);
            setIsFadeOut(false);
            if (body) {
                body.style.overflowY = 'scroll';
                body.style.position = 'fixed';
                body.style.top = `-${yScroll}px`;
                body.style.width = '100%';
            };
        } else {
            setIsFadeOut(true);
            if (body) {
                body.style.position = '';
                const scrollY = document.body.style.top;
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, [isModalOpen])
    const closeModal = () => setIsModalOpen(false)
    useEscapeKey(closeModal);
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
        if (e.animationName.includes('outAnim')) {
            setIsVisible(false)
            setIsFadeOut(false)
        }
    }
    return createPortal(
        isVisible &&
            <div className={`${classes.usePortal} ${isFadeOut ? `${classes.fadeOut} ` : `${classes.fadeIn}`}`}
                onClick={(e) => e.stopPropagation()}
                onAnimationEnd={handleAnimationEnd}>
                <div className={classes.usePortal__backdrop} onClick={closeModal}>
                    <div
                        className={classes.usePortal__wrapper}
                        style={{ width: containerWidth ? containerWidth : '' }}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation() }}
                    >
                        <div className={classes.Header}>
                            <div className={classes.Icon}>{headerIcon}</div>
                            <h3 className={classes.Header__title}>{title}</h3>
                            <div className={classes.closeBtn}>
                                <CloseButton closeHandler={() => setIsModalOpen(false)} />
                            </div>
                        </div>
                        <div className={classes.line}></div>
                        <div className={className ? className + ' ' : '' }>
                            {children}
                        </div>
                    </div>
                </div>
            </div>, el.current)
};

export default memo(Portal);
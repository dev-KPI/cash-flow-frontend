import React, {FC, MouseEvent, useEffect, useCallback, useRef, ReactNode, useState} from "react";
import ReactDOM from 'react-dom';
import useEscapeKey from "@hooks/layoutHooks/useEscapeKey";
import { useWindowSize } from "usehooks-ts";

//UI
import classes from './useModal.module.css';
import ModalAnimation from "@components/Animations/ModalAnimation/ModalAnimation";


interface IModalProps{
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    children: ReactNode
    containerWidth?: number
    containerHeight?: number
}

const useModal: FC<IModalProps> = ({ 
    isModalOpen = false, 
    setIsModalOpen, 
    children, 
    containerWidth = 100, 
    containerHeight = 100
    }) => {

    const {width} = useWindowSize()
    const nodeRef = useRef<HTMLDivElement>(null);
    const portalPlace = document.getElementById('portal');
    const body = document.body;
    
    //handlers
    const closeModal = () => setIsModalOpen(false);
    const disablePortal = () => {
        if (portalPlace && isModalOpen === false){
            portalPlace.style.visibility = 'hidden';
            portalPlace.style.display = 'none';
        }
    }

    //initializing page process
    const initializePortal = useCallback(() => {
       
        containerHeight -= width < 768 ? (32 * 2) : 24;
        containerWidth -= width < 768 ? (30 * 2) : 24;

        if (portalPlace) {
            if(isModalOpen){
                portalPlace.style.visibility = 'visible';
                portalPlace.style.display = 'block';
            }
            portalPlace.style.position = 'fixed';
            portalPlace.style.zIndex = '9999';
            portalPlace.style.top = '0';
            portalPlace.style.left = '0';
        }
        if (isModalOpen) {
            if (body) {
                body.style.position = 'fixed';
                body.style.overflowY = 'scroll';
                body.style.width = '100%';
                body.style.paddingRight = '16px';
                if(width < 768) body.style.paddingRight = '0px';
            };
        } else {
            if (body) {
                body.style.width = '100%';
                body.style.position = 'relative';
                body.style.overflowY = 'scroll';
                body.style.paddingRight = '0px';
            }
        }
    }, [isModalOpen])

    useEscapeKey(closeModal);
    useEffect(() => {
        initializePortal()
    }, [isModalOpen]);
    //initializing end

    return ReactDOM.createPortal(<>
        <ModalAnimation 
        onAnimationEnd={disablePortal}
        isAnimation={isModalOpen}>
            <div 
            ref={nodeRef}
            className={classes.useModal}
            onClick={closeModal}>
                <div
                style={{
                    maxWidth: containerWidth + 'px',
                    maxHeight: containerHeight + 'px',
                }}
                onClick={(e: MouseEvent<HTMLDivElement>) => {e.preventDefault(); e.stopPropagation();}}
                className={classes.useModal__wrapper}>
                    {children}
                </div>
            </div>
        </ModalAnimation>
    </>,
    document.getElementById('portal')!
    );
};
  
export default React.memo(useModal);
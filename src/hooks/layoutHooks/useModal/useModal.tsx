import React, {FC, MouseEvent, useEffect, useCallback, useRef, ReactNode, useState} from "react";
import ReactDOM from 'react-dom';
import useEscapeKey from "@hooks/layoutHooks/useEscapeKey";
import { useWindowSize } from "usehooks-ts";

//UI
import classes from './useModal.module.css';
import ModalAnimation from "@components/Animations/ModalAnimation/ModalAnimation";



interface IModalProps{
    isModalOpen: boolean
    modalName: string
    setIsModalOpen: (value: boolean) => void
    children: ReactNode
    containerWidth?: number
    containerHeight?: number
}

const useModal: FC<IModalProps> = ({
    isModalOpen = false,
    modalName = 'portal', 
    setIsModalOpen, 
    children, 
    containerWidth = 100, 
    containerHeight = 100
    }) => {

    const {width} = useWindowSize()
    const portalPlace = document.getElementById(modalName);
    const body = document.body;
    const [isAnimation = true, setIsAnimation] = useState<boolean>();
    
    //handlers
    const disablePortal = useCallback(() => {
        if (portalPlace && isModalOpen === false){
            portalPlace.style.visibility = 'hidden';
            portalPlace.style.display = 'none';
        }
    }, [isAnimation, isModalOpen])
    const closeModal = () => setIsModalOpen(false)

    //initializing page process
    const initializePortal = useCallback(() => {
        const yScroll = window.scrollY;
        containerHeight -= width > 768 ? (32 * 2) : 24;
        containerWidth -= width > 768 ? (30 * 2) : 24;

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
                body.style.overflowY = 'scroll';
                body.style.position = 'fixed';
                body.style.top = `-${yScroll}px`;
                body.style.width = '100%';
            };
        } else {
            if (body) {
                body.style.position = '';
                const scrollY = document.body.style.top;
                body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
    }, [isModalOpen, width])

    useEscapeKey(closeModal);
    useEffect(() => {
        initializePortal()
    }, [isModalOpen]);
    //initializing end

    return ReactDOM.createPortal(<>
        <ModalAnimation 
        disablePortal={disablePortal}
        isAnimation={isModalOpen}>
            <div 
            className={classes.useModal}
            onClick={closeModal}>
                <div
                style={{
                    maxWidth: width > 768 ? containerWidth : '100%',
                    maxHeight: width > 768 ? containerHeight : '100%',
                }}
                onClick={(e: MouseEvent<HTMLDivElement>) => {e.preventDefault(); e.stopPropagation()}}
                className={classes.useModal__wrapper}>
                    {children}
                </div>
            </div>
        </ModalAnimation>
    </>,
    document.getElementById(modalName)!
    );
};
  
export default React.memo(useModal);
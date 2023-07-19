import React, { FC, ReactNode, useState, useCallback, useSyncExternalStore } from "react";
//logic
import { useElementSize, useWindowSize } from "usehooks-ts";
import { handleWrap } from "@services/UsefulMethods/UIMethods";
//UI
import classes from './ViewMoreModal.module.css';
import UseModal from "@hooks/layoutHooks/useModal/useModal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";


        
//logic

interface ICategoryModalProps{
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    data: any,
    type: 'categories' | 'groups'
}
interface IModalState {
    name: string
    color: string
}

const ViewMoreModal: FC<ICategoryModalProps> = ({ isModalOpen = false, setIsModalOpen, data, type }) => {
    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let title = ''
    let modalName = ''
    if (type === 'categories') {
        title = 'Categories'
        modalName = 'ViewMoreCategoriesModal'
    } else if (type === 'groups') {
        title = 'Groups'
        modalName = 'ViewMoreGroupsModal'
     }

    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const initializeHandleWrapper = useCallback(() => {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 5);
    }, [height, width, data])

    return <UseModal
        modalName={modalName}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        containerHeight={600}
        containerWidth={600}
    >
        <div className={classes.Header}>
            <div className={classes.Icon}>
                {headerIcon}
            </div>
            <h3 className={classes.ModalTitle}>{title}</h3>
            <div className={classes.closeBtn}>
                <CloseButton closeHandler={() => setIsModalOpen(false)} />
            </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.modal__wrapper}>
            <ul className={classes.list} ref={squareRef}>
                {data}
                <li className={`${classes.item} ${classes.specialItem}`}>
                    <div className={classes.dashed}>
                        <i className="bi bi-plus-lg"></i>
                    </div>
                    <h6 className={classes.itemTitle}>Add More</h6>
                </li>
            </ul>
            
        </div>
    </UseModal>
}
    
  
export default React.memo(ViewMoreModal);
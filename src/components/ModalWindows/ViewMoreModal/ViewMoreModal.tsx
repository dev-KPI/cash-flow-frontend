import React, { FC, Dispatch, SetStateAction, ReactNode, useCallback, useEffect  } from "react";

//UI
import classes from './ViewMoreModal.module.css';
import SpecialButton from "@components/Buttons/SpeciaButton/SpecialButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";

interface IViewMoreModalProps{
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    isAddModalOpen: boolean
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>
    data: any,
    type: 'categories' | 'groups'
}
interface IModalState {
    name: string
    color: string
}

const ViewMoreModal: FC<IViewMoreModalProps> = ({ isModalOpen = false, setIsModalOpen, isAddModalOpen,setIsAddModalOpen, data, type }) => {
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

    return <UsePortal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        headerIcon={headerIcon}
        title={title}
    >
        <div className={classes.modal__wrapper}>
            <ul className={classes.list}>
                {data}
                <SpecialButton
                    handleClick={() => {
                        setIsModalOpen(!isModalOpen)
                        setIsAddModalOpen(!isAddModalOpen)
                    }}
                    className={classes.specialItem}
                    type='add'
                />
            </ul>
            
        </div>
    </UsePortal>
}
    
  
export default React.memo(ViewMoreModal);
import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo } from "react";

//UI
import classes from './CategoryModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import { customColors, customIcons } from "@services/UsefulMethods/UIMethods";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import { useCreateCategoryByGroupMutation, useUpdateCategoryByGroupMutation } from "@store/Controllers/CategoriesController/CategoriesController";
import { IGetCategoriesByGroupResponse } from "@store/Controllers/CategoriesController/CategoriesControllerInterfaces";

interface ICategoryModalProps{
    isCategoryModalOpen: boolean
    Categories?: IGetCategoriesByGroupResponse
    setIsCategoryModalOpen: Dispatch<SetStateAction<boolean>>
    mode: 'create' | 'edit',
    groupId: number,
    categoryId?: number
}
interface IModalState {
    name: string
    color: string
}

const CategoryModal: FC<ICategoryModalProps> = ({ isCategoryModalOpen, setIsCategoryModalOpen, mode, groupId, Categories, categoryId }) => {

    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    const titleModal = 'Category'

    //pickers
    const [nameValue, setNameValue] = useState<string>('');
    const [pickedColor, setPickedColor] = useState<string>('#FF2D55');
    const changeColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {setPickedColor(color)};
    const light = <div style={{backgroundColor: pickedColor, boxShadow: '0px 0px 8px ' + pickedColor}} className={classes.colorPicked}></div>

    const [icon, setIcon] = useState<string>('bi bi-people');
    const changeIcon = (e: React.MouseEvent<HTMLDivElement>, icon: string) => {setIcon(icon)};
    const iconDisplayed = <i style={{fontSize: '24px', color: 'var(--main-text)'}} className={icon}></i>

    const [createCategory, {isLoading: isCategoryCreating, isError: isCategoryCreatingError, isSuccess: isCategoryCreated}] = useCreateCategoryByGroupMutation();
    const [updateCategory, {isLoading: isCategoryUpdating, isError: isCategoryUpdatingError, isSuccess: isCategoryUpdated}] = useUpdateCategoryByGroupMutation();
    
    const getSelectedCategory = useMemo(() => {
        if(Categories){
            return Categories.categories_group.filter(el => el.category.id === categoryId)[0]
        }
    }, [Categories, isCategoryModalOpen])

    const initializeModalInputs = useCallback(() => {
        if(getSelectedCategory){
            setNameValue(mode === 'edit' ? getSelectedCategory.category.title : '')
            setPickedColor(mode === 'edit' ? getSelectedCategory.color_code : '#FF2D55')
            setIcon(mode === 'edit' ? getSelectedCategory.icon_url : 'bi bi-people')
        }
    }, [getSelectedCategory])

    const handleSubmit = () => {
        if(mode === 'create'){
            createCategory({
                group_id: groupId,
                title: nameValue,
                icon_url: icon,
                color_code: pickedColor,
            })
            closeModalHandler();
        } else if(mode === 'edit' && categoryId){
            updateCategory({
                group_id: groupId,
                category_id: categoryId,
                title: nameValue,
                icon_url: icon,
                color_code: pickedColor,
            })
            closeModalHandler();
        }
    }

    const closeModalHandler = () => {
        setIsCategoryModalOpen(false);
    }

    const showToolTip = useCallback(() => {
        if(mode === 'create'){
            if (isCategoryCreated) {
                return <StatusTooltip
                type="success" 
                title={`Category ${nameValue} successfully added`}/>
            } else if(isCategoryCreatingError) {
                return <StatusTooltip
                type="error" 
                title={`Category ${nameValue} not added`}/>
            }
        } else {
            if (isCategoryUpdated) {
                return <StatusTooltip
                type="success" 
                title={`Category ${nameValue} successfully updated`}/>
            } else if(isCategoryUpdatingError) {
                return <StatusTooltip
                type="error" 
                title={`Category ${nameValue} not updated`}/>
            }
        }
    }, [createCategory, isCategoryCreating, isCategoryCreatingError, isCategoryCreated,
        updateCategory, isCategoryUpdating, isCategoryUpdatingError, isCategoryUpdated])

    let labelText = '';
    if (mode === 'create') {
        labelText = 'Please сreate new category:'
    } else if (mode === 'edit') {
        labelText = 'Please enter the name of the category:'
    }

    useEffect(() => {
        initializeModalInputs()
    }, [initializeModalInputs])

    return <>
    {showToolTip()}
    <UsePortal
        callback={() => {}}
        setIsModalOpen={setIsCategoryModalOpen}
        isModalOpen={isCategoryModalOpen}
        headerIcon={headerIcon}
        title={titleModal}
        containerWidth={500}
        >
            <form
            onSubmit={handleSubmit}>
                <div className={classes.modal__wrapper}>
                    <div className={classes.inputNameCategory}>
                        <label className={classes.title} htmlFor="categoryName">{labelText}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            setFormValue={{type: 'name', callback: setNameValue}}
                            isInputMustClear={!isCategoryModalOpen} 
                            inputType="name" id="categoryName" 
                            name="categoryName" placeholder="Name"/>
                        </div>
                    </div>
                    <div style={{marginTop: '16px'}}>
                        <Accordion>
                            <AccordionTab title="Select color" choosedItem={light}>
                                <div className={classes.pickBody}>
                                    {
                                        customColors.map((el,i) => 
                                            <div
                                                key={i}        
                                                onClick={(e) => changeColor(e, el)}
                                                style={{width: '24px', height: '24px', 
                                                borderRadius: '100%', backgroundColor: el, 
                                                    cursor: 'pointer'
                                                }}>
                                            </div>)
                                    }
                                </div>
                            </AccordionTab>
                            <AccordionTab title="Select icon" choosedItem={iconDisplayed}>
                                <div className={classes.pickBody}>
                                    {
                                        customIcons.map( (el,i) => 
                                            <div 
                                                key={i}
                                                onClick={(e) => changeIcon(e, el)}
                                                style={{fontSize: '24px', 
                                                cursor: 'pointer'}}>
                                                <i  style={{color: 'var(--main-text)'}}
                                                    className={el}></i>
                                            </div>)
                                    }
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
                <div className={classes.confirmBtnWrapper}>
                    <CustomButton
                        isPending={isCategoryCreating || isCategoryUpdating}
                        children="Confirm"
                        btnWidth={170}
                        btnHeight={36}
                        icon="submit"
                        type='primary'
                        callback={handleSubmit}
                        className={`btn-primary`} />
                </div>
            </form>
    </UsePortal>
</>};
  
export default React.memo(CategoryModal);
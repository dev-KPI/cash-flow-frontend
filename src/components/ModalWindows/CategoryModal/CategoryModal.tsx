import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo } from "react";

//UI
import classes from './CategoryModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import { customColors, customIcons } from "@services/UsefulMethods/UIMethods";
import { notify } from "src/App";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
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

const CategoryModal: FC<ICategoryModalProps> = ({ isCategoryModalOpen, setIsCategoryModalOpen, mode, groupId, Categories, categoryId }) => {

    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    const titleModal = 'Category'

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
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

    const initializeSubmit = useCallback(() => {
        if(!isCategoryModalOpen && isSubmitted){
            setIsSubmitted(false)
            setIsInputError(false);
        } 
    }, [isSubmitted, isCategoryModalOpen])

    const [isInputError, setIsInputError] = useState<boolean>(false);

    const onCreateCategory = async () => {
        if (groupId && nameValue && icon && pickedColor && !isCategoryCreating) {
            try {
                const isCreatedCategory = await createCategory({
                    group_id: groupId,
                    title: nameValue,
                    icon_url: icon,
                    color_code: pickedColor,
                }).unwrap()
                if (isCreatedCategory) {
                    notify('success', `You created ${nameValue} category`)
                }
            } catch (err) {
                console.error('Failed to create category: ', err)
                notify('error', `You haven't created ${nameValue} category`)
            }
        }
    }
    const onUpdateCategory = async () => {
        if (groupId && nameValue && categoryId && icon && pickedColor && !isCategoryUpdating) {
            try {
                const isUpdatedCategory = await updateCategory({
                    group_id: groupId,
                    category_id: categoryId,
                    title: nameValue,
                    icon_url: icon,
                    color_code: pickedColor,
                }).unwrap()
                if (isUpdatedCategory) {
                    notify('success', `You updated ${nameValue} category`)
                }
            } catch (err) {
                console.error('Failed to create category: ', err)
                notify('error', `You haven't updated ${nameValue} category`)
            }
        }
    }

    const handleSubmit = () => {
        if(isSubmitted && nameValue.replace(/\s/gm, '').length > 0) {
            setIsInputError(false);
            if(mode === 'create'){
                onCreateCategory();
                closeModalHandler();
            } else if(mode === 'edit' && categoryId){
                if (!(nameValue === getSelectedCategory?.category.title && getSelectedCategory?.color_code === pickedColor 
                    && getSelectedCategory?.icon_url === icon && !isCategoryUpdating)) {
                    onUpdateCategory();
                } else {
                    notify('info', 'Category not updated')
                }
                closeModalHandler();
            }
        } else if (isSubmitted && nameValue.replace(/\s/gm, '').length < 1) {
            setIsInputError(true)
            setIsSubmitted(false);
        }
    }

    const closeModalHandler = () => {
        setIsSubmitted(false);
        setIsCategoryModalOpen(false);
        setIsInputError(false);
    }

    let labelText = 'Name of the category:';

    useEffect(() => initializeModalInputs(), [initializeModalInputs])
    useEffect(() => handleSubmit(), [handleSubmit])
    useEffect(() => initializeSubmit(), [initializeSubmit])

    return <>
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
                    {mode === 'create' ? <div className={classes.inputNameCategory}>
                        <label className={classes.title} htmlFor="categoryName">{labelText}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            isError={isInputError}
                            setFormValue={{type: 'name', callback: setNameValue}}
                            isInputMustClear={!isCategoryModalOpen} 
                            inputType="name" id="categoryName" 
                            name="categoryName" placeholder="Name"/>
                        </div>
                    </div> : null}
                    <div style={{marginTop: mode === 'edit' ? '0px' : '24px'}}>
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
                        callback={() => {setIsSubmitted(true); handleSubmit()}}
                        className={`btn-primary`} />
                </div>
            </form>
    </UsePortal>
</>};
  
export default React.memo(CategoryModal);
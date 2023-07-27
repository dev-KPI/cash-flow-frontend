import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction } from "react";

//UI
import classes from './CategoryModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import { customColors, customIcons } from "@services/UsefulMethods/UIMethods";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";

interface ICategoryModalProps{
    isCategoryModalOpen: boolean
    setIsCategoryModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'create' | 'edit'
}
interface IModalState {
    name: string
    color: string
}

const CategoryModal: FC<ICategoryModalProps> = ({ isCategoryModalOpen, setIsCategoryModalOpen, mode }) => {

    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    const titleModal = 'Category'
    const [nameValue, setNameValue] = useState<string>('');
    const [colorValue, setColorValue] = useState<string>('');

    //submit
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [shouldShowTooltip, setShouldShowTooltip] = useState<boolean>(false);

    //pickers
    const [pickedColor, setPickedColor] = useState<string>('#FF2D55');
    const changeColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {setPickedColor(color)};
    const light = <div style={{backgroundColor: pickedColor, boxShadow: '0px 0px 8px ' + pickedColor}} className={classes.colorPicked}></div>

    const [icon, setIcon] = useState<string>('bi bi-people');
    const changeIcon = (e: React.MouseEvent<HTMLDivElement>, icon: string) => {setIcon(icon)};
    const iconDisplayed = <i style={{fontSize: '24px', color: 'var(--main-text)'}} className={icon}></i>
    
    const postObject: IModalState = {
        name: nameValue,
        color: colorValue
    };

    const handleSubmit = async() => {
        setIsSubmiting(true)
        await setTimeout(() => {
            setShouldShowTooltip(true)
            setIsSubmiting(false);
            alert(JSON.stringify(postObject, null, 2));
            setIsCategoryModalOpen(false);
        }, 3000);
    }
    const showToolTip = useCallback(() => {
        if (shouldShowTooltip) {
            return <StatusTooltip
            type="success" 
            title="Category successfully added"/>
        }
    }, [shouldShowTooltip])
    let labelText = '';
    if (mode === 'create') {
        labelText = 'Please сreate new category:'
    } else if (mode === 'edit') {
        labelText = 'Please enter the name of the category:'
    }
    return <>
    {showToolTip()}
    <UsePortal
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
                        isPending={isSubmiting}
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
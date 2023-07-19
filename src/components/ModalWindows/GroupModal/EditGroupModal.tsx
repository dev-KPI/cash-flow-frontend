import React, {FC, ReactNode, useState, useCallback} from "react";
import { useWindowSize } from "usehooks-ts";

//UI
import classes from './GroupModal.module.css';
import UseModal from "@hooks/layoutHooks/useModal/useModal";
import Input from "@components/Input/Input";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import uuid from "react-uuid";
        
//logic
interface IGroupModalProps{
    isGroupModalOpen: boolean
    setIsGroupModalOpen: (value: boolean) => void
}
interface IModalState {
    name: string
    color: string
}

const EditGroupModal: FC<IGroupModalProps> = ({ isGroupModalOpen = false, setIsGroupModalOpen }) => {

    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    const titleModal = 'Group'
    const [nameValue = '', setNameValue] = useState<string>('');
    const [colorValue = '', setColorValue] = useState<string>('');
    const {width} = useWindowSize()

    //submit
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [shouldShowTooltip , setShouldShowTooltip] = useState<boolean>(false);

    //pickers
    const [pickedColor, setPickedColor] = useState<string>('#FF2D55');
    const changeColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {setPickedColor(color)};
    const light = <div style={{backgroundColor: pickedColor, boxShadow: '0px 0px 8px ' + pickedColor}} className={classes.colorPicked}></div>
    const colors: string[] = [
        '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00',
        '#CCFF00', '#99FF00', '#66FF00', '#33FF00', '#00FF00', '#00FF33',
        '#00FF66', '#00FF99', '#00FFCC', '#00FFFF', '#00CCFF', '#0099FF',
        '#0066FF', '#0033FF', '#0000FF', '#3300FF', '#6600FF', '#9900FF',
        '#CC00FF', '#FF00FF', '#FF00CC', '#FF0099', '#FF0066', '#FF0033',
        '#FF0000', '#FF3300', '#FF6600', '#FF9900', '#FFCC00', '#FFFF00'
    ];

    const [icon = 'bi bi-people', setIcon] = useState<string>('');
    const changeIcon = (e: React.MouseEvent<HTMLDivElement>, icon: string) => {setIcon(icon)};
    const iconDisplayed = <i style={{fontSize: '24px', color: 'var(--main-text)'}} className={icon}></i>
    const icons: string[] = [
        'bi bi-people', 'bi bi-activity', 'bi bi-alarm', 'bi bi-alipay', 'bi bi-apple', 'bi bi-android2',
        'bi bi-archive', 'bi bi-arrow-through-heart', 'bi bi-badge-3d', 'bi bi-badge-wc', 'bi bi-badge-vr', 'bi bi-bag-check',
        'bi bi-bag-heart', 'bi bi-bank', 'bi bi-bezier2', 'bi bi-basket2', 'bi bi-bandaid', 'bi bi-balloon',
        'bi bi-box-seam', 'bi bi-bookshelf', 'bi bi-boombox', 'bi bi-book', 'bi bi-binoculars', 'bi bi-bicycle',
        'bi bi-cup-hot', 'bi bi-cart', 'bi bi-camera', 'bi bi-calendar-date', 'bi bi-bus-front', 'bi bi-briefcase',
        'bi bi-airplane', 'bi bi-globe', 'bi bi-emoji-smile', 'bi bi-display', 'bi bi-database', 'bi bi-credit-card-2-front',
    ]

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
            setIsGroupModalOpen(false);
        }, 3000);
    }
    const showToolTip = useCallback(() => {
        if (shouldShowTooltip) {
            return <StatusTooltip
            type="success" 
            title="Group successfully added"/>
        }
    }, [shouldShowTooltip])

    return <>
    {showToolTip()}
    <UseModal
        modalName="editGroupModal"
        containerWidth={500}
        containerHeight={660}
        setIsModalOpen={setIsGroupModalOpen}
        isModalOpen={isGroupModalOpen}
        >
            <form
            onSubmit={handleSubmit}>
                <div 
                style={{
                    paddingTop: width > 768 ? '' : '32px',
                }}
                className={classes.Header}>
                    <div className={classes.Icon}>
                        {headerIcon}
                    </div>
                    <h3>{titleModal}</h3>
                    <div className={classes.closeBtn}>
                        <CloseButton closeHandler={() => setIsGroupModalOpen(false)}/>
                    </div>
                </div>
                <div className={classes.line}></div>
                <div className={classes.modal__wrapper}>
                    <div className={classes.inputNameGroup}>
                        <label className={classes.title} htmlFor="groupName">Please enter the name of the group:</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            setFormValue={{type: 'name', callback: setNameValue}}
                            isInputMustClear={!isGroupModalOpen} 
                            inputType="name" id="groupName" 
                            name="groupName" placeholder="Name"/>
                        </div>
                    </div>
                    <div className={classes.textAreaGroup}>
                        <label className={classes.title} htmlFor="groupDesc">Description:</label>
                        <div className={classes.textAreaWrapper}>
                            <Input
                            setFormValue={{type: 'area', callback: setNameValue}}
                            isInputMustClear={!isGroupModalOpen} 
                            inputType="area" id="groupDesc" 
                            name="groupDesc" placeholder="Description"/>
                        </div>
                    </div>
                    <div style={{marginTop: '16px'}}>
                        <Accordion>
                            <AccordionTab title="Select color" choosedItem={light}>
                                <div className={classes.pickBody}>
                                    {
                                        colors.map( (el, i) => 
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
                                        icons.map((el,i) => 
                                            <div 
                                                key={i}
                                                onClick={(e) => changeIcon(e, el)}
                                                style={{fontSize: '24px', 
                                                cursor: 'pointer'}}>
                                                <i style={{color: 'var(--main-text)'}} className={el}></i>
                                            </div>)
                                    }
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </div>
                    <div className={classes.confirmBtnWrapper}>
                        <CustomButton
                            isPending={false}
                            children="Disband"
                            btnWidth={170}
                            btnHeight={36}
                            icon="disband"
                            type='danger'
                            background="outline"
                            disableScale={true}
                            callback={() => { }}
                        />
                        <CustomButton
                            isPending={isSubmiting}
                            children="Confirm"
                            btnWidth={170}
                            btnHeight={36}
                            icon="submit"
                            type='primary'
                            callback={handleSubmit}
                        />
                    </div>
                </div>
            </form>
    </UseModal>
</>};
  
export default React.memo(EditGroupModal);
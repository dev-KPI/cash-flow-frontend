import React, { FC, useEffect, useState, useMemo, ReactNode, FormEvent } from "react";

//logic
import { IInputProps } from "./InputTypes";
//UI
import classes from './Input.module.css'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const Input: FC<IInputProps> = ({
    inputType, 
    setFormValue, 
    placeholder, 
    Icon, 
    name, 
    id, 
    isInputMustClear
    }) => {

    const [inputNumberValue = 0, setInputNumberValue] = useState<number>();
    const [inputStringValue = '', setInputStringValue] = useState<string>();

    useMemo(() => {
        if(isInputMustClear){
            setInputNumberValue(0)
            setInputStringValue('')
        }
    }, [isInputMustClear, inputNumberValue])

    //----------------------------------------------{CASH INPUT}-----------------------------------------------------
    const cashInput = <InputNumber 
        onValueChange={(e: InputNumberValueChangeEvent) => {
            setInputNumberValue(+(e.value!))
            if (setFormValue.type === 'cash') {
                setFormValue.callback(+(e.value!))
            }
        }} 
        min={0}
        maxLength={22}
        minFractionDigits={2} 
        maxFractionDigits={2}
        inputStyle={{
            backgroundColor: 'var(--cardBg)',
            paddingLeft: Icon ? '' : '12px',
        }}
        inputClassName={classes.Input} 
        value={inputNumberValue} 
        name={name} 
        id={id}/>
    //----------------------------------------------{TEXT INPUT}-----------------------------------------------------
    const textInput = <InputText
        onInput={(e: FormEvent<HTMLInputElement>) => {
            setInputStringValue(e.currentTarget.value)
            if (setFormValue.type === 'text') { 
                setFormValue.callback(e.currentTarget.value)
            }
        }} 
        min={0}
        maxLength={46}
        style={{
            backgroundColor: 'var(--cardBg)',
            borderRadius: '10px',
            paddingLeft: Icon ? '' : '12px',
        }}
        className={classes.Input} 
        value={inputStringValue}
        name={name} 
        id={id}/>

    //splitter for inputs
    const getCurrentInput: ReactNode = 
    inputType === 'cash' ? cashInput :  
    inputType === 'text' ? textInput : <></>;

    return(<>
        <div className={classes.wrapper}>
            {Icon && 
            <div className={classes.Icon__wrapper}>
                {Icon}
            </div>}
            {getCurrentInput}
        </div>
    </>)
}

export default Input
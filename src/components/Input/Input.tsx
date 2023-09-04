import React, { FC, useEffect, useState, useMemo, ReactNode, FormEvent } from "react";

//logic
import { IInputProps } from "./InputTypes";
//UI
import classes from './Input.module.css'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
        

const Input: FC<IInputProps> = ({
    value = '',
    inputType, 
    isError = false,
    setIsError = () => {},
    setFormValue, 
    placeholder, 
    Icon, 
    name, 
    id, 
    isInputMustClear
    }) => {

    const [inputNumberValue, setInputNumberValue] = useState<number>(0);
    const [inputStringValue, setInputStringValue] = useState<string>(value ?? '');

    useEffect(() => {
        if (setFormValue.type === 'cash') {
            setFormValue.callback(inputNumberValue)
        } else {
            setFormValue.callback(inputStringValue)
        }
    }, [])

    const inputErrorClass = useMemo(() => {
        return (isError ? classes.errorInput : '')
    }, [isError])  

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
        minFractionDigits={1} 
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
        min={3}
        maxLength={46}
        style={{
            height: '50px',
            backgroundColor: 'var(--cardBg)',
            borderRadius: '10px',
            paddingLeft: Icon ? '' : '12px',
        }}
        className={classes.Input} 
        value={inputStringValue}
        name={name} 
        id={id}/>
    //----------------------------------------------{NAME INPUT}-----------------------------------------------------  
    const nameInput = <InputText
        onInput={(e: FormEvent<HTMLInputElement>) => {
            const regExp = /^\s*(.*?)\s*$/g
            if (setFormValue.type === 'name') { 
                setFormValue.callback(e.currentTarget.value.replace(regExp, '$1'));
            }
            setInputStringValue(e.currentTarget.value);
        }} 
        min={3}
        maxLength={16}
        style={{
            height: '50px',
            maxHeight: '50px',
            backgroundColor: 'var(--cardBg)',
            borderRadius: '10px',
            paddingLeft: Icon ? '' : '12px',
        }}
        className={classes.Input} 
        value={inputStringValue}
        name={name} 
        id={id}/>
    //----------------------------------------------{AREA INPUT}-----------------------------------------------------
    const areaInput = <InputTextarea
    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputStringValue(e.currentTarget.value)
        if (setFormValue.type === 'area') {
            setFormValue.callback(e.currentTarget.value)
        }
    }} 
    minLength={3}
    maxLength={200}
    style={{
        fontFamily: 'inter',
        height: '100px',
        resize: 'none', 
        border: 'none',
        backgroundColor: 'var(--cardBg)',
        borderRadius: '10px',
        paddingLeft: Icon ? '' : '12px',
    }}
    className={classes.Input} 
    value={inputStringValue}
    name={name} 
    id={id}/>
    

    const getInputError = useMemo(() => {
        console.log(isError)
        return (isError) ? <div className={classes.errorLabel}>
            <label>This field is required</label>
        </div> : null
    }, [isError])

    //splitter for inputs
    const getCurrentInput: ReactNode = 
    inputType === 'cash' ? cashInput :  
    inputType === 'text' ? textInput :
    inputType === 'name' ? nameInput :
    inputType === 'area' ? areaInput : <></>;

    return(<>
        <div className={classes.wrapper + ' ' + inputErrorClass}>
            {Icon && 
            <div className={classes.Icon__wrapper}>
                {Icon}
            </div>}
            {getCurrentInput}
        </div>
        {getInputError}
    </>)
}

export default Input
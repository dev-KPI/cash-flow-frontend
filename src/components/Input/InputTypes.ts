import {ReactNode} from 'react'

export interface ICashInputCallback { 
    type: 'cash'
    callback: (value: number) => void 
}
export interface ITextInputCallback { 
    type: 'text'
    callback: (value: string) => void 
}
export interface INameInputCallback {
    type: 'name'
    callback: (value: string) => void
}
export interface IAreaInputCallback {
    type: 'area'
    callback: (value: string) => void
}
export interface IInputProps {
    value?: string
    cashValue?: number,
    setFormValue: ICashInputCallback  | ITextInputCallback | INameInputCallback | IAreaInputCallback
    placeholder?: string | number
    Icon?: ReactNode,
    isError?: boolean,
    setIsError?: React.Dispatch<React.SetStateAction<boolean>>
    name: string
    id: string
    MinMaxValidate?: {min: number} | {max: number} | {min: number, max: number}
    inputType: 'cash' | 'text' | 'name' | 'area' |'else'
    isInputMustClear: boolean,
    errorMessage?: string
}
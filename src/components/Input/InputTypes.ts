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
    setFormValue: ICashInputCallback  | ITextInputCallback | INameInputCallback | IAreaInputCallback
    placeholder?: string | number
    Icon?: ReactNode
    name: string
    id: string
    inputType: 'cash' | 'text' | 'name' | 'area' |'else'
    isInputMustClear: boolean
}
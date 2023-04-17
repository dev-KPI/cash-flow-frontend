import {ReactNode} from 'react'

export interface ICashInputCallback { 
    type: 'cash'
    callback: (value: number) => void 
}
export interface ITextInputCallback { 
    type: 'text'
    callback: (value: string) => void 
}

export interface IInputProps {
    setFormValue: ICashInputCallback  | ITextInputCallback
    placeholder?: string | number
    Icon?: ReactNode
    name: string
    id: string
    inputType: 'cash' | 'text' | 'else'
    isInputMustClear: boolean
}
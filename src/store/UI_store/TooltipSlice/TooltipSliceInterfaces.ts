export interface ITooltip{
    shouldShowTooltip: false,
    textTooltip: '',
    status: 'success' | 'error'
}
export default interface ITooltipState { 
    tooltip: ITooltip
}
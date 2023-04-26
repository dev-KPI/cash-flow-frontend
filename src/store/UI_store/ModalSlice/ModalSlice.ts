import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//types
import { IModalState, TTypeModal } from './ModalSliceInterfaces'

const initialState: IModalState = {
    isModalOpen: false,
    typeModal: 'none',
}

export const ModalSlice = createSlice({
    name: 'MonthPickerSlice',
    initialState,
    reducers: {
        openCurrentModal: (initialState: IModalState, action: PayloadAction<TTypeModal>): void => {
            initialState.isModalOpen = true;
            initialState.typeModal = action.payload;
        },
        closeCurrentModal: (initialState: IModalState): void => {
            initialState.isModalOpen = false;
            initialState.typeModal = 'none';
        }
    },
})

export const { reducer: ModalSliceReducer, actions: ModalSliceActions } = ModalSlice;

export default ModalSlice.reducer
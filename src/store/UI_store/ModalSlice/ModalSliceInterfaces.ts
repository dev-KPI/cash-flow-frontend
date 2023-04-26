export type TTypeModal = 'expense' | 'salary' | 'none'

export interface IModalState {
    isModalOpen: boolean
    typeModal: TTypeModal
}
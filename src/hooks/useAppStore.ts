import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from '@store/store'
import { useMemo } from 'react'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
    const dispatch = useAppDispatch();
    return useMemo(() => bindActionCreators(actions, dispatch), []);
}
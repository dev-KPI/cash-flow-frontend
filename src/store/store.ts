import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';

//slices
import MonthPickerSlice from '@UI_store/MonthPickerSlice/MonthPickerSlice';
import ThemeSlice from '@UI_store/ThemeSlice/ThemeSlice';
import UserSlice from './User/UserSlice';
import TooltipSlice from '@UI_store/TooltipSlice/TooltipSlice';

import { api } from './api';

export const persistConfig = {
    key: 'root',
    storage,
}

//Theme

const persistedThemeSlice = persistReducer(persistConfig, ThemeSlice);
const persistedUserSlice = persistReducer(persistConfig, UserSlice);

const devToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = configureStore({
    reducer: {
        persistedThemeSlice,
        persistedUserSlice,
        MonthPickerSlice,
        TooltipSlice,
        [api.reducerPath]: api.reducer,
    },
    devTools: devToolsCompose,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(api.middleware)
})

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;
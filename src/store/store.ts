import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

//slices
import UserSlice from './UserSlice/UserSlice';
import DatePickerSlice from '@UI_store/MonthPickerSlice/MonthPickerSlice';
import ThemeSlice from '@UI_store/ThemeSlice/ThemeSlice';

export const persistConfig = {
    key: 'root',
    storage,
}

//persisted Slices
    //Theme
const persistedThemeSlice = persistReducer(persistConfig, ThemeSlice);
    //UI
const persistedUserSlice = persistReducer(persistConfig, UserSlice)
const persistedDatePickerSlice = persistReducer(persistConfig, DatePickerSlice);

const devToolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
export const store = configureStore({
    reducer: {
        persistedUserSlice,
        persistedDatePickerSlice,
        persistedThemeSlice
    },
    devTools: devToolsCompose,
    middleware: [thunk]
})

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;
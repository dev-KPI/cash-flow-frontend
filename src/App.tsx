import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useCallback, useEffect } from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom/client';

//router
import Router from './router/router';
//store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';


const App: React.FC = () => {

    const {data: AuthStatus, isError: isAuthError, isFetching: isAuthFetching} = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);

    const initializeAuthorization = useCallback(() => {
        if (!isAuthFetching){
            UserSliceDispatch.setIsAuth(AuthStatus);
        } 
    }, [AuthStatus, isAuthError, isAuthFetching])

    useEffect(() => {
        initializeAuthorization()
        ThemeDispatch.initializeTheme()
    },[ThemeDispatch, UserSliceDispatch, AuthStatus, initializeAuthorization]);

    return (
        <Router />
    )
};

export default App;
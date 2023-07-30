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
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
import { GroupSliceActions } from '@store/Group/GroupSlice';
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';


const App: React.FC = () => {

    const {data: AuthStatus, isError: isAuthError, isLoading: isAuthLoading} = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    
    const initializeAuth = useCallback(() => {
        if (!isAuthLoading){
            UserSliceDispatch.setIsAuth(AuthStatus);
        } 
    }, [AuthStatus, isAuthError, isAuthLoading])

    useEffect(() => {
        ThemeDispatch.initializeTheme()
        initializeAuth()
    },[initializeAuth]);

    return (<>
        {(!isAuthLoading) ? <Router /> : <PageGlobalLoader/>}
    </>)
};

export default App;
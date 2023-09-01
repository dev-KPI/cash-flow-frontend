import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useCallback, useEffect, useMemo } from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom/client';

//router
import Router from './router/router';
//store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';
import StatusTooltip from '@components/StatusTooltip/StatusTooltip';
import IGroupState from '@store/Group/GroupInterfaces';


const App: React.FC = () => {

    const {data: AuthStatus, isError: isAuthError, isLoading: isAuthLoading} = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    const GroupsStore = useAppSelector<IGroupState>(store => store.persistedGroupSlice)
    const GroupsDispatch = useActionCreators(GroupSliceActions)
    
    const initializeAuth = useCallback(() => {
        if (!isAuthLoading){
            UserSliceDispatch.setIsAuth(AuthStatus);
        } 
    }, [AuthStatus, isAuthError, isAuthLoading])

    const showToolTip = useMemo(() => {
        if(GroupsStore.tooltip.shouldShowTooltip){
            return <StatusTooltip
                type={GroupsStore.tooltip.status}
                title={GroupsStore.tooltip.textTooltip} />
        }
    }, [GroupsStore.tooltip.shouldShowTooltip])

    useEffect(() => {
        ThemeDispatch.initializeTheme()
        initializeAuth()
    },[initializeAuth]);

    return (<>
        {showToolTip}
        {(!isAuthLoading) ? <Router /> : <PageGlobalLoader/>}
    </>)
};

export default App;
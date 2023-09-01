import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useCallback, useEffect, useMemo } from 'react';
import './styles/style.css';
import ReactDOM from 'react-dom/client';

//UI
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';
import StatusTooltip from '@components/StatusTooltip/StatusTooltip';
//router
import Router from './router/router';
//store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';
import { TooltipSliceActions } from '@store/UI_store/TooltipSlice/TooltipSlice';
import ITooltipState from '@store/UI_store/TooltipSlice/TooltipSliceInterfaces';


const App: React.FC = () => {

    const {data: AuthStatus, isError: isAuthError, isLoading: isAuthLoading} = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    const TooltipStore = useAppSelector<ITooltipState>(store => store.TooltipSlice)
    const TooltipDispatch = useActionCreators(TooltipSliceActions)
    
    const initializeAuth = useCallback(() => {
        if (!isAuthLoading){
            UserSliceDispatch.setIsAuth(AuthStatus);
        } 
    }, [AuthStatus, isAuthError, isAuthLoading])

    const showToolTip = useMemo(() => {
        if(TooltipStore.tooltip.shouldShowTooltip){
            return <StatusTooltip
                type={TooltipStore.tooltip.status}
                title={TooltipStore.tooltip.textTooltip} />
        }
    }, [TooltipStore.tooltip.shouldShowTooltip])

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
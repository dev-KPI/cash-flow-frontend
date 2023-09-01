import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles/style.css';

// UI
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';
import StatusTooltip from '@components/StatusTooltip/StatusTooltip';
// Router
import Router from './router/router';
// Store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';
import ITooltipState from '@store/UI_store/TooltipSlice/TooltipSliceInterfaces';

const App: React.FC = () => {
    const { data: AuthStatus, isError: isAuthError, isLoading: isAuthLoading } = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    const TooltipStore = useAppSelector<ITooltipState>((store) => store.TooltipSlice);

    const initializeAuth = useCallback(() => {
        if (!isAuthLoading) {
            UserSliceDispatch.setIsAuth(AuthStatus);
        }
    }, [AuthStatus, isAuthError, isAuthLoading]);

    const showToolTip = useMemo(() => {
        if (TooltipStore.tooltip.shouldShowTooltip) {
            return <StatusTooltip type={TooltipStore.tooltip.status} title={TooltipStore.tooltip.textTooltip} />;
        }
    }, [TooltipStore.tooltip.shouldShowTooltip]);

    useEffect(() => {
        ThemeDispatch.initializeTheme();
        initializeAuth();
    }, [initializeAuth]);

    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const preloaderTimeout = setTimeout(() => {
            setShowPreloader(false);
        }, 1600);

        return () => {
            clearTimeout(preloaderTimeout);
        };
    }, []);

    return (
      <>
        {showToolTip}
        {showPreloader && <PageGlobalLoader />}
        {!isAuthLoading && <Router /> }
      </>
    );
};

export default App;
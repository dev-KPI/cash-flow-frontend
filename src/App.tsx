import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './styles/style.css';

// UI
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';
// Router
import Router from './router/router';
// Store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (type: 'success'|'error'|'info', msg: string) => {
    const toastStyles = {paddingLeft: '16px', borderRadius: '20px', backgroundColor: 'var(--cardbg)', color: 'var(--main-text)', 
    fontFamily: 'Inter', fontSize: '16px', fontWeight: '500', }
    if(type === 'success') {
        toast.success(msg, {
            style: toastStyles
        });
    } else if (type === 'error') {
        toast.error(msg, {
            style: toastStyles
        });
    } else if (type === 'info') {
        toast.info(msg, {
            style: toastStyles
        });
    }
};

const App: React.FC = () => {
    const { data: AuthStatus, isError: isAuthError, isLoading: isAuthLoading } = useGetUserAuthStatusQuery(null);

    const ThemeDispatch = useActionCreators(ThemeActions);
    const UserSliceDispatch = useActionCreators(UserSliceActions);

    const initializeAuth = useCallback(() => {
        if (!isAuthLoading) {
            UserSliceDispatch.setIsAuth(AuthStatus);
        }
    }, [AuthStatus, isAuthError, isAuthLoading]);

    useEffect(() => {
        ThemeDispatch.initializeTheme();
        initializeAuth();
    }, [initializeAuth]);

    const [showPreloader, setShowPreloader] = useState(true);

    useEffect(() => {
        const preloaderTimeout = setTimeout(() => {
            setShowPreloader(false);
        }, 1550);

        return () => {
            clearTimeout(preloaderTimeout);
        };
    }, []);

    return (
      <>
        <ToastContainer
        closeButton={false}
        position='top-right'
        autoClose={3000}/>
        {showPreloader && <PageGlobalLoader />}
        {!isAuthLoading && <Router /> }
      </>
    );
};

export default App;
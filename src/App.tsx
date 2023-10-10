import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// UI
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/style.css';
// Router
import Router from './router/router';
// Store
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
import { useActionCreators } from '@hooks/storeHooks/useAppStore';
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { UserSliceActions } from '@store/User/UserSlice';



export const notify = (type: 'success'|'error'|'info', msg: string | ReactNode) => {
    const toastStyles = {
        paddingLeft: '16px',
        borderRadius: '20px',
        backgroundColor: 'var(--cardbg)',
        color: 'var(--main-text)', 
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: '500',
    }
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
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        ThemeDispatch.initializeTheme();
    }, [])

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
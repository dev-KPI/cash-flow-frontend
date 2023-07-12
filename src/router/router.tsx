import React, { FC, useEffect, useState, useCallback } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { DASHBOARD_PAGE, components, routesAuth, groupRoutes, routesNotAuth } from './routes'
import { useAuthState } from 'react-firebase-hooks/auth' 
import { auth } from '@services/Auth/firebaseInitialization';
//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import Dashboard from '@pages/Dashboard/Dashboard';


const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        ThemeDispatch.initializeTheme()
    },[]);


    const BrowserRoutesForNotAuth = createBrowserRouter([
        {
            element: <Outlet />,
            children: [
                ...routesNotAuth.map(({ path, component: Component }) =>
                ({
                    path: path,
                    element: < Component />
                })
                )
            ]
        }
    ])
    const BrowserRoutesForAuth = createBrowserRouter([
        {
            // path: "*",
            element: <MainLayout/>,
            children: [
                ...routesAuth.map(({ path, component: Component }) =>
                    ({
                        path: path,
                        element: < Component />
                    }),{
                        path: '*',
                        element: <Navigate to="/dashboard" />,
                    },
                )
            ]    
        },
        {
            // path: "/group",
            element: <GroupLayout />,
            children: [
                ...groupRoutes.map(({ path, component: Component }) =>
                ({
                    path: path,
                    element: < Component />
                })
                )
            ]
        },
    ])
    
    return <RouterProvider router={user ? BrowserRoutesForAuth : BrowserRoutesForNotAuth}/>
}

export default Router;



export const GroupLayout = () => {
    return (<>
        <Header />
        <GroupHeader />
        <Outlet/>
        <Footer />
    </>
    );
}
export const MainLayout = () => {
    return (<>
        <Header />
        <Outlet />
        <Footer />
    </>)
}

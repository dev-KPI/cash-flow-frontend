import React, { FC, useEffect, useState, useCallback } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { routesAuth, groupRoutes, routesNotAuth } from './routes'
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import { useGetUserAuthStatusQuery } from '@store/Controllers/UserController/UserController';
//UI
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';


const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);
    const {data: AuthStatus, isError, isFetching} = useGetUserAuthStatusQuery(null);
    console.log(AuthStatus)
    
    useEffect(() => {
        ThemeDispatch.initializeTheme()
    },[ThemeDispatch]);


    const BrowserRoutesForNotAuth = createBrowserRouter([
        {
            element: <Outlet />,
            children: [...routesNotAuth.map(({ path, component: Component }) =>
                ({
                    path: path,
                    element: < Component />
                })
                ),{
                    path: '*',
                    element: <Navigate to="/login" />,
                },
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
                    })
                ),{
                    path: '/login',
                    element: <Navigate to="/dashboard" />,
                },{
                    path: '*',
                    element: < NotFound />
                }
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
    
    return <RouterProvider router={AuthStatus?.status ? BrowserRoutesForAuth : BrowserRoutesForNotAuth}/>
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

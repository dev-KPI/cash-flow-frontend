import React, { FC, useEffect, useState, useCallback } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { DASHBOARD_PAGE, components, routesAuth, groupRoutes, routesNotAuth } from './routes'
import { useAuthState } from 'react-firebase-hooks/auth' 
import { auth } from '@services/Auth/firebaseInitialization';
import type { Location, Params, RouteObject } from 'react-router-dom';
//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
//UI
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import Dashboard from '@pages/Dashboard/Dashboard';
import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';


const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        ThemeDispatch.initializeTheme()
    },[]);


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
                    element: < Login />
                }
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
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/login', {replace: true})
        }
        if (location.pathname === '/login'){
            navigate('/dashboard', {replace: true})
        }
    }, [user])
    return (<>
        <Header />
        <Outlet />
        <Footer />
    </>)
}

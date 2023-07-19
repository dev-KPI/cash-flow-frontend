import React, { FC, useEffect, useState, useCallback } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { routesAuth, groupRoutes, routesNotAuth } from './routes'
//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
//UI
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import Login from '@pages/Login/Login';
import NotFound from '@pages/NotFound/NotFound';


const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);

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
    
    return <RouterProvider router={BrowserRoutesForAuth}/>
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

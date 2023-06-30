import React, { FC, useEffect } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, components, routesAuth, groupRoutes } from './routes'



//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import Dashboard from '@pages/Dashboard/Dashboard';

const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);

    useEffect(()=>{
        ThemeDispatch.initializeTheme()
    }, [])

    const BrowserRoutes = createBrowserRouter([
        {
            // path: "/",
            element: <MainLayout/>,
            children: [
                {  
                    path: '/dashboard',
                    element: <Dashboard/>
                },
                ...routesAuth.map(({ path, component: Component }) =>
                ({
                    path: path,
                    element: < Component />
                })
                ),
                {
                    path: '*',
                    element: <Navigate to="/dashboard" />,
                },
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
        }
    ])
    return <RouterProvider router={BrowserRoutes}/>
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

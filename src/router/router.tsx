import { FC } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { routesAuth, groupRoutes, routesNotAuth } from './routes'
//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import IUserState from '@store/User/UserInterfaces';

//UI
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import NotFound from '@pages/NotFound/NotFound';
import GroupLayout from './GroupRouter';



const Router: FC = () => {

    const UserSliceStore = useAppSelector<IUserState>(state => state.persistedUserSlice)

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
            element: <MainLayout/>,
            children: [
                ...routesAuth.map(({ path, component: Component }) =>
                    ({
                        path: path,
                        element: < Component />
                    })
                ),{
                    path: '/',
                    element: <Navigate to="/dashboard" />,
                },{
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
    
    return <RouterProvider router={UserSliceStore.isAuth ? BrowserRoutesForAuth : BrowserRoutesForNotAuth}/>
}

export default Router;



export const MainLayout = () => {
    return (<>
        <Header />
        <Outlet />
        <Footer />
    </>)
}

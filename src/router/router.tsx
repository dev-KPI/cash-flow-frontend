import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import {createBrowserRouter,RouterProvider, Outlet, Navigate, useParams } from 'react-router-dom';
import { routesAuth, groupRoutes, routesNotAuth } from './routes'
import { Router as RemixRouter } from "@remix-run/router";
//store
import { UserSliceActions } from '@store/User/UserSlice';
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import IUserState from '@store/User/UserInterfaces';
import { GroupSliceActions } from '@store/Group/GroupSlice';
import { useGetCurrentUserGroupsQuery, useGetInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import GroupHeader from '@pages/Group/GroupHeader/GroupHeader';
import NotFound from '@pages/NotFound/NotFound';
import GroupLayout from './GroupRouter';



const Router: FC = () => {

    const UserSliceStore = useAppSelector<IUserState>(state => state.persistedUserSlice)

    const { groupId } = useParams<{ groupId: string }>();
    const GroupsSliceDispatch = useActionCreators(GroupSliceActions);
    const {data: UserGroups, isError: isUserGroupsError, isLoading: isUserGroupsLoading} = useGetCurrentUserGroupsQuery(null);

    const intitializeBaseGroup = useCallback(() => {
        if (!isUserGroupsLoading && !isUserGroupsError && UserGroups?.user_groups[0]?.group.id){
            GroupsSliceDispatch.setDefaultGroup(UserGroups.user_groups[0].group.id)
        } else {
            GroupsSliceDispatch.setDefaultGroup(0)
        }
    }, [UserGroups, isUserGroupsError, isUserGroupsLoading])

    useEffect(() => {
        intitializeBaseGroup()
    }, [intitializeBaseGroup])

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

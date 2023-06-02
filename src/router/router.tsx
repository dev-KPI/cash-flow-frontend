import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, components, routesAuth, routesMobileNavigation } from './routes'

//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);

    useEffect(()=>{
        ThemeDispatch.initializeTheme()
    }, [])

    return (<>
        <Header/>
            <Routes>
                {routesAuth.map(({ path, component: Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                {routesMobileNavigation.map(({ path, component: Component }) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route
                    path="*"
                    element={<Navigate to={DASHBOARD_PAGE} replace />}
                />
            </Routes>
        <Footer/>
        </>
    )
}

export default Router;
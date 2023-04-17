import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, routesNotAuth, components } from './routes'

//store
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from '@store/UI_store/ThemeSlice/ThemeSlice';

const Router: FC = () => {

    const ThemeDispatch = useActionCreators(ThemeActions);

    useEffect(()=>{
        ThemeDispatch.initializeTheme()
    }, [])

    return (
        <Routes>
            {routesNotAuth.map(({ path, component: Component }) => 
                <Route key={path} path={path} element={<Component />} />
            )}
            {components.map(({ path, component: Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route
                path="*"
                element={<Navigate to={DASHBOARD_PAGE} replace />}
            />
        </Routes>
    )
}

export default Router;
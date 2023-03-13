import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, routesNotAuth, components } from './routes'
import { isThemeInStorage } from '../localStorage/theme';


const Router: FC = () => {

    useEffect(()=>{
        isThemeInStorage()
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
import React, { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, routesNotAuth, components } from './routes'

const Router: FC = () => {
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
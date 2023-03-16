import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, routesNotAuth, components } from './routes'

//store
import { ThemeActions } from '../store/UI_store/ThemeSlice/ThemeSlice';
import { useAppDispatch } from '../hooks/useAppStore';

const Router: FC = () => {

    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(ThemeActions.setTheme())
    }, [dispatch])

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
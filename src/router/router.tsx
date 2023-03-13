import React, { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DASHBOARD_PAGE, routesNotAuth, components } from './routes'

//store
import { useAppDispatch, useAppSelector } from '../hooks/useAppStore';
import { setTheme, setThemeDefault } from "../store/ThemeSlice/ThemeSlice";


const Router: FC = () => {

    const dispatch = useAppDispatch();
    const ThemeState = useAppSelector(state => state.persistedThemeSlice);

    useEffect(()=>{
        if(ThemeState.requireReload) {dispatch(setThemeDefault())}
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
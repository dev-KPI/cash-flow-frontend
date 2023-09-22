
import React, { FC } from 'react';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { NavLink } from 'react-router-dom';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
//UI
import classes from './Breadcrumbs.module.css'


interface IBreadcrumbsProps {
    breadcrumbs: IBreadcrumb[]
}

interface IBreadcrumb {
    title: string
    link: string
}

const Breadcrumbs:FC<IBreadcrumbsProps> = ({breadcrumbs}) => {
    const { theme: actualTheme} = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.active : '';
        res += (actualTheme === 'dark' && isActive) ? ' ' + classes.shadowLink : ' ';
        return res
    }

    const getBreadcrumbs = () => {
        return breadcrumbs.map((el:IBreadcrumb, i) => {
            return (<li
                key={i}>
                <NavLink end
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to={el.link}>{el.title}
                </NavLink>
            </li>)
        })
    }
    return (
        <ul className={classes.navbar}>
            {getBreadcrumbs()}
        </ul>
    );
};

export default Breadcrumbs;
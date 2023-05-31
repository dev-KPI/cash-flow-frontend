
import React, {FC} from 'react';
//UI
import classes from './Breadcrumbs.module.css'
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { NavLink } from 'react-router-dom';

interface IBreadcrumbsProps {
    breadcrumbs: IBreadcrumb[]
}

interface IBreadcrumb {
    title: string
    link: string
}

const Breadcrumbs:FC<IBreadcrumbsProps> = ({breadcrumbs}) => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.active : classes.item;
        res += (actualTheme === 'dark' && isActive) ? ' ' + classes.shadowLink : ' ';
        return res
    }

    const getBreadcrumbs = () => {
        return breadcrumbs.map((el:IBreadcrumb, i) => {
            return (<li
                key={i}>
                <NavLink
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
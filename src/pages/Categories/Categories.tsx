import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { NavLink } from "react-router-dom";
import { CATEGORIES_PAGE } from "src/router/routes";
//UI
import classes from './Categories.module.css'
import ConfirmButton from "@components/Buttons/ConfirmButton/ConfirmButton";
import CategoriesCard from "./CategoriesCard/CategoriesCard";


const Categories: FC = () => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const [groups, setGroups] = useState<boolean>()

    const initializePage = () => {
        
    }


    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.active : classes.item;
        res += (actualTheme === 'dark' && isActive) ?  ' ' + classes.shadowLink : ' ';
        return res
    }

    const getGroups = () => {
        let res: ReactNode[] = [];
        for(let i = 0; i < 3; i++){
            res.push(<>
                <li key={'12sf3' + i}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/123"><h4>Family</h4></NavLink>
                </li>
            </>)
        }
        return res;
    }
    const getCategories = () => {
        let res: ReactNode[] = [];
        for(let i = 0; i < 7; i++){
            res.push(<>
            <li className={classes.item} key={'12sf3' + i}>
                <CategoriesCard 
                id={i}
                color="#eee333" 
                title="Family" 
                icon="bi bi-joystick"/>
            </li></>)
        }
        return res
    }
    
    return(<>
        <main id='CategoriesPage'>
            <div className={classes.CategoriesPage__container}>
                <h3>Categories</h3>
                <div className={classes.CategoriesNav}>
                    <nav className={classes.NavWrapper}>
                        <ul className={classes.navbarUl}>
                            {getGroups()}
                        </ul>
                    </nav>
                </div>
                <div className={classes.addCategory}>
                    <div className={classes.upSide}>
                        <h5>Category</h5>
                        <ConfirmButton
                        isPending={false}
                        callback={() => {console.log('add category')}}
                        type="add"
                        btnWidth={180} 
                        btnHeight={36} 
                        title="Create new category"/>
                    </div>
                    <div className={classes.line}></div>
                </div>
                <ul className={classes.CategoriesBox}>
                    {getCategories()}                    
                </ul>
            </div>
        </main>
    </>)
}

export default Categories
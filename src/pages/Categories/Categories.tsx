import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { NavLink } from "react-router-dom";
import { CATEGORIES_PAGE } from "src/router/routes";
//UI
import classes from './Categories.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import CategoriesCard from "./CategoriesCard/CategoriesCard";
import CategoryModal from "@components/ModalWindows/CategoryModal/CategoryModal";

const Categories: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const [groups = false, setGroups] = useState<boolean>();
    const [isCategoryModal = false, setIsCategoryModal] = useState<boolean>();

    const initializePage = () => {

    }

    const openModal = () => {
        setIsCategoryModal(!isCategoryModal)
        console.log(isCategoryModal)
    }

    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.active : classes.item;
        res += (actualTheme === 'dark' && isActive) ? ' ' + classes.shadowLink : ' ';
        return res
    }

    const getGroups = () => {
        let res: ReactNode[] = [];
        for (let i = 0; i < 3; i++) {
            res.push(
                <li key={'12sf3' + i}>
                    <NavLink
                        className={({ isActive }) => setActiveLinkClasses(isActive)}
                        to="/123"><h4>Family</h4></NavLink>
                </li>
            )
        }
        return res;
    }

    const getCategories = () => {
        let res: ReactNode[] = [];
        for (let i = 0; i < 7; i++) {
            res.push(
                <li className={classes.item} key={'12sf3' + i}>
                    <CategoriesCard
                        id={i}
                        color="#eee333"
                        title="Family"
                        icon="bi bi-joystick" />
                </li>)
        }
        return res
    }

    const getCategoriesModal = () => {
        return <CategoryModal
        setIsCategoryModalOpen={setIsCategoryModal}
        isCategoryModalOpen={isCategoryModal}
        />
    }

    return (<>
        {getCategoriesModal()}
        <main id='CategoriesPage'>
            <div className={classes.CategoriesPage__container}>
                <h3 className={classes.pageTitle}>Categories</h3>
                <div className={classes.CategoriesNav}>
                    <nav className={classes.NavWrapper}>
                        <ul className={classes.navbarUl}>
                            {getGroups()}
                        </ul>
                    </nav>
                </div>
                <div className={classes.addCategory}>
                    <div className={classes.upSide}>
                        <h5 className={classes.CategoryTitle}>Category</h5>
                        <CustomButton
                            isPending={false}
                            callback={() => { console.log('add category') }}
                            icon="add"
                            type="primary"
                            children="Create new category"
                            className={`btn-primary`} />
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
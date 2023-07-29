import React, { FC, useState, ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import uuid from 'react-uuid';
//logic
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";
import { useGetCategoriesByGroupQuery } from "@store/Controllers/CategoriesController/CategoriesController";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import IGroupState from "@store/Group/GroupInterfaces";
//UI
import classes from './Categories.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import CategoriesCard from "./CategoriesCard/CategoriesCard";
import CategoryModal from "@components/ModalWindows/CategoryModal/CategoryModal";
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";



const Categories: FC = () => {
    
    const GroupsStore = useAppSelector<IGroupState>(store => store.GroupSlice)

    const { data: UserGroups, isLoading: isGroupsLoading, isError: isGroupsError } = useGetCurrentUserGroupsQuery(null);
    
    const [selectedGroup, setSelectedGroup] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const { data: CategoriesByGroup, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesByGroupQuery(GroupsStore.defaultGroup)

    const [isCreateCategoryModal, setIsCreateCategoryModal] = useState<boolean>(false);
    const [isEditCategoryModal, setIsEditCategoryModal] = useState<boolean>(false);
    const [isGroupMenuModal, setIsGroupMenuModal] = useState<boolean>(false);

    const buttonRef = useRef(null);
 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        setSelectedGroup(+event.target.value)
    }
    const handleGroupModalOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsGroupMenuModal(!isGroupMenuModal)
    }

    const getGroups = () => {
        let res: ReactNode[] = [];
        let groupsItems: ReactNode[] = [];
        UserGroups?.user_groups?.map((el, i) => {
            return groupsItems.push(
                <div key={'12sf3' + i} className={classes.groupNavItem}>
                    <input
                        type='radio'
                        value={el.group.id}
                        checked={selectedGroup === el.group.id}
                        id={`group-item-${i}`}
                        name='group'
                        onChange={handleChange}
                        className={classes.inputItem} />
                    <label
                        htmlFor={`group-item-${i}`}
                        className={classes.groupTitle}
                    >{el.group.title}</label>
                </div>
            )}
        )
        res.push(groupsItems.slice(0, 3))
        res.push(<SmallModal
            key={'qwe'}
            title={'Groups'}
            active={isGroupMenuModal}
            setActive={setIsGroupMenuModal}
            className={classes.groupsModalNav}
            children={
                <div className={classes.groupModalWrapper}>
                    {groupsItems.slice(3)}
                </div>
            }
            buttonRef={buttonRef}
        />)
        if(UserGroups?.user_groups){
            if(UserGroups.user_groups.length > 3){
                res.push(
                    <button key={'werww1'} className={classes.moreBtn}
                        ref={buttonRef}
                        onClick={handleGroupModalOpen}>
                        <div></div>
                        <div></div>
                        <div></div>
                </button>)
            }
        }
        return res;
    }

    const getCategories = useMemo((): ReactNode => {
        return CategoriesByGroup?.categories_group.map((item, i) =>
            <CategoriesCard
                key={uuid()}
                id={item.category.id}
                color={item.color_code}
                title={item.category.title}
                icon={item.icon_url}
                isCategoriesLoading={isCategoriesLoading}
                setSelectedCategory={setSelectedCategory}
                isEditCategoryModal={isEditCategoryModal}
                setIsEditCategoryModal={setIsEditCategoryModal}
            />
        )
    }, [CategoriesByGroup])

    return (<>
        {<CategoryModal
            groupId={selectedGroup}
            categoryId={selectedCategory}
            setIsCategoryModalOpen={setIsCreateCategoryModal}
            isCategoryModalOpen={isCreateCategoryModal}
            mode='create'
        />}
        {<CategoryModal
            groupId={selectedGroup}
            categoryId={selectedCategory}
            setIsCategoryModalOpen={setIsEditCategoryModal}
            isCategoryModalOpen={isEditCategoryModal}
            mode='edit'
        />}
        <main id='CategoriesPage'>
            <div className={classes.CategoriesPage__container}>
                <h3 className={classes.pageTitle}>Categories</h3>
                <nav className={classes.groupsNav}>
                    {getGroups()}
                </nav>
                <div className={classes.addCategory}>
                    <div className={classes.upSide}>
                        <h5 className={classes.CategoryTitle}>Category</h5>
                        <CustomButton
                            isPending={false}
                            callback={() => setIsCreateCategoryModal(!isCreateCategoryModal)}
                            icon="add"
                            type="primary"
                            children="Create new category"
                            />
                    </div>
                    <div className={classes.line}></div>
                </div>
                <ul className={classes.CategoriesBox}>
                    {getCategories}
                </ul>
            </div>
        </main>
    </>)
}

export default React.memo(Categories)
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
import PreLoader from "@components/PreLoader/PreLoader";

const Categories: FC = () => {
    
    const GroupsStore = useAppSelector<IGroupState>(store => store.persistedGroupSlice)

    const { data: UserGroups, isLoading: isGroupsLoading, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null);
    
    const [selectedGroup, setSelectedGroup] = useState<number>(GroupsStore.defaultGroup);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);

    const { data: CategoriesByGroup, isLoading: isCategoriesLoading, isError: isCategoriesError, isSuccess: isCategoriesSuccess } = useGetCategoriesByGroupQuery(selectedGroup)

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
    }, [CategoriesByGroup, UserGroups])

    let categoriesContent;
    let groupsContent;
    if (isCategoriesLoading || isGroupsLoading) {
        groupsContent = <div className={classes.loaderWrapper}>
            <PreLoader preLoaderSize={50} type='auto' />
        </div>
        categoriesContent = null
    } else if (isCategoriesError) {
        groupsContent = (<div className={classes.noItems}>
            <i className="bi bi-person-x" style={{ fontSize: 50, color: 'var(--main-text)' }}></i>
            <h5 className={classes.noItems__title}>Your groups list currently is empty!</h5>
            <p className={classes.noItems__text}>To add more categories, first create groups.</p>
        </div>)
        categoriesContent = null
    }
    else if (isCategoriesSuccess && isGroupsSuccess) {
        if (UserGroups.user_groups.length > 0) {
            groupsContent = <>
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
            </>
            if (CategoriesByGroup.categories_group.length > 0)
                categoriesContent = <ul className={classes.CategoriesBox}>
                    {getCategories}
                </ul>
            else
                categoriesContent = (<div className={classes.noItems}>
                    <i className="bi bi-ui-checks-grid" style={{ fontSize: 50, color: 'var(--main-text)' }}></i>
                    <h5 className={classes.noItems__title}>Your categories list currently is empty!</h5>
                    <p className={classes.noItems__text}>Tap the button above to add more categories.</p>
                </div>)
        }
    }

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
            Categories={CategoriesByGroup}
            mode='edit'
        />}
        <main id='CategoriesPage'>
            <div className={classes.CategoriesPage__container}>
                <h3 className={classes.pageTitle}>Categories</h3>
                {groupsContent}
                {categoriesContent}
            </div>
        </main>
    </>)
}

export default React.memo(Categories)
import { useCallback, useEffect, useMemo, useState } from 'react';
import UserCategoriesCardDot from '../UserCategoriesCardItem/UserCategoriesCardItem';
import classes from './UserCategoriesCard.module.css'
import { useElementSize } from 'usehooks-ts'
const json = {
    "categoriesByGroup": [
        {
            "title": "my",
            "categories": [
                {
                    "category": {
                        "id": 1,
                        "title": "Entertainment",
                        "color": "#0f4f5f",
                        "icon": "link.com"
                    },
                    "amount": 999
                },
                {
                    "category": {
                        "id": 2,
                        "title": "Food",
                        "color": "#FF6E01",
                        "icon": "link.com"
                    },
                    "amount": 59
                },
                {
                    "category": {
                        "id": 3,
                        "title": "Products",
                        "color": "#FF2D55",
                        "icon": "link.com"
                    },
                    "amount": 1709
                },
                {
                    "category": {
                        "id": 4,
                        "title": "Cars",
                        "color": "#4C6FFF",
                        "icon": "link.com"
                    },
                    "amount": 10190
                },
                {
                    "category": {
                        "id": 5,
                        "title": "Entertainment",
                        "color": "#0f4f5f",
                        "icon": "link.com"
                    },
                    "amount": 999
                },
                {
                    "category": {
                        "id": 6,
                        "title": "Food",
                        "color": "#FF6E01",
                        "icon": "link.com"
                    },
                    "amount": 59
                },
                {
                    "category": {
                        "id": 7,
                        "title": "Products",
                        "color": "#FF2D55",
                        "icon": "link.com"
                    },
                    "amount": 1709
                },
                {
                    "category": {
                        "id": 8,
                        "title": "Cars",
                        "color": "#4C6FFF",
                        "icon": "link.com"
                    },
                    "amount": 10190
                },
                {
                    "category": {
                        "id": 9,
                        "title": "Food",
                        "color": "#FF6E01",
                        "icon": "link.com"
                    },
                    "amount": 59
                },
                {
                    "category": {
                        "id": 10,
                        "title": "Products",
                        "color": "#FF2D55",
                        "icon": "link.com"
                    },
                    "amount": 1709
                },
                {
                    "category": {
                        "id": 11,
                        "title": "Cars",
                        "color": "#4C6FFF",
                        "icon": "link.com"
                    },
                    "amount": 10190
                },
                
            ]
        },
        {
            "title": "Family",
            "categories": [
                {
                    "category": {
                        "id": 1,
                        "title": "Entertainment",
                        "color": "#0f4f5f",
                        "icon": "link.com"
                    },
                    "amount": 999
                },
                {
                    "category": {
                        "id": 2,
                        "title": "Food",
                        "color": "#FF6E01",
                        "icon": "link.com"
                    },
                    "amount": 59
                },
                {
                    "category": {
                        "id": 3,
                        "title": "Products",
                        "color": "#FF2D55",
                        "icon": "link.com"
                    },
                    "amount": 1709
                },
                {
                    "category": {
                        "id": 4,
                        "title": "Cars",
                        "color": "#4C6FFF",
                        "icon": "link.com"
                    },
                    "amount": 10190
                },
                {
                    "category": {
                        "id": 5,
                        "title": "Entertainment",
                        "color": "#0f4f5f",
                        "icon": "link.com"
                    },
                    "amount": 999
                },
                {
                    "category": {
                        "id": 6,
                        "title": "Food",
                        "color": "#FF6E01",
                        "icon": "link.com"
                    },
                    "amount": 59
                }     
            ]
        },
        {
            "title": "Empty",
            "categories": [
                
            ]
        }
    ],
}

interface Category {
    id: number,
    title: string,
    color: string,
    icon: string
}

export interface ICategoryItem {
    category: Category,
    amount: number
}

const UserCategoriesCard = () => {
    const [categories, setCategories] = useState<ICategoryItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [groupIndex, setGroupIndex] = useState<number>(0);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    const { categoriesByGroup } = json;
    let groups = categoriesByGroup.map(a => a.title);
    
    useEffect( () => {
        const newCategories = categoriesByGroup.find(item => item.title === groups[groupIndex])?.categories
        if (newCategories)
            setCategories(newCategories);
    }, [groupIndex])

    function detectWrap(className: string) {
        let container: HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement
       
        const gap = parseFloat(getComputedStyle(container).gap);
        for (const child of container.children) {
            const childElement = child as HTMLElement;
            const prevSibling = childElement.previousElementSibling as HTMLElement;

            childElement.classList.remove(classes.wrapped);

            const offsetHeight = container.offsetTop + gap +  2 * childElement.offsetHeight
            if (childElement.offsetTop > offsetHeight) {
                prevSibling.classList.add(classes.wrapped);
                if (!childElement.classList.contains(classes.specialItem)) {
                    childElement.classList.add(classes.wrapped);
                }
            }
        }
    }

    useEffect(()=> {
        detectWrap(classes.list);
    }, [height, width, categories])

    const getCategories = (categories: ICategoryItem[]) => {
        return categories.map((item, i) => <UserCategoriesCardDot key={i} category={item.category} amount={item.amount} />)
    }
    const useCategories = (categories: ICategoryItem[] , total: number) => {
        const properCategories = useMemo(() => {
            return categories.slice(0, total)
        }, [categories, total])
        return properCategories;
    }

    const handleNextGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!groups[groupIndex + 1]) return;
        setGroupIndex(groupIndex + 1); 
    }

    const handlePrevGroup =(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!groups[groupIndex - 1]) return;
        setGroupIndex(groupIndex - 1); 
    }

    const properCategories = useCategories(categories, totalItems)

    return (
        <div className={classes.categories}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <h3 className={classes.title}>Categories <span className={classes.categoryName}>({groups[groupIndex]})</span></h3>
                    <div className={classes.nav}>
                        <button
                            type="submit"
                            onClick={handlePrevGroup}
                            disabled={!groups[groupIndex - 1]}
                            className={classes.btn + ' ' + classes.previous}
                            >
                            <i id='chevron' className="bi bi-chevron-left"></i>
                        </button>
                        <button
                            type="submit"
                            onClick={handleNextGroup}
                            disabled={!groups[groupIndex + 1]}
                            className={classes.btn + ' ' + classes.next}
                            >
                            <i id='chevron' className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <ul className={classes.list} ref={squareRef}>
                    {getCategories(properCategories)}
                    {
                        categories.length === 0 ?
                            <div className={classes.emptyList}>
                                <p>Category list is empty!</p>
                                <li className={`${classes.item} ${classes.specialItem}`}>
                                    <div className={classes.dashed}>
                                        <i className="bi bi-plus-lg"></i>
                                    </div>
                                    <h6 className={classes.itemTitle}>Add More</h6>
                                </li>
                            </div> 
                            :
                       categories.length >= 11 ?
                        <li className={`${classes.item} ${classes.specialItem}`}>
                            <div className={classes.dashed}>
                                <i className="bi bi-chevron-right"></i>
                            </div>
                            <h6 className={classes.itemTitle}>View More</h6>
                        </li>
                        :
                        <li className={`${classes.item} ${classes.specialItem}`}>
                            <div className={classes.dashed}>
                                <i className="bi bi-plus-lg"></i>
                            </div>
                            <h6 className={classes.itemTitle}>Add More</h6>
                        </li>
                    }
                </ul>    
            </div>
        </div>
    );
};

export default UserCategoriesCard;

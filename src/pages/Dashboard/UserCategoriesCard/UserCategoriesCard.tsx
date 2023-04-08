import { useCallback, useEffect, useMemo, useState } from 'react';
import UserCategoriesCardDot from '../UserCategoriesCardDot/UserCategoriesCardDot';
import classes from './UserCategoriesCard.module.css'


const json = {
    "groups": [
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
    const [totalCategories, setTotalCategories] = useState<number>(11);
    const {groups} = json;

    useEffect( () => {
        setCategories(groups[0].categories);
    }, [])
    
    // var detectWrap = function (className: string) {

    //     // let wrappedItems = [];
    //     let prevItem: DOMRect = {} as DOMRect;
    //     let currItem: DOMRect = {} as DOMRect;
    //     let items = document.getElementsByClassName(className);

    //     for (var i = 0; i < items.length; i++) {
    //         currItem = items[i].getBoundingClientRect();
    //         if (prevItem && prevItem.top < currItem.top) {
    //             items[i].classList.add("wrapped");
    //         } else {
    //             items[i].classList.remove("wrapped");
    //         }
    //         prevItem = currItem;
    //     };

    //     // return wrappedItems;

    // }

    function detectWrap(className: string) {
        let container: HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement
        
        const gap = parseFloat(getComputedStyle(container).gap);
        for (const child of container.children) {
            const childElement = child as HTMLElement;
            const prevSibling = childElement.previousSibling as HTMLElement;
            childElement.classList.remove(classes.wrapped);
            
            const bigOffsetHeight = container.offsetTop + gap + childElement.offsetHeight
            const lowOffsetHeight = container.offsetTop
            
            if (childElement.offsetTop > bigOffsetHeight) {
                // console.log("1", childElement);
                // console.log(prevSibling);
                
                prevSibling.classList.add(classes.wrapped);
                if (!childElement.classList.contains("viewMore")) {
                    childElement.classList.add(classes.wrapped);
                }
                
                
                
            }
            // else if (childElement.offsetTop > lowOffsetHeight) {
            //     // console.log("2", childElement); 
            //     childElement.classList.remove(classes.wrapped);

            //     // var rect = childElement.getBoundingClientRect();
            //     // console.log(rect.top);
            //     // console.log(offsetHeight);
            // }
        }
    }
    // const setCategories1 = () => {
    //     let container: HTMLElement = document.getElementsByClassName(classes.list)[0] as HTMLElement;
    //     const list: HTMLCollectionOf<Element> = container.children;
    //     const newList = Array.from(list).filter( (item:Element)  =>  !item.classList.contains("wrapped"));
    //     newList.pop()
    //     // const viewMore: HTMLElement = document.querySelector(".viewMore") as HTMLElement;
    //     // newList.push(viewMore);
    //     // console.log(newList);
    //     // console.log(newList.length);
    //     setTotalCategories(newList.length)
    

    // }

    // const detectWrap = () => {
    //     const elements= document.querySelectorAll(classes.list);
    //     let previousElement: HTMLElement = {} as HTMLElement;
    //     let rowTop = elements[0].getBoundingClientRect().top;
    //     Array.from(elements).forEach(el => el.classList.remove('last-el-of-row'))
    //     elements.forEach(el => {
    //         const elementTop = el.getBoundingClientRect().top;
    //         const elHTML = el as HTMLElement;
    //         if (rowTop < elementTop) {
    //             previousElement.classList.add('last-el-of-row');
    //             rowTop = elementTop;
    //         }

    //         previousElement = elHTML;
    //     })
    // }
    window.addEventListener('resize', (event) =>{
        detectWrap(classes.list);
        // setCategories1()
        // console.log(totalCategories);
        // var wrappedItems = detectWrap(classes.item);
        // for (var k = 0; k < wrappedItems.length; k++) {
        //     wrappedItems[k].classList.add("wrapped");
        //     console.log(wrappedItems);
        // }
    });

    const getCategories = (categories: any[]) => {
        return categories.map((item, i) => <UserCategoriesCardDot key={i} category={item.category} amount={item.amount} />)
    }
    const useCategories = (categories: any[] , counter: number) => {
        const properCategories = useMemo(() => {
            return categories.slice(0, counter)
        }, [categories, counter])
        return properCategories;
    }

    const properCategories = useCategories(categories, totalCategories)

    return (
        <div className={classes.categories}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <h3 className={classes.title}>Categories <span className={classes.categoryName}>(my)</span></h3>
                    <div className={classes.nav}>
                        <i className="bi bi-chevron-left"></i>
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </div>
                <ul className={classes.list}>
                    {getCategories(properCategories)}
                    <li className={`${classes.item} viewMore`}>
                        <div className={classes.viewMore}>
                            <i className="bi bi-chevron-right"></i>
                        </div>
                        <h6 className={classes.expenseName}>View More</h6>
                    </li>
                </ul>
                {/* <p className={classes.info}>You can choose the desired category and log your expenses.</p> */}
                
            </div>
            
        </div>
    );
};

export default UserCategoriesCard;

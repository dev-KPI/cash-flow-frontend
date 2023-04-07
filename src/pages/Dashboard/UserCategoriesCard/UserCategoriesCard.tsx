import { useCallback, useEffect } from 'react';
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

const UserCategoriesCard = () => {
    const {groups} = json;

    const categories = groups[0].categories;
    
    const getCategories = (categories: any[]) => {
        return categories.map(item => <UserCategoriesCardDot key={item.category.id} category={item.category} amount={item.amount} />)
    }

    var detectWrap = function (className:string) {

        // let wrappedItems = [];
        let prevItem: DOMRect = {} as DOMRect;
        let currItem: DOMRect = {} as DOMRect;
        let items = document.getElementsByClassName(className);

        for (var i = 0; i < items.length; i++) {
            currItem = items[i].getBoundingClientRect();
            if (prevItem && prevItem.top < currItem.top) {
                items[i].classList.add("wrapped");
            } else {
                items[i].classList.remove("wrapped");
            }
            prevItem = currItem;
        };

        // return wrappedItems;

    }

    function detectWrap1(className: string) {
        let container: HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement;
        const gap = parseFloat(getComputedStyle(container).gap);
        for (const child of container.children) {
            const childElement = child as HTMLElement;
            const offsetHeight = container.offsetTop + gap + childElement.offsetHeight
            if (childElement.offsetTop > offsetHeight) {
                childElement.classList.add("wrapped");
            } else {
                childElement.classList.remove("wrapped");
            }
        }
    }
    const setCategories = () => {
        let container: HTMLElement = document.getElementsByClassName(classes.list)[0] as HTMLElement;
        const list: HTMLCollectionOf<Element> = container.children;
        const newList = Array.from(list).filter( (item:Element)  =>  !item.classList.contains("wrapped"));
        newList.pop()
        const viewMore: HTMLElement = document.querySelector(".viewMore") as HTMLElement;
        newList.push(viewMore);
        console.log(newList);
    

    }


    window.addEventListener('resize', (event) =>{
        detectWrap1(classes.list);
        setCategories()
        // var wrappedItems = detectWrap(classes.item);
        // for (var k = 0; k < wrappedItems.length; k++) {
        //     wrappedItems[k].classList.add("wrapped");
        //     console.log(wrappedItems);
        // }
    });


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
                    {getCategories(categories)}
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

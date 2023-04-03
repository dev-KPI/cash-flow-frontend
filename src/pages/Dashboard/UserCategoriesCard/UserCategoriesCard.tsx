import React from 'react';
import classes from './UserCategoriesCard.module.css'
const UserCategoriesCard = () => {
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
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Products</h6>
                        <div className={classes.icon}>
                                <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>123250.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Products</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>50.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Products</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>50.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Products</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>50.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Products</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>50.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Entertainment</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>1150.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Entertainment</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>1150.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Entertainment</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>1150.40$</p>
                    </li>
                    <li className={classes.item}>
                        <h6 className={classes.expenseName}>Entertainment</h6>
                        <div className={classes.icon}>
                            <i className="bi bi-credit-card-2-front"></i>
                        </div>
                        <p className={classes.expenseAmount}>1150.40$</p>
                    </li>
                    <li className={classes.item}>
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
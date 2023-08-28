import React, { FC } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import userIcon from '@assets/user-icon.svg';

//logic
import IUser from '@models/IUser';

//UI
import classes from './GroupSpendersCard.module.css';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { IGetCurrentGroupSpendersResponse } from '@store/Controllers/ExpensesController/ExpensesControllerInterfaces';
import PreLoader from '@components/PreLoader/PreLoader';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

interface IGroupSpendersCardProps {
    data: IGetCurrentGroupSpendersResponse[] | undefined,
    isLoading: boolean,
    isError: boolean,
    isFetching: boolean,
    isSuccess: boolean
}

const GroupSpendersCard: FC<IGroupSpendersCardProps> = ({data, isLoading, isError, isSuccess, isFetching}) => {
    const { groupId, memberId } = useParams<{
        groupId: string,
        memberId: string
    }>();
    
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)

    const getSpenders = () => {
        if(data && !isError && !isLoading){
            let spenders: IGetCurrentGroupSpendersResponse[] = data.slice(0,3);
            return spenders.map((item, i) => {
                const photo = item.picture
                const name = item.first_name + " " + item.last_name
                return (
                    <li key={`${i} + ${item.amount}`}>
                        <NavLink
                            to={`./member/${item.id}`}
                            className={classes.spender}
                            >
                            <p className={classes.order}>{i + 1}.</p>
                            <div className={classes.details}>
                                <div className={classes.info}>
                                    <img className={classes.photo}
                                        alt={'user icon'}
                                        src={isUrl(photo) ? photo : userIcon}
                                    />
                                    <p className={classes.name}>{name}</p>
                                </div>
                                <p className={classes.amount}>{numberWithCommas(item.amount)}$</p>
                            </div>
                        </NavLink>
                
                    </li>)
                }
            )
        } else if (isLoading || isFetching) {
            return (<div className={classes.loaderWrapper}><PreLoader preLoaderSize={25} type='auto'/></div>)
        } else {
            return (<div className={classes.noNotifications}>
                <i className="bi bi-person-x"></i>
                <h5 className={classes.noNotifications__title}>Something went wrong</h5>
                <p className={classes.noNotifications__text}>Try to refresh the page</p>
            </div>)
        } 
    }
    return (
        <div className={classes.SpendersCard}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <h2 className={classes.title}>The spender of the {MonthPickerStore.rangeType === 'default' ? 'month' : MonthPickerStore.rangeType}</h2>
                    <NavLink
                        to={'/members'}
                        className={classes.spendersLink}
                    >
                        See all
                    </NavLink>
                </div>
                <ul className={classes.spenders}>
                    {getSpenders()}
                </ul>                
            </div>
        </div>
    );
};

export default GroupSpendersCard;
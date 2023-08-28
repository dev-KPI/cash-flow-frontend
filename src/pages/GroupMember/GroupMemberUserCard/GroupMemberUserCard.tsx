import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { isUrl } from '@services/UsefulMethods/UIMethods'

import { MembersObj } from '@pages/MembersObj';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useGetGroupTotalExpensesQuery } from '@store/Controllers/ExpensesController/ExpensesController';
import DateService from '@services/DateService/DateService';
//UI
import classes from './GroupMemberUserCard.module.css'
import userIcon from '@assets/user-icon.svg';
import IMember from '@models/IMember';
import OperationCard from '@components/OperationCard/OperationCard';


const GroupMemberUserCard = () => {
    const { groupId, memberId } = useParams<{
        groupId: string,
        memberId: string
    }>();
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const {data: GroupTotalExpenses, isLoading: isGroupTotalExpensesLoading, isError: isGroupTotalExpensesError, isSuccess: isGroupTotalExpensesSuccess} = useGetGroupTotalExpensesQuery({
        group_id: Number(groupId),
        period: MonthPickerStore.type === 'year-month' ? 
        {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)}  : 
        {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} 
    })
    const members: IMember[] = MembersObj.members

    let picture = ''
    let name = ''
    let fullname = ''
    let login = ''
    if (memberId) {
        const member = members.find(item => item.user.id === +memberId)
        picture = member?.user.picture ?? ''
        name = member?.user.first_name ?? ''
        fullname = member?.user.first_name + ' ' + member?.user.last_name
        login = member?.user.login ?? ''
    }

    return (
        <div className={classes.infoCard}>
            <div className={classes.inner}>
                <div className={classes.user}>
                    <div className={classes.avatar}>
                        <img className={classes.photo}
                            alt={'user icon'}
                            src={isUrl(picture) ? picture : userIcon}
                        // style={{ filter: picture ? (actualTheme === 'light' ? 'invert(0)' : 'invert(1)') : '' }}
                        />
                    </div>
                    <div className={classes.personal__data}>
                        <h4 className={classes.name}>{fullname}</h4>
                        <p className={classes.email}>{login}</p>
                    </div>
                </div>
                <div className={classes.cardsWrapper}>
                    <OperationCard
                        operation={'Expenses'}
                        title={`${name}'s expenses`}
                        className={classes.expensesCard}
                        data={GroupTotalExpenses}
                        isError={isGroupTotalExpensesError}
                        isSuccess={isGroupTotalExpensesSuccess}
                        isLoading={isGroupTotalExpensesLoading}
                    />
                    <div className={classes.cardInner}>
                        <h3 className={classes.title}>{`${name}'s total count of expenses`}</h3>
                        <p className={classes.numberTitle}>10</p>
                    </div>
                    <div className={classes.cardInner}>
                        <div className={classes.top}>
                            <div className={classes.info}>
                                <h3 className={classes.title}>{`${name}'s best category`}</h3>
                                <p className={classes.numberTitle}>12,312$</p>
                            </div>
                            <div className={classes.icon}>
                                    <i className="bi bi-credit-card-2-front"></i>
                            </div>
                        </div>
                        <h4 className={classes.subtitle}>Entertainment</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupMemberUserCard;
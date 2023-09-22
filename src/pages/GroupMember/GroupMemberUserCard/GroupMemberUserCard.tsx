import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods'

import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useGetMemberInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';

//UI
import classes from './GroupMemberUserCard.module.css'
import userIcon from '@assets/user-icon.svg';
import OperationCard from '@components/OperationCard/OperationCard';
import GroupMemberUserCardLoader from './GroupMemberUserCardLoader';


const GroupMemberUserCard: React.FC = () => {
    const { groupId, memberId } = useParams<{
        groupId: string,
        memberId: string
    }>();
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const MonthPickerRange = useMemo(() => {
        if(MonthPickerStore.type === 'date-range'){
            return {
                period: {
                    start_date: MonthPickerStore.startDate.split('T')[0],
                    end_date: MonthPickerStore.endDate.split('T')[0]
                }
            }
        } else {
            return {
                period: {
                    year_month: `${MonthPickerStore.currentYear}-${DateService.getFormatedMonth(DateService.getMonthIdxByName(MonthPickerStore.currentMonth))}`
                } 
            }
        }
    }, [MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear])

    const {data: Member, isLoading: isMemberLoading, isError: isMemberError, isSuccess: isMemberSuccess} = useGetMemberInfoByGroupQuery({
        group_id: Number(groupId),
        member_id: Number(memberId),
        period: MonthPickerRange.period
    }, { skip: Number(groupId) === 0 || Number(memberId) === 0 })

    let picture = Member?.picture ? Member.picture : userIcon
    let name = Member?.first_name ? Member.first_name : '';
    let fullname = (Member?.first_name || Member?.last_name) ? Member.first_name + (Member.last_name ? (' ' + Member.last_name) : '') : ''

    const memberExpenses = useMemo(() => {
        if(Member?.best_category && isMemberSuccess) {
            return <>
                <div className={classes.cardInner}>
                    <div className={classes.top}>
                        <div className={classes.info}>
                            <h3 className={classes.title}><span className={classes.titleName}>{name}</span>'s top category</h3>
                            <p className={classes.numberTitle}>{numberWithCommas(Member.best_category.amount)}{currency}</p>
                        </div>
                        <div className={classes.icon}>
                            <i className={Member.best_category.icon_url}></i>
                        </div>
                    </div>
                    <h4 className={classes.subtitle}>{Member.best_category.title}</h4>
                </div>
            </>    
        } else {
            return <>
                <div className={classes.noBestCategory}>
                    <i className='bi bi-ui-checks-grid'></i>
                    <p>Has no best category</p>
                </div>
            </>
        }
    }, [Member, isMemberSuccess])

    return (<>
        {isMemberLoading ? (
        <div className={classes.infoCard}>
            <GroupMemberUserCardLoader/> 
        </div>
        ) : (
        <div className={classes.infoCard}>
            <div className={classes.inner}>
                <div className={classes.user}>
                    <div className={classes.avatar}>
                        <img className={classes.photo}
                            alt={'user icon'}
                            src={isUrl(picture) ? picture : userIcon}
                        />
                    </div>
                    <div className={classes.personal__data}>
                        <h4 className={classes.name}>{fullname}</h4>
                    </div>
                </div>
                <div className={classes.cardsWrapper}>
                    <OperationCard
                    operation={'Expenses'}
                    title={<h3 className={classes.title}><span className={classes.titleName}>{name}</span>'s expenses</h3>}
                    offPreloader={true}
                    className={classes.expensesCard}
                    data={Member?.total_expenses}
                    isError={isMemberError}
                    isSuccess={isMemberSuccess}
                    isLoading={isMemberLoading}
                    />
                    <div className={classes.cardInner}>
                        <h3 className={classes.title}><span className={classes.titleName}>{name}</span>'s total count of expenses</h3>
                        <p className={classes.numberTitle}>{Member?.count_expenses ? Member?.count_expenses : 0}</p>
                    </div>
                    {memberExpenses}
                </div>
            </div>
        </div>
        )}</>);
};

export default GroupMemberUserCard;
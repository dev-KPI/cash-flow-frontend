import { useParams } from 'react-router-dom';
import { isUrl } from '@services/UsefulMethods/UIMethods'

import { MembersObj } from '@pages/MembersObj';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useGetGroupTotalExpensesQuery } from '@store/Controllers/GroupsController/GroupsController';
import { IGetUserByGroupInfoResponse } from '@store/Controllers/GroupsController/GroupsControllerInterfaces';
//UI
import classes from './GroupMemberUserCard.module.css'
import userIcon from '@assets/user-icon.svg';
import OperationCard from '@components/OperationCard/OperationCard';
import { useMemo } from 'react';
import GroupMemberUserCardLoader from './GroupMemberUserCardLoader';

interface IGroupMemberUserCardProps {
    Member: IGetUserByGroupInfoResponse
    isMemberLoading: boolean 
    isMemberError: boolean 
    isMemberSuccess: boolean
}

const GroupMemberUserCard: React.FC<IGroupMemberUserCardProps> = ({Member, isMemberLoading, isMemberError, isMemberSuccess}) => {
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

    let picture = Member.picture ? Member.picture : userIcon
    let name = Member.first_name;
    let fullname = Member.first_name + (Member.last_name ? (' ' + Member.last_name) : '')
    let login = Member.login

    const memberBestCategory = useMemo(() => {
        if(Member?.best_category?.id){
            return (
                <div className={classes.cardInner}>
                    <div className={classes.top}>
                        <div className={classes.info}>
                            <h3 className={classes.title}>{`${name}'s best category`}</h3>
                            <p className={classes.numberTitle}>{Member.best_category.amount}$</p>
                        </div>
                        <div className={classes.icon}>
                            <i className={Member.best_category.icon_url}></i>
                        </div>
                    </div>
                    <h4 className={classes.subtitle}>{Member.best_category.title}</h4>
                </div>
            )
        } else if (Member) {
            return (
                <div className={classes.noBestCategory}>
                    <i className='bi bi-ui-checks-grid'></i>
                    <p>Has no best category</p>
                </div>
            )
        }
    }, [Member])

    return (<>
        {isMemberLoading || isGroupTotalExpensesLoading ? (
        <div className={classes.infoCard}>
            <GroupMemberUserCardLoader/> 
        </div>
        ): (
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
                        offPreloader={true}
                        className={classes.expensesCard}
                        data={GroupTotalExpenses}
                        isError={isGroupTotalExpensesError}
                        isSuccess={isGroupTotalExpensesSuccess}
                        isLoading={isGroupTotalExpensesLoading}
                    />
                    <div className={classes.cardInner}>
                        <h3 className={classes.title}>{`${name}'s total count of expenses`}</h3>
                        <p className={classes.numberTitle}>{Member?.count_expenses}</p>
                    </div>
                    {memberBestCategory}
                </div>
            </div>
        </div>
    )}</>);
};

export default GroupMemberUserCard;
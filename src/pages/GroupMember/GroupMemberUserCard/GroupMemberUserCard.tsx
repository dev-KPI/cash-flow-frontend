import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods'
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IGetUserByGroupInfoResponse } from '@store/Controllers/GroupsController/GroupsControllerInterfaces';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';

//UI
import classes from './GroupMemberUserCard.module.css'
import userIcon from '@assets/user-icon.svg';
import OperationCard from '@components/OperationCard/OperationCard';
import GroupMemberUserCardLoader from './GroupMemberUserCardLoader';

interface IGroupMemberCardProps {
    member: IGetUserByGroupInfoResponse | undefined;
    isMemberLoading: boolean,
    isMemberSuccess: boolean
}
const GroupMemberUserCard: React.FC<IGroupMemberCardProps> = ({ member, isMemberLoading, isMemberSuccess }) => {
    const { groupId, memberId } = useParams<{
        groupId: string,
        memberId: string
    }>();
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);

    let picture = member?.picture ? member.picture : userIcon
    let name = member?.first_name ? member.first_name : '';
    let fullname = (member?.first_name || member?.last_name) ? member.first_name + (member.last_name ? (' ' + member.last_name) : '') : ''

    const memberExpenses = useMemo(() => {
        if (member?.best_category && isMemberSuccess) {
            return <>
                <div className={classes.cardInner}>
                    <div className={classes.top}>
                        <div className={classes.info}>
                            <h3 className={classes.title}><span className={classes.titleName}>{name}</span>'s top category</h3>
                            <p className={classes.numberTitle}>{numberWithCommas(member.best_category.amount)}{currency}</p>
                        </div>
                        <div className={classes.icon}>
                            <i className={member.best_category.icon_url}></i>
                        </div>
                    </div>
                    <h4 className={classes.subtitle}>{member.best_category.title}</h4>
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
    }, [member, isMemberSuccess])

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
                    data={member?.total_expenses}
                    isError={false}
                    isSuccess={isMemberSuccess}
                    isLoading={isMemberLoading}
                    />
                    <div className={classes.cardInner}>
                        <h3 className={classes.title}><span className={classes.titleName}>{name}</span>'s total count of expenses</h3>
                                <p className={classes.numberTitle}>{member?.count_expenses ? member?.count_expenses : 0}</p>
                    </div>
                    {memberExpenses}
                </div>
            </div>
        </div>
        )}</>);
};

export default GroupMemberUserCard;
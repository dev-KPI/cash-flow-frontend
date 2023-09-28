import { useEffect, useMemo } from 'react';
//logic
import { useGetInfoByGroupQuery, useGetMemberInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
//UI
import GroupMemberUserCard from '@pages/GroupMember/GroupMemberUserCard/GroupMemberUserCard';
import GroupMemberGraphCard from '@pages/GroupMember/GroupMemberGraphCard/GroupMemberGraphCard';
import GroupMemberHistoryCard from '@pages/GroupMember/GroupMemberHistoryCard/GroupMemberHistoryCard';
import classes from './GroupMember.module.css';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';
import MonthPicker from '@components/MonthPicker/MonthPicker';
import GroupMemberChartCard from './GroupMemberChartCard/GroupMemberChartCard';




const GroupMember = () => {
    const navigate = useNavigate();
    const { groupId, memberId } = useParams<{ groupId: string, memberId: string }>()
    
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess } = useGetInfoByGroupQuery({ group_id: Number(groupId) })
    const MonthPickerRange = useMemo(() => {
        if (MonthPickerStore.type === 'date-range') {
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
    const { data: Member, isLoading: isMemberLoading, isError: isMemberError, isSuccess: isMemberSuccess } = useGetMemberInfoByGroupQuery({
        group_id: Number(groupId),
        member_id: Number(memberId),
        period: MonthPickerRange.period
    }, { skip: Number(groupId) === 0 || Number(memberId) === 0 })
   
    
    const {width, height} = useWindowSize();
    const getMonthPicker = useMemo(() => {
        if(width < 769) {
            return (
                <div className={classes.MonthPicker}>
                    <MonthPicker/>
                </div>
            )
        }
    }, [width])
    
    useEffect(() => {
        if (isMemberError) navigate('/404')
    }, [Member, isMemberError])

    return (<>
        {isGroupInfoSuccess && GroupInfo && 
        <main id={'GroupMemberPage'} className={'no-padding'}>
            <div className={classes.page__container}>
                <div style={{marginTop: '10px'}}>
                    {getMonthPicker}
                </div>
                <div className={classes.grid}>
                    <GroupMemberUserCard
                        member={Member}
                        isMemberLoading={isMemberLoading}
                        isMemberSuccess={isMemberSuccess}
                    /> 
                    <GroupMemberChartCard/>
                    <GroupInfoCard 
                    isAdmin={GroupInfo.admin.id === Number(memberId)}
                    isInfoLoading={isGroupInfoLoading} 
                    groupInfo={GroupInfo}/>
                    <GroupMemberGraphCard />
                    <GroupMemberHistoryCard />
                </div>
            </div>
        </main>}
    </>);
};

export default GroupMember;
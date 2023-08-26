import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//UI
import classes from './GroupMembers.module.css';
import userIcon from '@assets/user-icon.svg'

//logic
import IMember from '@models/IMember';
import { MembersObj } from '@pages/MembersObj';
import DateService from '@services/DateService/DateService';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
    getSortedRowModel, 
    PaginationState, 
    Row,
    useReactTable,
} from '@tanstack/react-table'
import { isUrl } from '@services/UsefulMethods/UIMethods';
import SmallModal from '@components/ModalWindows/SmallModal/SmallModal';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import { useGetCurrentUserInfoQuery, useGetUsersByGroupQuery } from '@store/Controllers/UserController/UserController';
import { useGetInfoByGroupQuery, useLeaveGroupMutation, useRemoveUserMutation } from '@store/Controllers/GroupsController/GroupsController';
import { SortingState } from '@tanstack/react-table';
import { IGetInfoFromGroupResponse } from '@store/Controllers/GroupsController/GroupsControllerInterfaces';
import StatusTooltip from '@components/StatusTooltip/StatusTooltip';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';
import IUser from '@models/IUser';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends unknown> {
        getClass: (row: Row<TData>) => string;
    }
}

interface GroupMember extends IMember {
    role: 'Owner' | 'Member'
}

const columnHelper = createColumnHelper<GroupMember>()

const History: React.FC = () => {
    const { groupId } = useParams();
    
    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 8,
    })
    const [sorting, setSorting] = useState<SortingState>([]) 
    
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )
    const [data, setData] = useState<GroupMember[]>([{
        user: {
            id: 0,
            login: '0',
            first_name: '0',
            last_name: '0',
            picture: '0'
        },
        status: '0',
        date_join: '0',
        role: 'Member'
    }])

    const { data: UsersByGroup, isLoading: isUsersByGroupLoading, isError: isUsersByGroupError, isSuccess: isUsersByGroupSuccess } = useGetUsersByGroupQuery({  group_id: Number(groupId),
        page: pageIndex + 1,
        size: pageSize });
    const { data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess } = useGetInfoByGroupQuery({ group_id: Number(groupId)});
    const { data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError, isSuccess: isCurrentUserSuccess} = useGetCurrentUserInfoQuery(null);

    const initializeData = useCallback(() => {
        if(UsersByGroup && isUsersByGroupSuccess && GroupInfo && isGroupInfoSuccess){
            const data: GroupMember[] = UsersByGroup.items[0].users_group.map(el => {
                return {
                    user: {
                        id: el.user.id,
                        login: el.user.login,
                        first_name: el.user.first_name,
                        last_name: el.user.last_name,
                        picture: el.user.picture
                    },
                    status: el.status,
                    date_join: el.date_join,
                    role: GroupInfo.admin.id === el.user.id ? 'Owner' : 'Member'
                }
            })
            setData(data)
        }
    }, [UsersByGroup, isUsersByGroupLoading, isUsersByGroupSuccess, isUsersByGroupError, GroupInfo, isGroupInfoSuccess])

    useEffect(() => {
        initializeData()
    }, [initializeData])
    
    const columns = [
        columnHelper.accessor(`user.last_name`, {
            header: () => 'Member',
            cell: info => {
                const picture = info.row.original.user.picture ?? ''
                const full_name = info.row.original.user.first_name + ' ' + info.row.original.user.last_name
                const email = info.row.original.user.login
                return info.renderValue() ?
                    <div className={classes.memberWrapper}>
                        <div className={classes.details}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={isUrl(picture) ? picture : userIcon} />
                            </div>
                            <div className={classes.memberInfo}>
                                <h6 className={classes.name}>{full_name}</h6>
                                <p className={classes.email}>{email}</p>
                            </div>
                        </div>
                    </div> : '-'
            }
        }),
        columnHelper.accessor('status', {
            header: () => 'Status',
            cell: info => info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)
            
        }),
        columnHelper.accessor('role', {
            header: () => 'Role',
            cell: info => {
                if (info.row.original.user.id === GroupInfo?.admin.id) {
                    return <p style={{ color: 'var(--main-green)' }}>Owner</p>
                } else {
                    return 'Member'
                }
            },
        }),
        columnHelper.accessor('date_join', {
            header: () => 'Date of join',
            cell: info => DateService.getTime(new Date(info.getValue())).slice(0, 10),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: info => {
                const isActionDisabled = info.row.original.status === 'pending';
                return <div className={classes.btnWrapper}>
                    <ButtonContent 
                    groupInfo={GroupInfo} 
                    groupId={groupId} 
                    user={info.row.original.user} 
                    CurrentUser={CurrentUser} 
                    isActionDisabled={isActionDisabled}/>
                </div >
        }
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        pageCount: UsersByGroup?.pages,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination
        },
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: {
            getClass: (row: Row<GroupMember>): string => (
                row.original.status === 'pending' ? classes.pending : ''
            ),
        }
    })
    const pageCount = table.getPageCount()
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? data.length : (pageIndex + 1) * pageSize;

    return (
        <main id='GroupMembersPage' className="no-padding">
            <div className={classes.page__container}>
                <table className={classes.recentOperations__table}>
                    <thead className={classes.tableTitle}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? classes.headerHover
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <i id={classes.sortBtn} className="bi bi-caret-up-fill" style={{ fontSize: 16, position: 'absolute' }}></i>,
                                                    desc: <i id={classes.sortBtn} className="bi bi-caret-down-fill" style={{ fontSize: 16, position: 'absolute' }}></i>
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={classes.tableText}>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}
                                className={[classes['in'], table.options.meta?.getClass(row)].join(' ')}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>      
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5}>
                                <div className={classes.pagination}>
                                    <div className={classes.selector}>
                                        <span>Rows per page: </span>
                                        <select
                                            value={pageSize}
                                            className={classes.select}
                                            onChange={e => {
                                                table.setPageSize(Number(e.target.value))
                                            }}
                                        >
                                            {[4, 6, 8, 16, 24].map(pageSize => (
                                                <option key={pageSize} value={pageSize}>
                                                    {pageSize}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <span className={classes.counter}>
                                        {`${startIndex} - ${endIndex}`} of{' '}
                                        {data.length}
                                    </span>
                                    <div className={classes.nav}>
                                        <button
                                            className={classes.btn}
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                        >
                                            <i id='chevron' className="bi bi-chevron-left"></i>
                                        </button>
                                        <button
                                            className={classes.btn}
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                        >
                                            <i id='chevron' className="bi bi-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default History

const ButtonContent: React.FC<{
        groupId: string | undefined,
        groupInfo: IGetInfoFromGroupResponse | undefined,
        CurrentUser: IUser | undefined,
        user: IUser,
        isActionDisabled: boolean
    }> = ({ groupId, user, isActionDisabled, groupInfo, CurrentUser}) => {
    const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false)
    const actionsButtonRef = useRef(null);
    const handleActionOpen = () => {
        if (isActionDisabled) return
        else setIsActionsOpen(!isActionsOpen)
    }
    const navigate = useNavigate();

    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
    const [confirmationMode, setConfirmationMode] = useState<'disband' | 'kick'>('kick');

    const getSpecialButton = useMemo(() => {
        if(CurrentUser && groupInfo){
            if(CurrentUser.id === groupInfo.admin.id)
            return <CustomButton
                isPending={false}
                children={user.id === groupInfo.admin.id ? "Disband group" : 'Remove member'}
                icon={'none'}
                type="danger"
                background={'outline'}
                disableScale={true}
                callback={() => {
                    if(user.id === groupInfo.admin.id){
                        setConfirmationMode("disband")
                    } else {
                        setConfirmationMode('kick')
                    }
                    setIsConfirmationModal(true)
                }}
                className={`${classes.leaveButton} btn-danger outline`} />}
    }, [])

    return (<>
        {isConfirmationModal && 
            <ConfirmationModal 
            groupId={Number(groupId)} 
            title={groupInfo?.title}
            kickedUser={user}
            setIsConfirmationModalOpen={setIsConfirmationModal} 
            isConfirmationModalOpen={isConfirmationModal} 
            mode={confirmationMode}/>
        }
        <button className={[classes.moreBtn, isActionDisabled ? classes.actionsDisabled : ''].join(' ')}
            onClick={handleActionOpen}
            ref={actionsButtonRef}>
            <div></div>
            <div></div>
            <div></div>
        </button>
        <SmallModal
            active={isActionsOpen}
            setActive={setIsActionsOpen}
            className={classes.actionsModal}
            title=''
            buttonRef={actionsButtonRef}
            disableHeader={true}
            children={
                <div className={classes.actionsWrapper}>
                    <CustomButton
                        icon={'none'}
                        type={'white'}
                        background={'outline'}
                        callback={() => navigate(`/group/${groupId}/member/${user.id}`)}
                        isPending={false}
                        disableScale={true}
                        className={classes.btnInsight}
                        children={
                            <div className={classes.btnChild}>
                                <i className="bi bi-bar-chart"></i>
                                <p>Insight</p>
                            </div>
                        } />
                    {getSpecialButton}
                </div>}
        /></>)
}
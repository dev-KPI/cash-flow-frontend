import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
//UI
import classes from './GroupMembers.module.css';
import userIcon from '@assets/user-icon.svg'

//logic
import IMember from '@models/IMember';

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

import { useGetCurrentUserInfoQuery,  } from '@store/Controllers/UserController/UserController';
import { useGetInfoByGroupQuery, useGetUsersByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { SortingState } from '@tanstack/react-table';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';
import IUser from '@models/IUser';
import ButtonContent from './ButtonContent';

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
    const [data, setData] = useState<GroupMember[]>([])

    const { data: UsersByGroup, isLoading: isUsersByGroupLoading, isError: isUsersByGroupError, isSuccess: isUsersByGroupSuccess } = useGetUsersByGroupQuery({  group_id: Number(groupId),
        page: pageIndex + 1,
        size: pageSize });
    const { data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess } = useGetInfoByGroupQuery({ group_id: Number(groupId)});
    const { data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError, isSuccess: isCurrentUserSuccess} = useGetCurrentUserInfoQuery(null);

    const initializeData = useCallback(() => {
        if(UsersByGroup && isUsersByGroupSuccess && GroupInfo && isGroupInfoSuccess){
            const data: GroupMember[] = UsersByGroup.items[0].users_group.map(member => {
                return {
                    ...member,
                    role: GroupInfo.admin.id === member.user.id ? 'Owner' : 'Member'
                }
            })
            setData(data)
        }
    }, [UsersByGroup, isUsersByGroupLoading, isUsersByGroupSuccess, isUsersByGroupError, GroupInfo, isGroupInfoSuccess])

    useEffect(() => {
        initializeData()
    }, [initializeData])
    
    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
    const [kickedUser, setKickedUser] = useState<IUser>({
        id: 0,
        login: '',
        first_name: '',
        last_name: '',
        picture: ''
    });
    const [confirmationMode, setConfirmationMode] = useState<'kick' | 'disband'>('kick');

    const columns = [
        columnHelper.accessor(`user.first_name`, {
            header: () => 'Member',
            cell: info => {
                const picture = info.row.original.user.picture ?? ''
                const full_name = () => {
                    if(info?.row?.original?.user?.last_name){
                        return info.row.original.user.first_name + ' ' + info.row.original.user.last_name
                    } else {
                        return info.row.original.user.first_name
                    }
                }
                const email = info.row.original.user.login
                return info.renderValue() ?
                    <div className={classes.details}>
                        <div className={classes.icon}>
                            <img className={classes.photo}
                                style={{borderRadius: '50%'}}
                                alt={'user icon'}
                                src={isUrl(picture) ? picture : userIcon} />
                        </div>
                        <div className={classes.memberInfo}>
                            <h6 className={classes.name}>{full_name()}</h6>
                            <p className={classes.email}>{email}</p>
                        </div>
                    </div> : '-'
            }
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
                    setUser={setKickedUser}
                    setConfirmationMode={setConfirmationMode}
                    setIsConfirmationModal={setIsConfirmationModal}
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
            {
                <ConfirmationModal 
                groupId={Number(groupId)} 
                title={GroupInfo?.title}
                kickedUser={kickedUser}
                setIsConfirmationModalOpen={setIsConfirmationModal} 
                isConfirmationModalOpen={isConfirmationModal} 
                mode={confirmationMode}/>
            }
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

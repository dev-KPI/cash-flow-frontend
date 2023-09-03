import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';

//UI
import classes from './GroupHistory.module.css';
import userIcon from '@assets/user-icon.svg'
import PreLoader from '@components/PreLoader/PreLoader';
//logic
import ICategory from '@models/ICategory';
import IUser from '@models/IUser';
import DateService from '@services/DateService/DateService';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import Light from '@components/Light/Light';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { useParams } from 'react-router-dom';
import { useGetGroupUsersHistoryQuery } from '@store/Controllers/GroupsController/GroupsController';



interface GroupHistory {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        category?: ICategory
    },
    user: IUser
    type: string
}



const columnHelper = createColumnHelper<GroupHistory>()
const columns = [
    columnHelper.accessor(`user.first_name`, {
        header: () =>'Member',
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
                <div className={classes.memberWrapper}>
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
                    </div>
                </div> : '-'
            }
    }),
    columnHelper.accessor('category_group.category.category.title', {
        header: () => 'Category',
        cell: info => info.renderValue() ? <div className={classes.wrapItem}>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.type === 'expense' ? 'inline-block' : 'none' }}
                color={info.row.original.category_group?.category?.color_code || 'var(--main-green)'}
                type='solid' />
            <p className={classes.itemTitle}>{info.getValue().length > 12 ? info.getValue().slice(0, 9) + '...' : info.getValue()}</p>
        </div> : '-',
    }),
    columnHelper.accessor('time', {
        header: () => 'Time',
        cell: info => DateService.getTime(new Date(info.getValue())),
    }),
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        meta: {
            width: '100px'
        },
        cell: info =>
            <p className={classes.amount} style={{ color: info.row.original.type === 'expense' ? "#FF2D55" : "#80D667", textAlign: "left" }}>{info.row.original.type === 'expense' ? "-" : "+"}${numberWithCommas(info.getValue())}</p>,
    }),
]



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

    const {data: GroupRecentHistory, isError: isGroupRecentHistoryError, isLoading: isGroupRecentHistoryLoading, isFetching: isGroupRecentHistoryFetching, isSuccess: isGroupRecentHistorySuccess} = useGetGroupUsersHistoryQuery({
        group_id: Number(groupId),
        page: pageIndex + 1,
        size: pageSize
    });

    const initData = useCallback(() => {
        if(GroupRecentHistory && isGroupRecentHistorySuccess){
            const userTimezoneOffsetMinutes = new Date().getTimezoneOffset();
            const userTimezoneOffsetMilliseconds = userTimezoneOffsetMinutes * 60 * 1000;
            const HistoryArray: GroupHistory[] = GroupRecentHistory.items.map(el => {
                return {
                    id: el.id,
                    amount: el.amount,
                    time: new Date(new Date(el.time).getTime() - userTimezoneOffsetMilliseconds).toISOString(),
                    description: el.descriptions,
                    category_group: {
                        category: {
                            category: {
                                id: el.category_id,
                                title: el.title_category,
                            },
                            icon_url: '',
                            color_code: el.color_code_category
                        }
                    },
                    user: {
                        id: el.user_id,
                        login: el.user_login,
                        first_name: el.user_first_name,
                        last_name: el.user_last_name,
                        picture: el.user_picture,
                    },
                    type: 'expense'
                }
            })
            setData(HistoryArray)
        } else {
            setData([])
        }
    }, [GroupRecentHistory, isGroupRecentHistoryLoading, isGroupRecentHistoryError, isGroupRecentHistoryFetching, isGroupRecentHistorySuccess])

    useEffect(() => {
        initData()
    }, [initData])

    const [data, setData] = useState<GroupHistory[]>([])

    const table = useReactTable({
        data,
        columns,
        pageCount: GroupRecentHistory?.pages,
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
        }
    })
    const pageCount  = table.getPageCount()
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? GroupRecentHistory?.total: (pageIndex + 1) * pageSize;
    let historyContent;
    if (isGroupRecentHistorySuccess && GroupRecentHistory.items.length !== 0) {
        historyContent = (<table className={classes.recentOperations__table}>
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
                    <tr key={row.id} className={classes['in']}>
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
                                    onChange={e => table.setPageSize(Number(e.target.value))}
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
                                {GroupRecentHistory?.total}
                            </span>
                            <div className={classes.nav}>
                                <button
                                    className={classes.btn}
                                    onClick={() => {
                                        table.previousPage()
                                    }}
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
        </table>)
    } else if (isGroupRecentHistorySuccess && GroupRecentHistory.items.length === 0) {
        historyContent = (<div className={classes.noItems}>
            <i className="bi bi-clock-history"></i>
            <h5 className={classes.noItems__title}>Group members don't have any expenses</h5>
            <p className={classes.noItems__text}>Back to group page and to add at least one</p>
        </div>)
    } else {
        historyContent = <div className={classes.loaderWrapper}>
            <PreLoader preLoaderSize={50} type='auto' />
        </div>
    }
    return (
        <main id='GroupHistoryPage' className="no-padding">
            <div className={classes.page__container}>
                {historyContent}
            </div>
        </main>
    )
}

export default History
import React, { useMemo, useRef, useState} from 'react';

//UI
import classes from './GroupHistory.module.css';
import userIcon from '@assets/user-icon.svg'
import PreLoader from '@components/PreLoader/PreLoader';
import Light from '@components/Light/Light';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';
//logic
import DateService from '@services/DateService/DateService';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import { useWindowSize, useOnClickOutside } from 'usehooks-ts';
import { IGroupHistoryItem } from '@models/IHistoryItem';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { Link, useParams } from 'react-router-dom';
import { useGetGroupUsersHistoryQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';


interface IColumnsHistory extends IGroupHistoryItem { edit_remove?: string }

const History: React.FC = () => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const { groupId } = useParams();
    const tooltipRef = useRef<HTMLDivElement>(null);
    const { width, height } = useWindowSize();
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
    const { data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError, isSuccess: isCurrentUserSuccess } = useGetCurrentUserInfoQuery(null);
    const {data: GroupRecentHistory, isError: isGroupRecentHistoryError, isLoading: isGroupRecentHistoryLoading, isFetching: isGroupRecentHistoryFetching, isSuccess: isGroupRecentHistorySuccess} = useGetGroupUsersHistoryQuery({
        group_id: Number(groupId),
        page: pageIndex + 1,
        size: pageSize
    });
    const [isEditExpenseModal, setIsEditExpenseModal] = useState<boolean>(false);
    const [isRemoveExpenseModal, setIsRemoveExpenseModal] = useState<boolean>(false);
    const [ExpenseCredentials, setExpenseCredentials] = useState<{
        id: number,
        descriptions: string,
        amount: number,
        category_id: number,
    }>({
        id: 0,
        descriptions: '',
        amount: 0,
        category_id: 0
    });
    const [tooltipActive, setTooltipActive] = useState(false);
    const [time, setTime] = useState<string>('');
    const columnHelper = createColumnHelper<IColumnsHistory>()
    const columns = [
        columnHelper.accessor(`user_first_name`, {
            header: () => 'Member',
            cell: info => {
                const picture = info.row.original.user_picture ?? ''
                const full_name = () => {
                    if (info?.row?.original?.user_last_name) {
                        return info.row.original.user_first_name + ' ' + info.row.original.user_last_name
                    } else {
                        return info.row.original.user_first_name
                    }
                }
                return info.renderValue() ?
                    <Link to={`/group/${groupId}/member/${info?.row?.original?.user_id}`} className={classes.memberWrapper}>
                        <div className={classes.details}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    style={{ borderRadius: '50%' }}
                                    alt={'user icon'}
                                    src={isUrl(picture) ? picture : userIcon} />
                            </div>
                            <div className={classes.memberInfo}>
                                <h6 className={classes.name}>{full_name()}</h6>
                            </div>
                        </div>
                    </Link> : '-'
            }
        }),
        columnHelper.accessor('title_category', {
            header: () => 'Category',
            cell: info => info.renderValue() ? <div className={classes.wrapItem}>
                <Light
                    className={classes.dotLight}
                    style={{ display: 'inline-block'}}
                    color={info.row.original.color_code_category || 'var(--main-green)'}
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
                <p className={classes.amount} style={{ color:  "#FF2D55", textAlign: "left" }}>{"-"}{currency}{numberWithCommas(info.getValue())}</p>,
        }),
        columnHelper.accessor('edit_remove', {
            header: () => '',
            cell: info => {
                if (info.row.original.user_id !== CurrentUser?.id)
                    return null
                return (<div className={classes.editRemove}>
                    <button className={classes.editButton} onClick={(e) => {
                        e.preventDefault();
                        setExpenseCredentials({
                            id: info.row.original.id,
                            descriptions: info.row.original.descriptions,
                            amount: info.row.original.amount,
                            category_id: info.row.original.category_id
                        })
                        setIsEditExpenseModal(!isEditExpenseModal);
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className={classes.removeButton} onClick={(e) => {
                        e.preventDefault();
                        setExpenseCredentials({
                            id: info.row.original.id,
                            descriptions: info.row.original.descriptions,
                            amount: info.row.original.amount,
                            category_id: info.row.original.category_id
                        })
                        setIsRemoveExpenseModal(!isRemoveExpenseModal)
                    }}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>)
            }
        })
    ];
    

    const table = useReactTable({
        data: GroupRecentHistory?.items || [],
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
    const endIndex = pageIndex === pageCount - 1 ? GroupRecentHistory?.total : (pageIndex + 1) * pageSize;
    
    const hideTip = () => {
        setTooltipActive(false);
    };

    useOnClickOutside(tooltipRef, hideTip);
    const showTooltip = (e: React.MouseEvent<HTMLTableRowElement>, context: any) => {
        if (width <= 768) {
            const el = e.target as HTMLElement;
            const rowEl = el.closest('tr') as HTMLElement;
            const elRect: DOMRect = rowEl.getBoundingClientRect();

            setTime(DateService.getTime(new Date(context.row.original.time), true))
            if (tooltipRef.current) {
                tooltipRef.current.style.left = `${elRect.left + 150}px`;
                tooltipRef.current.style.top = `${elRect.top + 10}px`;
            }
            
            if (!el.closest('button'))
                setTooltipActive(true);
        }   
    }

    let historyContent;
    if (isGroupRecentHistorySuccess && isCurrentUserSuccess && GroupRecentHistory.items.length !== 0) {
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
                    <tr key={row.id} className={classes['in']} onClick={(e) => showTooltip(e, row.getVisibleCells()[2].getContext())}>
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
    return (<>
        <div id="tooltip" className={classes.tooltipWrapper} ref={tooltipRef} onMouseLeave={hideTip} >
            {tooltipActive && <div className={classes.tooltip}>
                <p className={classes.tooltipHeader}>Time</p>
                <p className={classes.tooltipText}>{time}</p>
            </div>}
        </div>
        <ConfirmationModal
        mode='remove_expense'
        title={ExpenseCredentials.descriptions}
        isConfirmationModalOpen={isRemoveExpenseModal}
        setIsConfirmationModalOpen={setIsRemoveExpenseModal}
        groupId={Number(groupId)}
        expenseId={ExpenseCredentials.id}
        callback={() => {
            setExpenseCredentials({
                id: 0,
                descriptions: '',
                amount: 0,
                category_id: 0
            })
        }}
        />
        <ExpenseModal
            type='edit'
            isReplenishment={false}
            amount={ExpenseCredentials.amount}
            description={ExpenseCredentials.descriptions}
            isExpenseModalOpen={isEditExpenseModal}
            setIsExpenseModalOpen={setIsEditExpenseModal}
            groupId={Number(groupId)}
            expenseId={ExpenseCredentials.id}
            categoryId={ExpenseCredentials.category_id}
            setActionCredentials={() => {
                setExpenseCredentials({
                    id: 0,
                    descriptions: '',
                    amount: 0,
                    category_id: 0
                })
            }}
        />
        <main id='GroupHistoryPage' className="no-padding">
            <div className={classes.page__container}>
                {historyContent}
            </div>
        </main>
    </>
       
    )
}

export default History
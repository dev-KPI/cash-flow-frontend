import React, { useMemo, useRef, useState} from 'react';

//UI
import classes from './History.module.css';
import Light from '@components/Light/Light';
import PreLoader from '@components/PreLoader/PreLoader';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';
import Pagination from '@components/Pagination/Pagination';
import IHistoryItem from '@models/IHistoryItem';

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
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { useGetUserHistoryQuery } from '@store/Controllers/UserController/UserController';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';

interface IColumnsHistory extends IHistoryItem {edit_remove?: string}

const History: React.FC = () => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 8,
        })
    const tooltipRef = useRef<HTMLDivElement>(null);
    const { width, height } = useWindowSize();
    const { data: History, isLoading: isHistoryLoading, isError: isHistoryError, isSuccess: isHistorySuccess } = useGetUserHistoryQuery({ page: pageIndex, size: pageSize });
    const [isEditExpenseModal, setIsEditExpenseModal] = useState<boolean>(false);
    const [isReplenishment, setIsReplenishment] = useState<boolean>(false);
    const [isRemoveExpenseModal, setIsRemoveExpenseModal] = useState<boolean>(false);
    const [isRemoveReplenishmentModal, setIsRemoveReplenishmentModal] = useState<boolean>(false);
    const [ExpenseCredentials, setExpenseCredentials] = useState<{
        id: number,
        descriptions: string,
        amount: number,
        category_id: number,
        group_id: number,
    }>({
        id: 0,
        descriptions: '',
        amount: 0,
        category_id: 0,
        group_id: 0,
    });
    const [ReplenishmentCredentials, setReplenishmentCredentials] = useState<{
        id: number,
        amount: number,
        description: string
    }>({
        id: 0,
        amount: 0,
        description: ''
    });
    const [tooltipActive, setTooltipActive] = useState(false);
    const [time, setTime] = useState<string>('');
    const columnHelper = createColumnHelper<IColumnsHistory>()
    const columns = [
    columnHelper.accessor('descriptions', {
        header: () =>'Description',
        cell: info => info.renderValue() ? info.getValue().length > 33 ? info.getValue().slice(0, 30) + '...' : info.getValue() : '-',
    }),
    columnHelper.accessor('title_category', {
        header: () => 'Category',
        cell: info => info.renderValue() ? <div className={classes.wrapItem}>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.category_id !== null ? 'inline-block' : 'none' }}
                color={info.row.original.color_code_category || 'var(--main-green)'}
                type='solid' />
            <p className={classes.itemTitle}>{info.getValue().length > 12 ? info.getValue().slice(0, 9) + '...' : info.getValue()}</p>
        </div> : '-',
    }),
    columnHelper.accessor('title_group', {
        header: () => 'Group',
        cell: info => info.renderValue() ? <div className={classes.wrapItem}>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.category_id !== null ? 'inline-block' : 'none' }}
                color={info.row.original.color_code_group || 'var(--main-green)'}
                type='solid' />
            <p className={classes.itemTitle}>{info.getValue() ?? '-'}</p>
        </div> :
            '-'
    }),
    columnHelper.accessor('time', {
        header: () => 'Time',
        cell: info => DateService.getTime(new Date(info.getValue()), true),
    }),
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info =>
            <p className={classes.amount} style={{ color: info.row.original.category_id !== null ? "#FF2D55" : "#80D667" }}>{info.row.original.category_id !== null ? "-" : "+"}{currency}{numberWithCommas(info.getValue())}</p>,
    }),
    columnHelper.accessor('edit_remove', {
        header: () => '',
        cell: info => <div className={classes.editRemove}>
            <button className={classes.editButton} onClick={(e) => {
                const isExpense = (!!info.row.original?.group_id && (info.row.original?.group_id > 0))
                e.preventDefault();
                isExpense ? (setExpenseCredentials({
                    id: info.row.original.id,
                    descriptions: info.row.original.descriptions,
                    amount: info.row.original.amount,
                    category_id: info.row.original.category_id,
                    group_id: info.row.original.group_id,
                })) : (setReplenishmentCredentials({
                    id: info.row.original.id,
                    amount: info.row.original.amount,
                    description: info.row.original.descriptions
                }));
                setIsReplenishment(!isExpense);
                setIsEditExpenseModal(!isEditExpenseModal);
            }}>
                <i className="bi bi-pencil"></i>
            </button>
            <button className={classes.removeButton} onClick={(e) => { 
                e.preventDefault(); 
                const isExpense = (!!info.row.original?.group_id && (info.row.original?.group_id > 0))
                isExpense ? (setExpenseCredentials({
                    id: info.row.original.id,
                    descriptions: info.row.original.descriptions,
                    amount: info.row.original.amount,
                    category_id: info.row.original.category_id,
                    group_id: info.row.original.group_id,
                })) : (setReplenishmentCredentials({
                    id: info.row.original.id,
                    amount: info.row.original.amount,
                    description: info.row.original.descriptions
                }));
                setIsReplenishment(!isExpense);
                isExpense ? setIsRemoveExpenseModal(!isRemoveExpenseModal) : 
                    setIsRemoveReplenishmentModal(!isRemoveReplenishmentModal)
            }}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    }),
    ]
    const [sorting, setSorting] = useState<SortingState>([]) 
    
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )

    const table = useReactTable({
        data: History?.items || [],
        columns,
        pageCount: History?.pages,
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

    const totalCount = History?.total;

    const hideTip = () => {
        setTooltipActive(false);
    };

    useOnClickOutside(tooltipRef, hideTip);
    const showTooltip = (e: React.MouseEvent<HTMLTableRowElement>, context: any) => {
        if (width <= 450) {
            const el = e.target as HTMLElement;
            const rowEl = el.closest('tr') as HTMLElement;
            const elRect: DOMRect = rowEl.getBoundingClientRect();

            setTime(DateService.getTime(new Date(context.row.original.time), true))
            if (tooltipRef.current) {
                tooltipRef.current.style.left = `${elRect.left + 100}px`;
                tooltipRef.current.style.top = `${elRect.top + 10}px`;
            }
            
            if (!el.closest('button'))
                setTooltipActive(true);
        }   
    }

    let historyContent;
    if (isHistorySuccess && History.items.length > 0) {
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
                    <tr key={row.id} onClick={(e) => showTooltip(e, row.getVisibleCells()[4].getContext())}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr>
                    <td colSpan={6}>
                        <Pagination
                            totalCount={totalCount}
                            pageIndex={pageIndex}
                            getPageCount={table.getPageCount}
                            pageSize={pageSize}
                            setPageSize={table.setPageSize}
                            previousPage={table.previousPage}
                            nextPage={table.nextPage}
                            getCanPreviousPage={table.getCanPreviousPage}
                            getCanNextPage={table.getCanNextPage}

                        />
                    </td>
                </tr>
            </tbody>
        </table>)
    } else if (isHistorySuccess && History.items.length === 0) {
        historyContent = (<div className={classes.noItems}>
            <i className="bi bi-clock-history"></i>
            <h5 className={classes.noItems__title}>You doesn't have any expenses</h5>
            <p className={classes.noItems__text}>Back to main page and to add at least one</p>
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
        groupId={ExpenseCredentials.group_id}
        expenseId={isReplenishment ? ReplenishmentCredentials.id : ExpenseCredentials.id}
        callback={() => {}}
        />
        <ConfirmationModal
        mode='remove_replenishment'
        replenishmentId={ReplenishmentCredentials.id}
        title={ReplenishmentCredentials.description}
        isConfirmationModalOpen={isRemoveReplenishmentModal}
        setIsConfirmationModalOpen={setIsRemoveReplenishmentModal}
        callback={() => { }}
        />
        <ExpenseModal
            type='edit'
            isReplenishment={isReplenishment}
            amount={isReplenishment ? ReplenishmentCredentials.amount : ExpenseCredentials.amount}
            description={isReplenishment ? ReplenishmentCredentials.description : ExpenseCredentials.descriptions}
            isExpenseModalOpen={isEditExpenseModal}
            setIsExpenseModalOpen={setIsEditExpenseModal}
            groupId={ExpenseCredentials.group_id}
            expenseId={isReplenishment ? ReplenishmentCredentials.id : ExpenseCredentials.id}
            categoryId={ExpenseCredentials.category_id}
        />
        <main id='HistoryPage'>
            <div className={classes.page__container}>
                <h1 className={classes.pageTitle}>History</h1>
                {historyContent}
            </div>
        </main>
    </>)
}

export default History
import React, { useMemo, useState} from 'react';

//UI
import classes from './History.module.css';
import Light from '@components/Light/Light';
import PreLoader from '@components/PreLoader/PreLoader';
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
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import IHistoryItem from '@models/IHistoryItem';
import { useGetUserHistoryQuery } from '@store/Controllers/UserController/UserController';



const columnHelper = createColumnHelper<IHistoryItem>()
const columns = [
    columnHelper.accessor('descriptions', {
        header: () =>'Description',
        cell: info => info.getValue().length > 33 ? info.getValue().slice(0, 30) + '...' : info.getValue(),
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
        meta: {
            width: '100px'
        },
        cell: info =>
            <p className={classes.amount} style={{ color: info.row.original.category_id !== null ? "#FF2D55" : "#80D667", textAlign: "left" }}>{info.row.original.category_id !== null ? "-" : "+"}${numberWithCommas(info.getValue())}</p>,
    }),
]

const History: React.FC = () => {
    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 8,
        })
    const { data: History, isLoading: isHistoryLoading, isError: isHistoryError, isSuccess: isHistorySuccess } = useGetUserHistoryQuery({ page: pageIndex, size: pageSize });

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
    const pageCount = History?.pages
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex + 1 === pageCount ? totalCount : (pageIndex + 1) * pageSize;

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
                                    value={table.getState().pagination.pageSize}
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
                                {totalCount}
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
    return (
        <main id='HistoryPage'>
            <div className={classes.page__container}>
                <h1 className={classes.pageTitle}>History</h1>
                {historyContent}
            </div>
        </main>
    )
}

export default History
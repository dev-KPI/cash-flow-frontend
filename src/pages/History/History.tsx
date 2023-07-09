import React, {FC, useState} from 'react'

//UI
import classes from './History.module.css';

//logic
import ICategory from '@models/ICategory';
import { HistoryObj } from "@pages/HistoryObj";
import DateService from '@services/DateService/DateService';
import { addFieldToObject, Omiter } from "@services/UsefulMethods/ObjectMethods";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Light from '@components/Light/Light';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';


interface Transaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: ICategory
        category?: ICategory
    },
    type: string
}


const columnHelper = createColumnHelper<Transaction>()
const columns = [
    columnHelper.accessor('description', {
        header: () =>'Description',
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('category_group.category.title', {
        header: () => 'Category',
        cell: info => <>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.type === 'expense' ? 'inline-block' : 'none' }}
                color={info.row.original.category_group?.category?.color || 'var(--main-green)'}
                type='solid' />
            <p className={classes.itemTitle}>{info.getValue() ?? '-'}</p>
        </>,
    }),
    columnHelper.accessor('category_group.group.title', {
        header: () => 'Group',
        cell: info => <>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.type === 'expense' ? 'inline-block' : 'none' }}
                color={info.row.original.category_group?.group?.color || 'var(--main-green)'}
                type='solid' />
            <p className={classes.itemTitle}>{info.getValue() ?? '-'}</p>
        </>,
    }),
    columnHelper.accessor('time', {
        header: () => 'Time',
        cell: info => DateService.getTime(new Date(info.getValue())),
    }),
    columnHelper.accessor('amount', {
        header: () => 'Amount',
        cell: info =>
            <p style={{ color: info.row.original.type === 'expense' ? "#FF2D55" : "#80D667", textAlign: "left" }}>{info.row.original.type === 'expense' ? "-" : "+"}${numberWithCommas(info.getValue())}</p>,
    }),
]
const expensesDTO: Transaction[] = [...HistoryObj.expenses.map((el: Object) =>
    Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
const replenishmentsDTO: Transaction[] = [...HistoryObj.replenishments.map((el: Object) =>
    Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))
const HistoryArray: Transaction[] = [...expensesDTO, ...replenishmentsDTO]

const getMixedHistory = () => {
    return (HistoryArray.sort((b, a) => {
        const dateA = new Date(a.time).getTime();
        const dateB = new Date(b.time).getTime();
        return dateA - dateB;
    }))
}

 const History:React.FC = () => {
    const [data, setData] = useState(() => [...getMixedHistory()])
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 6
            }
        }
    })
    const { pageIndex, pageSize } = table.getState().pagination
    const pageCount  = table.getPageCount()
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? data.length : (pageIndex + 1) * pageSize;

    return (
        <main id='HistoryPage'>
            <div className={classes.page__container}>
                <h1 className={classes.pageTitle}>History</h1>
                <table className={classes.recentOperations__table}>
                    <thead className={classes.tableTitle}>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
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
                                            defaultValue={6}
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
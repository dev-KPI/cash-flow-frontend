import React, {FC, useState} from 'react';

//UI
import classes from './GroupHistory.module.css';
import userIcon from '@assets/user-icon.svg'

//logic
import ICategory from '@models/ICategory';
import IUser from '@models/IUser';
import { GroupHistoryObj } from "@pages/GroupHistoryObj";
import DateService from '@services/DateService/DateService';
import { addFieldToObject, Omiter } from "@services/UsefulMethods/ObjectMethods";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import Light from '@components/Light/Light';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';



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
    columnHelper.accessor(`user.last_name`, {
        header: () =>'Member',
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
    columnHelper.accessor('category_group.category.title', {
        header: () => 'Category',
        cell: info => info.renderValue() ? <div className={classes.wrapItem}>
            <Light
                className={classes.dotLight}
                style={{ display: info.row.original.type === 'expense' ? 'inline-block' : 'none' }}
                color={info.row.original.category_group?.category?.color || 'var(--main-green)'}
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
const expensesDTO: GroupHistory[] = [...GroupHistoryObj.expenses.map((el: Object) =>
    Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
const replenishmentsDTO: GroupHistory[] = [...GroupHistoryObj.replenishments.map((el: Object) =>
    Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))
const HistoryArray: GroupHistory[] = [...expensesDTO, ...replenishmentsDTO]

const getMixedHistory = () => {
    return (HistoryArray.sort((b, a) => {
        const dateA = new Date(a.time).getTime();
        const dateB = new Date(b.time).getTime();
        return dateA - dateB;
    }))
}

const History: React.FC = () => {
    const [data, setData] = useState([...getMixedHistory()])
    const [sorting , setSorting] = useState<SortingState>([]) 
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 8
            }
        }
    })
    const { pageIndex, pageSize } = table.getState().pagination
    const pageCount  = table.getPageCount()
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? data.length : (pageIndex + 1) * pageSize;

    return (
        <main id='GroupHistoryPage' className="no-padding">
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
                                                    asc: <i id={classes.sortBtn} className="bi bi-caret-up-fill" style={{ fontSize: 16, position: 'absolute'}}></i>,
                                                    desc: <i id={classes.sortBtn} className="bi bi-caret-down-fill" style={{ fontSize: 16, position: 'absolute'}}></i>
                                                }[header.column.getIsSorted() as string] ?? null }
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
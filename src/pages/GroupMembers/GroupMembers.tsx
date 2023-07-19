import React, { useRef, useState } from 'react';
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
    Row,
    useReactTable,
} from '@tanstack/react-table'
import { isUrl } from '@services/UsefulMethods/UIMethods';
import SmallModal from '@components/ModalWindows/SmallModal/SmallModal';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';

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
    const { groupId } = useParams<{ groupId: string }>();
    const [data, setData] = useState([...MembersObj.members])
    // let groups: IGroup[] = GroupObj;
    // const adminId = groups.find((group) => group.id === groupId)?.group.admin.id;
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
                if (info.row.original.user.id === 0) { //adminId
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
                    <ButtonContent groupId={groupId} userId={info.row.original.user.id} isActionDisabled={isActionDisabled}/>
                </div >
        }
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        meta: {
            getClass: (row: Row<GroupMember>): string => (
                row.original.status === 'pending' ? classes.pending : ''
            ),
        }
    })
    const { pageIndex, pageSize } = table.getState().pagination
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
        userId: number,
        isActionDisabled: boolean
    }> = ({ groupId, userId, isActionDisabled }) => {
    const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false)
    const actionsButtonRef = useRef(null);
    const handleActionOpen = () => {
        if (isActionDisabled) return
        else setIsActionsOpen(!isActionsOpen)
    }
    const navigate = useNavigate();
    return (<>
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
                        callback={() => navigate(`/group/${groupId}/member/${userId}`)}
                        isPending={false}
                        disableScale={true}
                        className={classes.btnInsight}
                        children={
                            <div className={classes.btnChild}>
                                <i className="bi bi-bar-chart"></i>
                                <p>Insight</p>
                            </div>
                        } />
                    <CustomButton
                        isPending={false}
                        children="Remove member"
                        icon={'none'}
                        type="danger"
                        background={'outline'}
                        disableScale={true}
                        callback={() => { }}
                        className={`${classes.leaveButton} btn-danger outline`} />
                </div>}
        /></>)
}
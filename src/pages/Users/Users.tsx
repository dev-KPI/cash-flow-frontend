import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//UI
import classes from './Users.module.css';
import userIcon from '@assets/user-icon.svg'

//logic
import IUser from '@models/IUser';
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
import { useGetUsersQuery } from '@store/Controllers/UserController/UserController';
import InvitationModal from '@components/ModalWindows/InvitationModal/InvitationModal';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
import IGroup from '@models/IGroup';



const columnHelper = createColumnHelper<IUser>()

const Users: React.FC = () => {
    
    const { data: Users, isLoading: isUsersLoading, isError: isUsersError } = useGetUsersQuery(null);
    const { data: Groups, isFetching: isGroupsFetching, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null);
    const [data, setData] = useState<IUser[]>([])
    useEffect(() => {
        setData(Users || [])
    }, [Users])
    const columns = [
        columnHelper.accessor(`last_name`, {
            header: () => 'Member',
            cell: info => {
                const picture = info.row.original.picture ?? ''
                const full_name = info.row.original.first_name + ' ' + info.row.original.last_name
                const email = info.row.original.login
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
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: info => {
                const userName = info.row.original.first_name + ' ' + info.row.original.last_name
                const userId = info.row.original.id
                const groups = isGroupsSuccess ? Groups.user_groups : []
                return <Button
                    userName={userName}
                    userId={userId}
                    groups={groups}    
                />
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
    })
    const { pageIndex, pageSize } = table.getState().pagination
    const pageCount = table.getPageCount()
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = pageIndex === pageCount - 1 ? data.length : (pageIndex + 1) * pageSize;

    return (
        <main id='Users'>
            <div className={classes.page__container}>
                <h1 className={classes.pageTitle}>Users</h1>
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

export default Users

const Button: React.FC<{
    userName: string,
    userId: number,
    groups: IGroup[]
}> = ({userName, userId, groups}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    // const navigate = useNavigate();
    return (<>
        <InvitationModal
            userName={userName}
            userId={userId}
            groups={groups}
            isInvitationModalOpen={isModalOpen}
            setIsInvitationModalOpen={setIsModalOpen}
        />
        <CustomButton
            icon={'add'}
            type={'primary'}
            background={'outline'}
            callback={() => setIsModalOpen(!isModalOpen)}
            isPending={false}
            disableScale={true}
            className={classes.addToGroupBtn}
            children={'Add to group'}
        />
    </>)
}


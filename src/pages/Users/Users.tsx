import React, { useMemo, useState } from 'react';
//UI
import classes from './Users.module.css';
import userIcon from '@assets/user-icon.svg'
import InvitationModal from '@components/ModalWindows/InvitationModal/InvitationModal';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import PreLoader from '@components/PreLoader/PreLoader';
import Pagination from '@components/Pagination/Pagination';

//logic
import IUser from '@models/IUser';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel, 
    PaginationState,
    useReactTable,
} from '@tanstack/react-table'
import { isUrl } from '@services/UsefulMethods/UIMethods';
import { useGetCurrentUserInfoQuery, useGetUsersQuery } from '@store/Controllers/UserController/UserController';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
import IGroup from '@models/IGroup';

const columnHelper = createColumnHelper<IUser>()

const Users: React.FC = () => {
    const [{ pageIndex, pageSize }, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 8,
        })
    const { data: Users, isLoading: isUsersLoading, isError: isUsersError, isSuccess: isUsersSuccess } = useGetUsersQuery({ page: pageIndex + 1, size: pageSize });
    const { data: Groups, isLoading: isGroupsLoading, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null);
    const { data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError, isSuccess: isCurrentUserSuccess } = useGetCurrentUserInfoQuery(null);

    const columns = [
        columnHelper.accessor(`first_name`, {
            header: () => 'Member',
            cell: info => {
                const picture = info.row.original.picture ?? ''
                const full_name = () => {
                    if (info?.row?.original?.last_name) {
                        return (info.row.original.first_name + ' ' + info.row.original.last_name).slice(0, 40)
                    } else {
                        return info.row.original.first_name.slice(0,40)
                    }
                }
                const email = info.row.original.login
                return info.renderValue() ?
                        <div className={classes.details}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={isUrl(picture) ? picture : userIcon} />
                            </div>
                            <div className={classes.memberInfo}>
                                <h6 className={classes.name}>{full_name()}</h6>
                                {/* <p className={classes.email}>{email}</p> */}
                            </div>
                        </div> : ''
            }
        }),
        columnHelper.display({
            id: 'actions',
            header: () => 'Actions',
            cell: info => {
                if (info.row.original.id === CurrentUser?.id)
                    return null
                const userName = (info.row.original.first_name + ' ' + info.row.original.last_name).slice(0,40)
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
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize]
    )
    const table = useReactTable({
        data: Users?.items || [],
        columns,
        pageCount: Users?.pages,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        manualPagination: true,
        onPaginationChange: setPagination,
        state: {
            pagination
        },
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
    })
    const totalCount = Users?.total;
   
    let usersContent;
    if (isUsersSuccess && isCurrentUserSuccess && isGroupsSuccess && Users.items.length > 0)
        usersContent = <table className={classes.recentOperations__table}>
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
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                <tr>
                    <td colSpan={5}>
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
        </table>
    else if (isUsersSuccess && isCurrentUserSuccess && isGroupsSuccess && Users.items.length === 0)
        usersContent = (<div className={classes.noItems}>
            <i className="bi bi-person-exclamation"></i>
            <h5 className={classes.noItems__title}>Our app doesn't have any users yet :(</h5>
        </div>)
    else
        usersContent = <div className={classes.loaderWrapper}>
            <PreLoader preLoaderSize={50} type='auto' />
        </div>
    return (
       <main id='Users'>
            <div className={classes.page__container}>
                <h1 className={classes.pageTitle}>Users</h1>
                {usersContent}
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


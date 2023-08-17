import IListResponse from '@models/IListResponse';
import IUser from '@models/IUser';
import { api } from '@store/api';

//types
import { IGetCurrentUserBalance, IGetCurrentUserInfo, IGetUsersFromGroupResponse, IGetExpensesBody, IGetTotalExpensesResponse, IGetTotalReplenishmentsResponse } from './UserControllerInterfaces';


export const UserApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserAuthStatus: builder.query<boolean, null>({
            query: () => ({
                url: `users/user-balance`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: {balance: number}): boolean => {
                if (!response) {
                    return false  
                } 
                return !!response
            },
            providesTags: [{ type: 'UserController' as const, id: 0 }],
        }),
        getCurrentUserInfo: builder.query<IGetCurrentUserInfo, null>({
            query: () => ({
                url: `users/info`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (res) => res ? [{ type: 'UserController' as const, id: res.id }] :
            [],
        }),
        getUsers: builder.query<IListResponse<IUser>, {page: number, size: number}>({
            query: ({page = 0, size}) => ({
                url: `users`,
                credentials: 'include',
                params: {
                    page: page + 1,
                    size
                }
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [{ type: 'UserController' as const }],
        }),
        getUsersByGroup: builder.query<IGetUsersFromGroupResponse, { group_id: number }>({
            query: ({ group_id }) => ({
                url: `/groups/${group_id}/users`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) => result ?
                [...result.users_group.map(item => ({ type: 'UserController' as const, id: item.user.id })),
                { type: 'UserController' as const, id: 'Users' }]
                :
                [{ type: 'UserController' as const, id: 'Users' }],
        }),    
        getCurrentUserBalance: builder.query<IGetCurrentUserBalance, null>({
            query: () => ({
                url: `users/user-balance`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [
                { type: 'UserController' as const, id: 0 },
                { type: 'ReplenishmentsController' as const, id: 'CREATE_REPLENISHMENT' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getTotalExpenses: builder.query<IGetTotalExpensesResponse, IGetExpensesBody>({
            query: (period) => ({
                url: `users/total-expenses`,
                credentials: 'include',
                parms: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [
                { type: 'UserController' as const, id: 0 },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getTotalReplenishments: builder.query<IGetTotalReplenishmentsResponse, IGetExpensesBody>({
            query: (period) => ({
                url: `users/total-replenishments`,
                credentials: 'include',
                parms: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [
                { type: 'UserController' as const, id: 0 },
                { type: 'ReplenishmentsController' as const, id: 'CREATE_REPLENISHMENT' }]
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserAuthStatusQuery,
    useGetCurrentUserInfoQuery,
    useGetUsersQuery,
    useGetUsersByGroupQuery,
    useGetCurrentUserBalanceQuery,
    useGetTotalExpensesQuery,
    useGetTotalReplenishmentsQuery
} = UserApiSlice
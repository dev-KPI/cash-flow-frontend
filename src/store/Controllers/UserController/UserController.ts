import IHistoryItem from '@models/IHistoryItem';
import IListResponse from '@models/IListResponse';
import IUser from '@models/IUser';
import { api } from '@store/api';

//types
import { IGetCurrentUserBalance, IGetCurrentUserInfo, IGetUsersFromGroupResponse, IGetTotalExpensesBody, IGetTotalExpensesResponse, IGetTotalReplenishmentsResponse, IGetTotalReplenishmentsBody, IGetUserExpensesByGroupResponse, IGetUserExpensesByGroupBody, IGetUserExpensesByCategoryResponse, IGetUserExpensesByCategoryBody } from './UserControllerInterfaces';


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
        getUserHistory: builder.query<IListResponse<IHistoryItem>, { page: number, size: number }>({
            query: ({ page = 0, size }) => ({
                url: `users/history`,
                credentials: 'include',
                params: {
                    page: page + 1,
                    size
                },
                refetchInterval: 60000,
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IListResponse<IHistoryItem>, arg, body: { page: number, size: number }): IListResponse<IHistoryItem> => {
                const userTimezoneOffsetMinutes = new Date().getTimezoneOffset();
                const userTimezoneOffsetMilliseconds = userTimezoneOffsetMinutes * 60 * 1000;
                const historyItems: IHistoryItem[] = response.items.map(el => {
                    const UserTimezone = new Date(new Date(el.time).getTime() - userTimezoneOffsetMilliseconds);
                    return {
                        id: el.id,
                        descriptions: el.descriptions,
                        amount: el.amount,
                        time: UserTimezone,
                        category_id: el.category_id,
                        group_id: el.group_id,
                        color_code_category: el.color_code_category,
                        title_category: el.title_category,
                        title_group: el.title_group,
                        color_code_group: el.color_code_group
                    }
                })
                return {
                    total: response.total,
                    page: response.page,
                    size: response.size,
                    pages: response.pages,
                    items: historyItems
                } as IListResponse<IHistoryItem>
            },
            providesTags: 
                [{ type: 'UserController' as const, id: 0 },
                {type: 'ReplenishmentsController' as const, id: 'CREATE_REPLENISHMENT' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getUserExpensesByGroup: builder.query<IGetUserExpensesByGroupResponse, IGetUserExpensesByGroupBody>({
            query: ({ group_id, period }) => ({
                url: `/users/${group_id}/expenses`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.categories.map(item => ({ type: 'CategoryController' as const, id: item.id })),
                { type: 'CategoryController', id: 'CATEGORIES' },
                { type: 'UserController' as const, id: 0 },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP'}]
                :
            [{ type: 'CategoryController', id: 'CATEGORIES' },
                { type: 'UserController' as const, id: 0 },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }), 
        getUserExpensesByCategory: builder.query<IGetUserExpensesByCategoryResponse[], IGetUserExpensesByCategoryBody>({
            query: (period) => ({
                url: `/users/category-expenses`,
                credentials: 'include',
                params: period.period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: 
                [{ type: 'CategoryController', id: 'CATEGORIES' },
                { type: 'UserController' as const, id: 0 },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
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
        getTotalExpenses: builder.query<IGetTotalExpensesResponse, IGetTotalExpensesBody>({
            query: ({period}) => ({
                url: `users/total-expenses`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [
                { type: 'UserController' as const, id: 0 },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getTotalReplenishments: builder.query<IGetTotalReplenishmentsResponse, IGetTotalReplenishmentsBody>({
            query: ({period}) => ({
                url: `users/total-replenishments`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [
                { type: 'UserController' as const, id: 0 },
                { type: 'ReplenishmentsController' as const, id: 'CREATE_REPLENISHMENT' }]
        })
    }),
    overrideExisting: false,
})

export const {
    useGetUserAuthStatusQuery,
    useGetCurrentUserInfoQuery,
    useGetUsersQuery,
    useGetUsersByGroupQuery,
    useGetUserExpensesByGroupQuery,
    useGetUserHistoryQuery,
    useGetUserExpensesByCategoryQuery,
    useGetCurrentUserBalanceQuery,
    useGetTotalExpensesQuery,
    useGetTotalReplenishmentsQuery
} = UserApiSlice
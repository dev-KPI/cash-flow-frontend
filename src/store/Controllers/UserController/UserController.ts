import { api } from '@store/api';
import { getDaysInMonth, addDays } from 'date-fns';
import DateService from '@services/DateService/DateService';
//types
import { IGetCurrentUserBalance, IGetCurrentUserInfo, IGetTotalExpensesBody, IGetTotalExpensesResponse, IGetTotalReplenishmentsResponse, IGetTotalReplenishmentsBody, IGetUserExpensesByCategoryResponse, IGetUserExpensesByCategoryBody, IGetCurrentUserDailyExpensesResponse, IGetUserExpensesByGroupResponse, IGetUserExpensesByGroupBody } from './UserControllerInterfaces';
import IHistoryItem from '@models/IHistoryItem';
import IListResponse from '@models/IListResponse';
import IUser from '@models/IUser';
import { IPeriods } from '@models/IPeriod';

export const UserApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserAuthStatus: builder.query<boolean, null>({
            query: () => ({
                url: `users/check-auth`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
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
                    page,
                    size
                }
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [{ type: 'UserController' as const }],
        }),
        getUserHistory: builder.query<IListResponse<IHistoryItem>, { page: number, size: number }>({
            query: ({ page = 0, size }) => ({
                url: `users/history`,
                credentials: 'include',
                params: {
                    page: page + 1,
                    size
                },
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
                [{type: 'ReplenishmentsController' as const, id: 'REPLENISHMENTS' },
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
                { type: 'ReplenishmentsController' as const, id: 'REPLENISHMENTS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getCurrentUserExpensesDaily: builder.query<IGetCurrentUserDailyExpensesResponse[], IPeriods>({
            query: ({ period }) => ({
                url: `users/daily-expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetCurrentUserDailyExpensesResponse[], arg, body: IPeriods): IGetCurrentUserDailyExpensesResponse[] => {
                if ('start_date' in body.period && 'end_date' in body.period) {
                    const expenseMap: Record<string, IGetCurrentUserDailyExpensesResponse> = {};
                    response.forEach(expense => {
                        expenseMap[new Date(expense.date).toISOString().split('T')[0]] = expense;
                    });

                    const dateRange = DateService.getDatesInRange(new Date(body.period.start_date!), new Date(body.period.end_date!));
                    dateRange.shift();

                    return dateRange.map(date => {
                        const dateISOString = date.toISOString().split('T')[0];
                        if (expenseMap[dateISOString]) {
                            return expenseMap[dateISOString];
                        } else {
                            return {
                                date: dateISOString,
                                amount: 0,
                            };
                        }
                    });
                } else {
                    const daysInMonth = getDaysInMonth(new Date(body.period.year_month!));
                    const startDate = new Date(body.period.year_month + '-01');

                    return Array.from({ length: daysInMonth }, (_, i) => {
                        const currentDate = addDays(startDate, i);
                        const formattedDate = DateService.getFormatedDate(currentDate.getDate());
                        const dateKey = `${body?.period?.year_month ? body.period.year_month : ''}-${formattedDate}`;

                        const existingExpense = response.find(expense => expense.date === dateKey);

                        return existingExpense || {
                            date: dateKey,
                            amount: 0,
                        };
                    });
                }
            },
            providesTags: [
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'GroupsController' as const, id: 'GROUPS' },
            ]
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
                { type: 'ReplenishmentsController' as const, id: 'REPLENISHMENTS' }]
        })
    }),
    overrideExisting: false,
})

export const {
    useGetUserAuthStatusQuery,
    useGetCurrentUserInfoQuery,
    useGetUsersQuery,
    useGetUserExpensesByGroupQuery,
    useGetCurrentUserExpensesDailyQuery,
    useGetUserHistoryQuery,
    useGetUserExpensesByCategoryQuery,
    useGetCurrentUserBalanceQuery,
    useGetTotalExpensesQuery,
    useGetTotalReplenishmentsQuery
} = UserApiSlice
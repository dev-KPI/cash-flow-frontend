import { api } from '@store/api';

//types
import { 
    IGetCurrentUserGroups, 
    ICreateGroupBody,
    ICreateGroupResponse,
    IUpdateGroupBody,
    IUpdateGroupResponse,
    IRemoveUserResponse,
    IGetInfoFromGroupResponse,
    IGetTotalExpensesResponse,
    IGetTotalExpensesBody,
    IGetCurrentGroupSpendersResponse,
    IGetCurrentGroupSpendersBody,
    IGetGroupExpensesByCategoryResponse,
    IGetGroupExpensesByCategoryBody,
    IGetGroupExpensesDailyResponse,
    IGetGroupExpensesDailyBody,
    IGetGroupExpensesByMemberDailyResponse,
    IGetGroupUsersHistoryResponse,
    IGetUsersFromGroupResponse,
    IGetUserByGroupInfoBody,
    IGetUserByGroupInfoResponse,
    IGroupMemberExpensesDailyBody,
    IGroupMemberExpensesDailyResponse,
    IGroupMemberExpensesByCategoryDailyResponse,
    IGroupMemberExpensesByCategoryDailyBody,
    IGetGroupMemberHistoryResponse
} from './GroupsControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import { IPeriods } from '@models/IPeriod';
import DateService from '@services/DateService/DateService';
import { getDaysInMonth, addDays } from 'date-fns';


export const GroupsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserGroups: builder.query<IGetCurrentUserGroups, null>({
            query: () => ({
                url: `groups/`,
                credentials: 'include',
            }),
            transformResponse: (response: IGetCurrentUserGroups): IGetCurrentUserGroups => {
                return {user_groups: response.user_groups.filter(el => el.status !== 'INACTIVE')}
            },
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result?.user_groups[0] ? 
            [...result.user_groups.map(el => ({type: 'GroupsController' as const, id: el.group.id })),
            {type: 'GroupsController' as const, id: 'GROUPS_DELETE'}, 
            {type: 'GroupsController' as const, id: 'GROUPS' }] :
            [{type: 'GroupsController' as const, id: 'GROUPS' },
            {type: 'GroupsController' as const, id: 'GROUPS_DELETE'}]
        }),
        getInfoByGroup: builder.query<IGetInfoFromGroupResponse, {group_id: number}>({
            query: ({group_id}) => ({
                url: `/groups/${group_id}/info`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) => 
            result ? [{ type: 'GroupsController' as const, id: body.group_id },
            { type: 'GroupsController', id: 'GROUPS' }] : 
            [{ type: 'GroupsController', id: 'GROUPS' }]
        }),
        getMemberInfoByGroup: builder.query<IGetUserByGroupInfoResponse, IGetUserByGroupInfoBody>({
            query: ({member_id, group_id, period}) => ({
                url: `groups/${group_id}/member/${member_id}/info`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (res, arg, body) => res ? [
                { type: 'UserController' as const, id: body.member_id }, 
                { type: 'GroupsController', id: body.group_id }, 
                {type: 'ReplenishmentsController' as const, id: 'REPLENISHMENTS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }] :
                [{ type: 'GroupsController', id: body.group_id }, 
                {type: 'ReplenishmentsController' as const, id: 'REPLENISHMENTS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
        getUsersByGroup: builder.query<IGetUsersFromGroupResponse, { group_id: number, page: number, size: number }>({
            query: ({ group_id, page, size }) => ({
                url: `/groups/${group_id}/users`,
                credentials: 'include',
                params: {
                    page: page,
                    size: size
                }
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) => result?.items ?
                [...result.items[0].users_group.map(item => ({ type: 'UserController' as const, id: item.user.id })),
                { type: 'UserController' as const, id: 'Users' }]
                :
                [{ type: 'UserController' as const, id: 'Users' }],
        }), 
        getGroupTotalExpenses: builder.query<IGetTotalExpensesResponse, IGetTotalExpensesBody>({
            query: ({ period, group_id }) => ({
                url: `groups/${group_id}/total-expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, arg, body) => result ? [{ type: 'ExpensesController' as const, id: body.group_id },
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
                :
                [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
        }),
        getCurrentUserInGroupTotalExpenses: builder.query<IGetTotalExpensesResponse, IGetTotalExpensesBody>({
            query: ({ period, group_id }) => ({
                url: `groups/${group_id}/my-total-expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, arg, body) => result ? [{ type: 'ExpensesController' as const, id: body.group_id },
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
                :
                [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
        }),
        getGroupUsersHistory: builder.query<IGetGroupUsersHistoryResponse, { group_id: number, page: number, size: number }>({
            query: ({ group_id, page, size }) => ({
                url: `/groups/${group_id}/history`,
                credentials: 'include',
                params: {
                    page: page,
                    size: size
                },
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) =>
                result ? [{ type: 'GroupsController' as const, id: body.group_id },
                { type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },] :
                    [{ type: 'GroupsController', id: 'GROUPS' },
                    { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },]
        }),
        getGroupMemberHistory: builder.query<IGetGroupMemberHistoryResponse, { group_id: number, member_id: number, page: number, size: number }>({
            query: ({ group_id, member_id, page, size }) => ({
                url: `/groups/${group_id}/member/${member_id}/history/`,
                credentials: 'include',
                params: {
                    page: page,
                    size: size
                },
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) =>
                result ? [{ type: 'GroupsController' as const, id: body.group_id },
                { type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },] :
                    [{ type: 'GroupsController', id: 'GROUPS' },
                    { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },]
        }), 
        getCurrentGroupSpenders: builder.query<IGetCurrentGroupSpendersResponse[], IGetCurrentGroupSpendersBody>({
            query: ({ period, group_id }) => ({
                url: `groups/${group_id}/users-spenders`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, arg, body) => result ? [{ type: 'ExpensesController' as const, id: body.group_id },
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
                :
                [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
        }),
        getGroupExpensesByCategory: builder.query<IGetGroupExpensesByCategoryResponse[], IGetGroupExpensesByCategoryBody>({
            query: ({group_id, period}) => ({
                url: `/groups/${group_id}/category-expenses`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetGroupExpensesByCategoryResponse[], arg, body: IGetGroupExpensesByCategoryBody): IGetGroupExpensesByCategoryResponse[] => { 
                return response.filter((category)=> category.amount !== null)
            },
            providesTags:
                [{ type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }), 
        getGroupExpensesDaily: builder.query<IGetGroupExpensesDailyResponse[], IGetGroupExpensesDailyBody>({
            query: ({ group_id, period }) => ({
                url: `/groups/${group_id}/group-daily-expenses`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetGroupExpensesDailyResponse[], arg, body: IPeriods): IGetGroupExpensesDailyResponse[] => {
                if ('start_date' in body.period && 'end_date' in body.period) {
                    const expenseMap: Record<string, IGetGroupExpensesDailyResponse> = {};
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
            providesTags:
                [{ type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }), 
        getGroupExpensesByMemberDaily: builder.query<IGetGroupExpensesByMemberDailyResponse[], IGetGroupExpensesDailyBody>({
            query: ({ group_id, period }) => ({
                url: `/groups/${group_id}/group-daily-expenses-detail`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetGroupExpensesByMemberDailyResponse[], arg, body: IPeriods): IGetGroupExpensesByMemberDailyResponse[] => {
                if ('start_date' in body.period && 'end_date' in body.period) {
                    const expenseMap: Record<string, IGetGroupExpensesByMemberDailyResponse> = {};
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
                                users: []
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
                            users: []
                        };
                    });
                }
            },
            providesTags:
                [{ type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }), 
        getGroupMemberExpensesDaily: builder.query<IGroupMemberExpensesDailyResponse[], IGroupMemberExpensesDailyBody>({
            query: ({ group_id, member_id, period }) => ({
                url: `/groups/${group_id}/member/${member_id}/daily-expenses/`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGroupMemberExpensesDailyResponse[], arg, body: IPeriods): IGroupMemberExpensesDailyResponse[] => {
                if ('start_date' in body.period && 'end_date' in body.period) {
                    const expenseMap: Record<string, IGroupMemberExpensesDailyResponse> = {};
                    response.forEach(expense => {
                        expenseMap[new Date(expense.date).toISOString().split('T')[0]] = expense;
                    });

                    const dateRange = DateService.getDatesInRange(new Date(body.period.start_date!), new Date(body.period.end_date!));
                    dateRange.shift();

                    return dateRange.map((date, i) => {
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
            providesTags:
                [{ type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'UserController' as const, id: 'Users' },],
        }), 
        getGroupMemberExpensesByCategoryDaily: builder.query<IGroupMemberExpensesByCategoryDailyResponse[], IGroupMemberExpensesByCategoryDailyBody>({
            query: ({ group_id, member_id, period }) => ({
                url: `/groups/${group_id}/member/${member_id}/daily-expenses-detail/`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGroupMemberExpensesByCategoryDailyResponse[], arg, body: IPeriods): IGroupMemberExpensesByCategoryDailyResponse[] => {
                if ('start_date' in body.period && 'end_date' in body.period) {
                    const expenseMap: Record<string, IGroupMemberExpensesByCategoryDailyResponse> = {};
                    response.forEach(expense => {
                        expenseMap[new Date(expense.date).toISOString().split('T')[0]] = expense;
                    });

                    const dateRange = DateService.getDatesInRange(new Date(body.period.start_date!), new Date(body.period.end_date!));
                    dateRange.shift();

                    return dateRange.map((date, i) => {
                        const dateISOString = date.toISOString().split('T')[0];
                        if (expenseMap[dateISOString]) {
                            return expenseMap[dateISOString];
                        } else {
                            return {
                                date: dateISOString,
                                amount: 0,
                                categories: [{
                                    id: 0,
                                    title: '',
                                    color_code: '',
                                    icon_url: '',
                                    amount: 0
                                }]
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
                            categories: [{
                                id: 0,
                                title: '',
                                color_code: '',
                                icon_url: '',
                                amount: 0
                            }]
                        };
                    });
                }
            },
            providesTags:
                [{ type: 'GroupsController', id: 'GROUPS' },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
                { type: 'UserController' as const, id: 'Users' },],
        }), 
        createGroup: builder.mutation<ICreateGroupResponse, ICreateGroupBody>({
            query: (body) => ({
                url: `/groups/`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'GROUPS' }],
        }),
        updateGroup: builder.mutation<IUpdateGroupResponse, IUpdateGroupBody>({
            query: (body) => ({
                url: `/groups/${body.id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status,
            invalidatesTags: (result, err, body) => result ? [{ type: 'GroupsController' as const, id: body.id }] : []
        }),
        removeUser: builder.mutation<IRemoveUserResponse, {group_id: number, user_id: number}>({
            query: ({group_id, user_id}) => ({
                url: `/groups/${group_id}/users/${user_id}/remove/`,
                method: 'POST',
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'GROUPS' }, 
            { type: 'UserController' as const, id: 'Users' },
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
        leaveGroup: builder.mutation<null, number>({
            query: (group_id) => ({
                url: `/groups/${group_id}/leave`,
                method: 'POST',
                credentials: 'include'
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response,
            invalidatesTags: [
                { type: 'GroupsController', id: 'GROUPS' },
            { type: 'GroupsController' as const, id: 'GROUPS_DELETE' },
            { type: 'UserController' as const, id: 'Users' },
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCurrentUserGroupsQuery,
    useGetInfoByGroupQuery,
    useGetCurrentGroupSpendersQuery,
    useGetCurrentUserInGroupTotalExpensesQuery,
    useGetGroupTotalExpensesQuery,
    useGetUsersByGroupQuery,
    useGetGroupExpensesByCategoryQuery,
    useGetGroupExpensesDailyQuery,
    useGetMemberInfoByGroupQuery,
    useGetGroupExpensesByMemberDailyQuery,
    useRemoveUserMutation,
    useGetGroupUsersHistoryQuery,
    useGetGroupMemberExpensesDailyQuery,
    useGetGroupMemberHistoryQuery,
    useGetGroupMemberExpensesByCategoryDailyQuery,
    useUpdateGroupMutation,
    useCreateGroupMutation,
    useLeaveGroupMutation,
} = GroupsApiSlice
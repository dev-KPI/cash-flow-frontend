import { api } from '@store/api';

//types
import { 
    ICreateExpenseByGroupBody,
    IUpdateExpenseByGroupBody,
    IExpenseByGroupResponse,
    IGetExpensesByGroupBody,
    IGetExpensesBody,
    IGetCurrentUserDailyExpensesResponse,
    IGetCurrentUserDailyExpensesBody,
    IGetTotalExpensesBody,
    IGetTotalExpensesResponse,
    IGetCurrentGroupSpendersResponse,
    IGetCurrentGroupSpendersBody
} from './ExpensesControllerInterfaces';
import { getDaysInMonth, addDays } from 'date-fns';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import IExpense, { IExpensePeriodYearMonth, IExpensePeriods } from '@models/IExpense';
import DateService from '@services/DateService/DateService';


export const ExpensesApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<IExpense[], IGetExpensesBody>({
            query: ({period}) => ({
                url: `groups/expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'ExpensesController' as const, id: item.id })),
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
                :
            [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }]
        }),
        getCurrentUserExpensesDaily: builder.query<IGetCurrentUserDailyExpensesResponse[], IExpensePeriods>({
            query: ({period}) => ({
                url: `users/daily-expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetCurrentUserDailyExpensesResponse[], arg, body: IExpensePeriods): IGetCurrentUserDailyExpensesResponse[] => {
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
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' },
            { type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' },
            { type: 'GroupsController' as const, id: 'GROUPS_DELETE' },
            ]
        }),
        getGroupTotalExpenses: builder.query<IGetTotalExpensesResponse, IGetTotalExpensesBody>({
            query: ({period, group_id}) => ({
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
            query: ({period, group_id}) => ({
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
        getCurrentGroupSpenders: builder.query<IGetCurrentGroupSpendersResponse[], IGetCurrentGroupSpendersBody>({
            query: ({period, group_id}) => ({
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
        getExpensesByGroup: builder.query<IExpense[], IGetExpensesByGroupBody>({
            query: ({group_id, period}) => ({
                url: `groups/${group_id}/expenses`,
                params: period,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, arg, body) => result ? [...result.map(item => ({ type: 'ExpensesController' as const, id: item.id }))]
            : []
        }),
        createExpenseByGroup: builder.mutation<IExpenseByGroupResponse, ICreateExpenseByGroupBody>({
            query: (body) => ({
                url: `groups/${body.group_id}/expenses`,
                method: 'POST',
                credentials: 'include',
                body: Omiter(['group_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
        updateExpenseByGroup: builder.mutation<IExpenseByGroupResponse, IUpdateExpenseByGroupBody>({
            query: (body) => ({
                url: `expenses/${body.group_id}/expenses/${body.id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['id','group_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: (result, error, body) => [{ type: 'ExpensesController', id: body.id }],
        }),
        deleteExpenseByGroup: builder.mutation<null, {group_id:number, expense_id: number}>({
            query: ({ group_id, expense_id}) => ({
                url: `groups/${group_id}/expenses/${expense_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ExpensesController', id: 'DELETE_EXPENSE_BY_GROUP' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetExpensesQuery,
    useGetExpensesByGroupQuery,
    useGetGroupTotalExpensesQuery,
    useGetCurrentUserInGroupTotalExpensesQuery,
    useGetCurrentGroupSpendersQuery,
    useGetCurrentUserExpensesDailyQuery,
    useCreateExpenseByGroupMutation,
    useUpdateExpenseByGroupMutation,
    useDeleteExpenseByGroupMutation,
} = ExpensesApiSlice
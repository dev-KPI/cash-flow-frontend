import { api } from '@store/api';

//types
import {
    ICreateExpenseByGroupBody,
    IUpdateExpenseByGroupBody,
    IExpenseByGroupResponse,
    IGetExpensesByGroupBody,
    IGetExpensesBody,
} from './ExpensesControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import IExpense from '@models/IExpense';
import DateService from '@services/DateService/DateService';



export const ExpensesApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<IExpense[], IGetExpensesBody>({
            query: (body) => ({
                url: `groups/expenses`,
                params: { start_date: DateService.getQueryDate(body.start_date), end_date: DateService.getQueryEndDate(body.end_date) },
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'ExpensesController' as const, id: item.id })),
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
                :
            [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
        }),
        getExpensesByGroup: builder.query<IExpense[], IGetExpensesByGroupBody>({
            query: ({ group_id, period }) => ({
                url: `groups/${group_id}/expenses`,
                params: { start_date: DateService.getQueryDate(period.start_date), end_date: DateService.getQueryEndDate(period.end_date) },
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, arg, body) => result ? [...result.map(item => ({ type: 'ExpensesController' as const, id: item.id })), 
            { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
            : [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }]
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
                url: `groups/${body.group_id}/expenses/${body.expense_id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['id', 'group_id', 'expense_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: (result, error, body) => result ? [
                { type: 'ExpensesController', id: body.expense_id },
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }] : [
                { type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
        deleteExpenseByGroup: builder.mutation<null, { group_id: number, expense_id: number }>({
            query: ({ group_id, expense_id }) => ({
                url: `groups/${group_id}/expenses/${expense_id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ExpensesController', id: 'EXPENSES_BY_GROUP' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetExpensesQuery,
    useGetExpensesByGroupQuery,
    useCreateExpenseByGroupMutation,
    useUpdateExpenseByGroupMutation,
    useDeleteExpenseByGroupMutation,
} = ExpensesApiSlice
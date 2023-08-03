import { api } from '@store/api';

//types
import { 
    ICreateExpenseByGroupBody,
    IUpdateExpenseByGroupBody,
    IExpenseByGroupResponse,
    IGetExpensesByGroupBody,
    IGetExpensesBody
} from './ExpensesControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import IExpense from '@models/IExpense';


export const ExpensesApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpenses: builder.query<IExpense[], IGetExpensesBody>({
            query: (period) => ({
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
    useCreateExpenseByGroupMutation,
    useUpdateExpenseByGroupMutation,
    useDeleteExpenseByGroupMutation
} = ExpensesApiSlice
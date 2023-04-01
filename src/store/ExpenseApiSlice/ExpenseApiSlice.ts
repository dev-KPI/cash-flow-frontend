import { api } from '@store/api';
import DateService from '@services/DateService/DateService';

//types
import { IExpenseItem, IExpenseItemUPDATE } from './ExpenseApiInterfaces';

export const ExpenseApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpensesPerLastMonth: builder.query<IExpenseItem[], null>({
            query: () => ({
                url:`/expenses?time_like=2023-03`
                // url: `/expenses?time_like=${DateService.getCurrentYear()}-${(DateService.getCurrentMonthIdx() + '').length < 2 ? ('0' + DateService.getMont()) : DateService.getCurrentMonthIdx()}`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result, error, arg) => result ? [...result.map(item => ({type: 'ExpenseApi' as const, id: item.id})),
                {type: 'ExpenseApi', id: 'ADD_EXPENSE'},
                {type: 'ExpenseApi', id: 'DELETE_EXPENSE'}]
                : 
                [{type: 'ExpenseApi', id: 'ADD_EXPENSE'},
                {type: 'ExpenseApi', id: 'DELETE_EXPENSE'}],
            
        }),
        getExpense: builder.query<IExpenseItem, number>({
            query: (id: number) => ({
                url: `/expenses?id=${id}`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result, error, id) => [{type: 'ExpenseApi', id: result?.id}]
        }),
        addExpense: builder.mutation({
            query: (body: Omit<IExpenseItem, 'id'>) => ({
                url: `/expenses`,
                method: 'POST',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: [{type: 'ExpenseApi', id: 'ADD_EXPENSE'}],
        }),
        updateExpense: builder.mutation({
            query: (body: IExpenseItemUPDATE) => ({
                url: `/expenses/${body.id}`,
                method: 'PUT',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: (result, error, arg) => [{type: 'ExpenseApi', id: result.id}],
        }),
        deleteExpense: builder.mutation({
            query: (id: number) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: (body, arg) => [{type: 'ExpenseApi', id: 'DELETE_EXPENSE'}],
        })
    }),
    overrideExisting: false,
})

export const { 
    useGetExpensesPerLastMonthQuery,
    useGetExpenseQuery,
    useAddExpenseMutation,
    useUpdateExpenseMutation
} = ExpenseApiSlice


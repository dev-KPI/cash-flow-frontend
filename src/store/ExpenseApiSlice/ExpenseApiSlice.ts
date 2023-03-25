import { api } from '@store/api';
import DateService from '@services/DateService/DateService';
import { createEntityAdapter } from '@reduxjs/toolkit';

//types
import { IExpenseItem, IExpenseItemUPDATE } from './ExpenseApiInterfaces';


export const ExpenseApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpense: builder.query<Readonly<IExpenseItem>, number>({
            query: (id: number) => ({
                url: `/expenses?time_like=${DateService.getCurrentYear()}-${(DateService.getCurrentMonthIdx() + '').length < 2 ? ('0' + DateService.getCurrentMonthIdx()) : DateService.getCurrentMonthIdx()}`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result, error, id) => [{type: 'ExpenseApi', id}]
        }),
        getExpensesPerLastMonth: builder.query<Readonly<IExpenseItem[]>, null>({
            query: () => ({
                url: `/expenses?time_like=${DateService.getCurrentYear()}-${(DateService.getCurrentMonthIdx() + '').length < 2 ? ('0' + DateService.getCurrentMonthIdx()) : DateService.getCurrentMonthIdx()}`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (data, arg) => data ? data?.map(item => ({type: 'ExpenseApi', id: item.id})) : ['ExpenseApi'],
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
            invalidatesTags: ['ExpenseApi'],
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
            invalidatesTags: ['ExpenseApi'],
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


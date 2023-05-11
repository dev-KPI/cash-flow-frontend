import { ICategoryExpenseItemUPDATE, IUserExpenseChartDataItem } from './UserCategoryExpenseInterfaces';
import { api } from '@store/api';


export const UserCategoryExpenseApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryExpenses: builder.query<IUserExpenseChartDataItem[], null>({
            query: () => ({
                url: `/categoryExpenses`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'CategoryExpenses' as const, id: item.id })),
            { type: 'CategoryExpenses', id: 'ADD_EXPENSE' },
            { type: 'CategoryExpenses', id: 'DELETE_EXPENSE' }]
                :
                [{ type: 'CategoryExpenses', id: 'ADD_EXPENSE' },
                { type: 'CategoryExpenses', id: 'DELETE_EXPENSE' }],
        }),
        getCategoryExpenseById: builder.query<IUserExpenseChartDataItem, number>({
            query: (id: number = 0) => ({
                url: `/categoryExpenses/${id}`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result, error, id) => [{ type: 'CategoryExpenses', id: result?.id }]
        }),
        getCategoryExpensesTotal: builder.query<{ total: number }, null>({
            query: () => ({
                url: `/categoryExpensesTotal`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result) => [{ type: 'CategoryExpenses', id: result?.total }]
        }),
        addCategoryExpense: builder.mutation({
            query: (body: Omit<IUserExpenseChartDataItem, 'id'>) => ({
                url: `/categoryExpenses`,
                method: 'POST',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: [{ type: 'CategoryExpenses', id: 'ADD_EXPENSE' }],
        }),
        updateCategoryExpense: builder.mutation({
            query: (body: ICategoryExpenseItemUPDATE) => ({
                url: `/categoryExpenses/${body.id}`,
                method: 'PUT',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: (result, error) => [{ type: 'CategoryExpenses', id: result.id }],
        }),
        deleteCategoryExpense: builder.mutation({
            query: (id: number) => ({
                url: `/categoryExpenses/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            invalidatesTags: [{ type: 'CategoryExpenses', id: 'DELETE_EXPENSE' }],
        })

    }),
    overrideExisting: false,
})

export const {
    useGetCategoryExpensesQuery,
    useGetCategoryExpenseByIdQuery,
    useGetCategoryExpensesTotalQuery,
    useAddCategoryExpenseMutation,
    useUpdateCategoryExpenseMutation,
    useDeleteCategoryExpenseMutation
} = UserCategoryExpenseApiSlice


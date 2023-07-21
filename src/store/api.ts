import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.cash-money.store/',
        headers: {
            credentials: 'include',
        }
    }),
    tagTypes: [
        'api', 
        'GroupsController',
        'ReplenishmentsController',
        'CategoryExpenses'
    ],
    endpoints: () => ({}),
})
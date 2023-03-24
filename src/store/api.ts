import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserExpenseGraphApi } from './UI_store/UserExpenseGraphSlice/UserExpenseGraphApi'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_API_URL}` }),
    tagTypes: ['api'],
    endpoints: () => ({}),
})
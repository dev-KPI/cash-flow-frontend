import { api } from '@store/api';


export const AuthApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        Login: builder.query<string, null>({
            query: () => ({
                url: `/login`,
                body: Response
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status
        }),
        LogOut: builder.query<string, null>({
            query: () => ({
                url: `/logout`,
                body: Response 
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status
        })
    }),
    overrideExisting: false,
})

export const {
    useLoginQuery,
    useLogOutQuery,
} = AuthApiSlice


import { api } from '@store/api';

//types
import { IGetCurrentUserInfo } from './UserControllerInterfaces';


export const UserApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserAuthStatus: builder.query<boolean, null>({
            query: () => ({
                url: `users/user-balance`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: {balance: number}): boolean => {
                if (!response) {
                    return false  
                } 
                return !!response
            },
            providesTags: [{ type: 'UserController' as const, id: 0 }],
        }),
        getCurrentUserInfo: builder.query<IGetCurrentUserInfo, null>({
            query: () => ({
                url: `users/info`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: [{ type: 'UserController' as const, id: 0 }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetUserAuthStatusQuery,
    useGetCurrentUserInfoQuery
} = UserApiSlice
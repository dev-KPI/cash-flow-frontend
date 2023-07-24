import { api } from '@store/api';

//types
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import { IGetAuthStatus } from './UserControllerInterfaces';
import { IGetCurrentUserGroups } from '../GroupsController/GroupsControllerInterfaces';


export const UserApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserAuthStatus: builder.query<IGetAuthStatus, null>({
            query: () => ({
                url: `groups/1/users`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetCurrentUserGroups): IGetAuthStatus => {
                if (!response) {
                    return { status: false } 
                } 
                return { status: !!response }
            },
            providesTags: [{ type: 'UserController' as const, id: 0 }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetUserAuthStatusQuery,
} = UserApiSlice
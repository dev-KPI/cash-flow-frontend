import { api } from '@store/api';

//types
import IGroup from '@models/IGroup';
import { 
    IGetCurrentUserGroups, 
    ICreateGroupBody,
    ICreateGroupResponse,
    IUpdateGroupBody,
    IUpdateGroupResponse,
    IGetUsersFromGroupResponse,
    IRemoveUserResponse,
    IGetCategoriesByGroupResponse
} from './GroupsControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';


export const GroupsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserGroups: builder.query<IGetCurrentUserGroups, null>({
            query: () => ({
                url: `users/groups/`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.user_groups.map(item => ({ type: 'GroupsController' as const, id: item.id})),
            { type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }]
                :
            [{ type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        getUsersByGroup: builder.query<IGetUsersFromGroupResponse, {group_id: number}>({
            query: (group_id) => ({
                url: `/groups/${group_id}/users`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.users_group.map(item => ({ type: 'GroupsController' as const, id: item.user.id })),
            { type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }]
                :
            [{ type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        getCategoriesByGroup: builder.query<IGetCategoriesByGroupResponse, {group_id: number}>({
            query: (group_id) => ({
                url: `/groups/${group_id}/categories`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.categories_group.map(item => ({ type: 'GroupsController' as const, id: item.category.id })),
            { type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }]
                :
            [{ type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'REMOVE_USER_FROM_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        createGroup: builder.mutation<ICreateGroupResponse, ICreateGroupBody>({
            query: (body) => ({
                url: `/groups/`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'CREATE_GROUP' }],
        }),
        updateGroup: builder.mutation<IUpdateGroupResponse, IUpdateGroupBody>({
            query: (body) => ({
                url: `/groups/${body.id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        removeUser: builder.mutation<IRemoveUserResponse, {group_id: number, user_id: number}>({
            query: ({group_id, user_id}) => ({
                url: `/groups/${group_id}/remove/${user_id}/`,
                method: 'POST',
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'REMOVE_USER' }],
        }),
        leaveGroup: builder.mutation<null, number>({
            query: (group_id) => ({
                url: `/groups/${group_id}/users`,
                method: 'POST',
                credentials: 'include'
            }),
            transformErrorResponse: (
                response,
            ) => response,
            invalidatesTags: [{ type: 'GroupsController', id: 'LEAVE_FROM_GROUP' }],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCurrentUserGroupsQuery,
    useGetUsersByGroupQuery,
    useGetCategoriesByGroupQuery,
    useRemoveUserMutation,
    useUpdateGroupMutation,
    useCreateGroupMutation
} = GroupsApiSlice
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
    IRemoveUserResponse
} from './GroupsControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';


export const GroupsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserGroups: builder.query<IGetCurrentUserGroups, null>({
            query: () => ({
                url: `groups/`,
                credentials: 'include',
            }),
            transformResponse: (response: IGetCurrentUserGroups): IGetCurrentUserGroups => {
                return {user_groups: response.user_groups.filter(el => el.status !== 'INACTIVE')}
            },
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result?.user_groups[0] ? 
            [...result.user_groups.map(el => ({type: 'GroupsController' as const, id: el.group.id })),
            {type: 'GroupsController' as const, id: 'GROUPS_DELETE'}, 
            {type: 'GroupsController' as const, id: 'GROUPS' }] :
            [{type: 'GroupsController' as const, id: 'GROUPS' },
            {type: 'GroupsController' as const, id: 'GROUPS_DELETE'}]
        }),
        getUsersByGroup: builder.query<IGetUsersFromGroupResponse, {group_id: number}>({
            query: ({group_id}) => ({
                url: `/groups/${group_id}/users`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result, err, body) => result ? 
            [...result.users_group.map(item => ({ type: 'GroupsController' as const, id: item.user.id })),
            { type: 'GroupsController' as const, id: 'GROUP_USERS' }]
                :
            [],
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
            invalidatesTags: [{ type: 'GroupsController', id: 'GROUPS' }],
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
            invalidatesTags: (result, err, body) => result ? [{ type: 'GroupsController' as const, id: body.id }] : []
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
            invalidatesTags: [{ type: 'GroupsController', id: 'GROUPS' }],
        }),
        leaveGroup: builder.mutation<null, number>({
            query: (group_id) => ({
                url: `/groups/${group_id}/leave`,
                method: 'POST',
                credentials: 'include'
            }),
            transformErrorResponse: (
                response,
            ) => response,
            invalidatesTags: (result, err, body) => result ? [{ type: 'GroupsController' as const, id: 'GROUPS_DELETE' }] : [],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCurrentUserGroupsQuery,
    useGetUsersByGroupQuery,
    useRemoveUserMutation,
    useUpdateGroupMutation,
    useCreateGroupMutation,
    useLeaveGroupMutation
} = GroupsApiSlice
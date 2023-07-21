import { api } from '@store/api';

//types
import IGroup from '@models/IGroup';
import { IUserGroup_CREATE, IUserGroup_UPDATE, IUserGroups_GET, TGroup_id } from './GroupsControllerInterfaces';


export const GroupsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserGroups: builder.query<IUserGroups_GET[], null>({
            query: () => ({
                url: `/users/groups`,
            }),
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'GroupsController' as const, id: item.user_groups[0].id})),
            { type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }]
                :
            [{ type: 'GroupsController', id: 'CREATE_GROUP' },
            { type: 'GroupsController', id: 'LEAVE_FROM_GROUP' },
            { type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        createGroup: builder.mutation({
            query: (body: IUserGroup_CREATE) => ({
                url: `/groups/`,
                method: 'POST',
                body
            }),
            transformResponse: (response: { data: IGroup }, meta, arg) => response.data,
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'CREATE_GROUP' }],
        }),
        updateGroup: builder.mutation<IUserGroup_UPDATE, Partial<IGroup> & Pick<IGroup, 'id'>>({
            query: (body: IUserGroup_UPDATE) => ({
                url: `/groups/${body.id}`,
                method: 'POST',
                body
            }),
            transformResponse: (response: { data: IGroup }) => response.data,
            transformErrorResponse: (
                response: { status: string | number }
            ) => response.status,
            invalidatesTags: [{ type: 'GroupsController', id: 'UPDATE_GROUP' }],
        }),
        leaveGroup: builder.mutation({
            query: (body: IUserGroup_CREATE) => ({
                url: `/groups/`,
                method: 'POST',
                body
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
    useCreateGroupMutation
} = GroupsApiSlice
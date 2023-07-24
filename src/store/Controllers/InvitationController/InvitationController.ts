import { api } from '@store/api';

//types
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import { IAcceptInvitationBody, IAcceptInvitationResponse, ICreateInvitaionBody, ICreateInvitaionResponse, IGetInvitaionResponse,
 } from './InvitationControllerInterfaces';


export const InvitationApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getInvitationsByCurrentUser: builder.query<IGetInvitaionResponse[], null>({
            query: () => ({
                url: `/invitations/list/`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'InvitationController' as const, id: item.id})),
            { type: 'InvitationController', id: 'CREATE_INVITATION' },
            { type: 'InvitationController', id: 'ACCEPT_INVITATION' },]
                :
            [{ type: 'InvitationController', id: 'CREATE_INVITATION' },
            { type: 'InvitationController', id: 'ACCEPT_INVITATION' },],
        }),
        createInvitation: builder.mutation<ICreateInvitaionResponse, ICreateInvitaionBody>({
            query: (body) => ({
                url: `/invitations/`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'InvitationController', id: 'CREATE_INVITATION' }],
        }),
        acceptInvitationById: builder.mutation<IAcceptInvitationResponse, IAcceptInvitationBody>({
            query: (body) => ({
                url: `/invitations/response/${body.invitation_id}`,
                method: 'POST',
                credentials: 'include',
                body: body.response
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'InvitationController', id: 'ACCEPT_INVITATION' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetInvitationsByCurrentUserQuery,
    useAcceptInvitationByIdMutation,
    useCreateInvitationMutation
} = InvitationApiSlice
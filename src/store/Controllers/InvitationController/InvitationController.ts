import { api } from '@store/api';

//types
import { IResponseInvitationBody, ICreateInvitaionBody, ICreateInvitaionResponse, IGetInvitaionResponse, IResponseInvitationResponse,
 } from './InvitationControllerInterfaces';


export const InvitationApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getInvitationsByCurrentUser: builder.query<IGetInvitaionResponse[], null>({
            query: () => ({
                url: `/invitations/`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'InvitationController' as const, id: item.id})),
            { type: 'InvitationController', id: 'CREATE_INVITATION' },
            { type: 'InvitationController', id: 'RESPONSE_INVITATION' },]
                :
            [{ type: 'InvitationController', id: 'CREATE_INVITATION' },
                { type: 'InvitationController', id: 'RESPONSE_INVITATION' },],
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
        responseInvitationById: builder.mutation<IResponseInvitationResponse, IResponseInvitationBody>({
            query: (body) => ({
                url: `/invitations/${body.invitation_id}/response`,
                method: 'POST',
                params: {
                    response: body.response
                },
                credentials: 'include',
                body: body.response
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'InvitationController', id: 'RESPONSE_INVITATION' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetInvitationsByCurrentUserQuery,
    useResponseInvitationByIdMutation,
    useCreateInvitationMutation
} = InvitationApiSlice
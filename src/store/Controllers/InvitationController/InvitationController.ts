import { api } from '@store/api';

//types
import IInvitation from '@models/IInvitation';
// import { } from './ReplenishmentControllerInterfaces'
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
// import { 
// } from './InvitationControllerInterfaces';


export const ReplenishmentsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getReplenishmentsByUser: builder.query<IGetReplenishmentsByUserResponse[], IGetReplenishmentsByUserBody>({
            query: (body) => ({
                url: `/replenishments/`,
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'ReplenishmentsController' as const, id: item.amount})),
            { type: 'ReplenishmentsController', id: 'CREATE_REPLENISHMENT' },
            { type: 'ReplenishmentsController', id: 'UPDATE_REPLENISHMENT' },
            { type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENT' }]
                :
            [{ type: 'ReplenishmentsController', id: 'CREATE_REPLENISHMENT' },
            { type: 'ReplenishmentsController', id: 'UPDATE_REPLENISHMENT' },
            { type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENT' }],
        }),
        createReplenishment: builder.mutation<ICreateReplenishmentResponse[], ICreateReplenishmentBody>({
            query: (body) => ({
                url: `/replenishments/`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'CREATE_REPLENISHMENT' }],
        }),
        updateReplenishmentById: builder.mutation<IUpdateReplenishmentResponse, IUpdateReplenishmentBody>({
            query: (body) => ({
                url: `/replenishments/${body.id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'UPDATE_REPLENISHMENT' }],
        }),
        deleteReplenishmentById: builder.mutation<null, IDeleteReplenishmentBody>({
            query: ({id}) => ({
                url: `/replenishments/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENT' }],
        })
    }),
    overrideExisting: false,
})

export const {
} = ReplenishmentsApiSlice
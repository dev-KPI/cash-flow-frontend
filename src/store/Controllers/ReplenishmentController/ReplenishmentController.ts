import { api } from '@store/api';

//types
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import { ICreateReplenishmentBody, 
    ICreateReplenishmentResponse, 
    IDeleteReplenishmentBody, 
    IGetReplenishmentsByUserBody,
    IGetReplenishmentsByUserResponse,
    IUpdateReplenishmentBody,
    IUpdateReplenishmentResponse
} from './ReplenishmentControllerInterfaces';


export const ReplenishmentsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getReplenishmentsByUser: builder.query<IGetReplenishmentsByUserResponse[], IGetReplenishmentsByUserBody>({
            query: ({period}) => ({
                url: `/replenishments/`,
                credentials: 'include',
                params: period
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'ReplenishmentsController' as const, id: item.amount})),
                { type: 'ReplenishmentsController', id: 'REPLENISHMENTS' },
                { type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENTS' }]
                :
                [{ type: 'ReplenishmentsController', id: 'REPLENISHMENTS' },
                { type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENTS' }],
        }),
        createReplenishment: builder.mutation<ICreateReplenishmentResponse, ICreateReplenishmentBody>({
            query: (body) => ({
                url: `/replenishments/`,
                method: 'POST',
                credentials: 'include',
                body
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }],
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
            invalidatesTags: (result, arg, body) => [{ type: 'ReplenishmentsController', id: body.id }]
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
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'DELETE_REPLENISHMENTS' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetReplenishmentsByUserQuery,
    useCreateReplenishmentMutation,
    useDeleteReplenishmentByIdMutation,
    useUpdateReplenishmentByIdMutation,
} = ReplenishmentsApiSlice
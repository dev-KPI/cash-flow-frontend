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
import DateService from '@services/DateService/DateService';


export const ReplenishmentsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getReplenishmentsByUser: builder.query<IGetReplenishmentsByUserResponse[], IGetReplenishmentsByUserBody>({
            query: (body) => ({
                url: `/replenishments/`,
                credentials: 'include',
                params: { start_date: DateService.getLocalISOString(body.start_date).slice(0, 10), end_date: DateService.getLocalISOString(body.end_date).slice(0, 10) },
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(item => ({ type: 'ReplenishmentsController' as const, id: item.amount})),
            { type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }]
                :
            [{ type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }],
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
            invalidatesTags: (result, arg, body) => result ? [
            { type: 'ReplenishmentsController', id: body.id }, 
            { type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }] :
            [{ type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }],
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
            invalidatesTags: [{ type: 'ReplenishmentsController', id: 'REPLENISHMENTS' }],
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
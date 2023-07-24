import { api } from '@store/api';

//types
import { 
    ICreateCategoryBody,
    ICreateCategoryResponse,
    IGetCategoriesByGroupResponse,
    IUpdateCategoryBody,
    IUpdateCategoryResponse,
} from './CategoriesControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';


export const CategoryApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategoriesByGroup: builder.query<IGetCategoriesByGroupResponse, {group_id: number}>({
            query: (group_id) => ({
                url: `/groups/${group_id}/categories`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.categories_group.map(item => ({ type: 'CategoryController' as const, id: item.category.id })),
            { type: 'CategoryController', id: 'CREATE_CATEGORY_BY_GROUP' },
            { type: 'CategoryController', id: 'UPDATE_CATEGORY_BY_GROUP' }]
                :
            [{ type: 'CategoryController', id: 'CREATE_CATEGORY_BY_GROUP' },
            { type: 'CategoryController', id: 'UPDATE_CATEGORY_BY_GROUP' }],
        }),
        createCategoryByGroup: builder.mutation<ICreateCategoryResponse, ICreateCategoryBody>({
            query: (body) => ({
                url: `categories/${body.group_id}`,
                method: 'POST',
                credentials: 'include',
                body: Omiter(['group_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'CategoryController', id: 'CREATE_CATEGORY_BY_GROUP' }],
        }),
        updateCategoryByGroup: builder.mutation<IUpdateCategoryResponse, IUpdateCategoryBody>({
            query: (body) => ({
                url: `categories/${body.group_id}/${body.category_id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['category_id','group_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: [{ type: 'CategoryController', id: 'UPDATE_CATEGORY_BY_GROUP' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetCategoriesByGroupQuery,
    useCreateCategoryByGroupMutation,
    useUpdateCategoryByGroupMutation
} = CategoryApiSlice
import { api } from '@store/api';

//types
import { 
    ICreateCategoryBody,
    ICreateCategoryResponse,
    IGetCategoriesByGroupResponse,
    IGetGroupsCategoriesResponse,
    IUpdateCategoryBody,
    IUpdateCategoryResponse,
} from './CategoriesControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';


export const CategoryApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getCategoriesByGroup: builder.query<IGetCategoriesByGroupResponse, number>({
            query: (group_id) => ({
                url: `/groups/${group_id}/categories`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            transformResponse: (response: IGetCategoriesByGroupResponse) => {
                if (response.categories_group) {
                    response.categories_group.forEach((category) => {
                        const title = category.category.title ?? '';
                        category.category.title = title.length > 0 ? title.charAt(0).toUpperCase() + title.slice(1) : title;
                    });
                }
                return response;
            },
            providesTags: (result) => result ? [...result.categories_group.map(item => ({ type: 'CategoryController' as const, id: item.category.id })),
            { type: 'CategoryController', id: 'CATEGORIES' }]
                :
            [{ type: 'CategoryController', id: 'CATEGORIES' }],
        }),
        getGroupsCategories: builder.query<IGetGroupsCategoriesResponse[], void>({
            query: () => ({
                url: `/groups/categories/`,
                credentials: 'include',
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            providesTags: (result) => result ? [...result.map(group => ({ type: 'GroupsController' as const, id: group.id }))]:
            [{ type: 'GroupsController', id: 'GROUPS' }],
        }),
        createCategoryByGroup: builder.mutation<ICreateCategoryResponse, ICreateCategoryBody>({
            query: (body) => ({
                url: `groups/${body.group_id}/categories`,
                method: 'POST',
                credentials: 'include',
                body: Omiter(['group_id'], body)
            }),
            // transformErrorResponse: (
            //     response: { status: string | number },
            // ) => response,
            invalidatesTags: [{ type: 'CategoryController', id: 'CATEGORIES' }],
        }),
        updateCategoryByGroup: builder.mutation<IUpdateCategoryResponse, IUpdateCategoryBody>({
            query: (body) => ({
                url: `groups/${body.group_id}/categories/${body.category_id}`,
                method: 'PUT',
                credentials: 'include',
                body: Omiter(['category_id','group_id'], body)
            }),
            transformErrorResponse: (
                response: { status: string | number },
            ) => response.status,
            invalidatesTags: (result, arg, body) => result ? [{ type: 'CategoryController' as const, id: body.category_id}]
            : [{ type: 'CategoryController' as const, id: 'CATEGORIES' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useGetCategoriesByGroupQuery,
    useGetGroupsCategoriesQuery,
    useCreateCategoryByGroupMutation,
    useUpdateCategoryByGroupMutation
} = CategoryApiSlice
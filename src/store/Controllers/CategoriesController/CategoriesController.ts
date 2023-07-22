import { api } from '@store/api';

//types
import { 
    ICreateCategoryBody,
    ICreateCategoryResponse,
    IUpdateCategoryBody,
    IUpdateCategoryResponse,
} from './CategoriesControllerInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';


export const CategoryApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
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
            invalidatesTags: [{ type: 'CategoryController', id: 'UPDATE_EXPENSE_BY_GROUP' }],
        })
    }),
    overrideExisting: false,
})

export const {
    useCreateCategoryByGroupMutation,
    useUpdateCategoryByGroupMutation
} = CategoryApiSlice
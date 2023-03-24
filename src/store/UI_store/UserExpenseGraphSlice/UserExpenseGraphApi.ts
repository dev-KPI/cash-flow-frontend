import { IUserExpenseGraphDataItem } from './UserExpenseGraphInterfaces';
import { api } from '@store/api';
import DateService from '@services/DateService/DateService';


export const UserExpenseGraphApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getExpensesPerLastMonth: builder.query({
            query: () => ({
                url: `/expenses?time_like=${DateService.getCurrentYear()}-${(DateService.getCurrentMonthIdx() + '').length < 2 ? ('0' + DateService.getCurrentMonthIdx()) : DateService.getCurrentMonthIdx()}`,
            }),
            transformResponse: (data: IUserExpenseGraphDataItem[], meta, arg) => {
                return data
            },
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg
            ) => response.status,
        }),
    }),
    overrideExisting: false,
})

export const { useGetExpensesPerLastMonthQuery } = UserExpenseGraphApi


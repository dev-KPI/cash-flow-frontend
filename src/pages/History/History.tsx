import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
//UI
import classes from './History.module.css'
    ;
import { HistoryObj } from "@pages/HistoryObj";
import { addFieldToObject, Omiter } from "@services/UsefulMethods/ObjectMethods";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import Pagination from "@components/Pagination/Pagination";

type group_category_props = {
    id: number,
    title: string,
    color: string,
    icon: string
}
interface Transaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: group_category_props
        category?: group_category_props
    },
    type: string
}

const Groups: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const [items, setItems] = useState<Transaction[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);

    const getMixedHistory = () => {
        const expensesDTO: Transaction[] = [...HistoryObj.expenses.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
        const replenishmentsDTO: Transaction[] = [...HistoryObj.replenishments.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))

        const HistoryArray: Transaction[] = [...expensesDTO, ...replenishmentsDTO]
        console.log(HistoryArray);
        return (HistoryArray.sort((b, a) => {
            const dateA = new Date(a.time).getTime();
            const dateB = new Date(b.time).getTime();
            return dateA - dateB;
        }))
    }

    const getRecentActivities = () => {

        let res: ReactNode[] = getMixedHistory().map((el, i) =>
            <HistoryItem
                key={i}
                description={el.description}
                type={el.type === 'expense' ? 'expense' : 'replenishment'}
                categoryColor={el.category_group?.category?.color || '#80D667'}
                groupColor={el.category_group?.group?.color || '#80D667'}
                categoryTitle={el.category_group?.category?.title || '-'}
                groupTitle={el.category_group?.group?.title || '-'}
                amount={el.amount}
                time={el.time} />
        )
        return res
    }

    return (<>
        <main id='HistoryPage'>
            <div className={classes.page__container}>
                <h3 className={classes.pageTitle}>History</h3>
                <section className={classes.recentOperations}>
                    <table className={classes.recentOperations__table}>
                        <thead className={classes.tableTitle}>
                            <tr>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Group</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody className={classes.tableText}>
                            {getRecentActivities()}
                            <tr>
                                <td colSpan={5}>
                                    <div className={classes.paginationWrapper}>
                                        <Pagination />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    </>)
}

export default Groups
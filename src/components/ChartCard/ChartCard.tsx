import { FC, ReactNode, useEffect, useState} from 'react';
//UI
import classes from './ChartCard.module.css'
import ChartCardDot from '@components/ChartCard/ChartCardDot/ChartCardDot';
import Chart from '@components/ChartCard/Chart';
//Logic
import { numberWithCommas, shaffledColors } from '@services/UsefulMethods/UIMethods';
import { ICategoryAmount } from '@models/ICategory';
import { IExtendedUser } from '@models/IUser';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';


type IChartCardProps = { title: string, messageType?: 'user' | 'group'} & (
    | { categories: ICategoryAmount[], members?: never }
    | { categories?: never, members: IExtendedUser[] }
)


const ChartCard: FC<IChartCardProps> = ({ categories, members, title, messageType = 'user' }) => {
    const currency = useAppSelector(state => state.persistedCurrencySlice.currency)
    
    const [id, setId] = useState<number>(categories ? categories[0]?.id : members[0]?.id || 0 );
    const [isExtended, setIsExtended] = useState<boolean>(false);
    let itemAmount = 0;
    let itemTitle = '';
    let total = 0;
    let getItems: ReactNode[] = []; 
    let chartItem: ReactNode;
    let dataLength: number = 0;
    
    useEffect(() => {
        setId(categories ? categories[0]?.id : members[0]?.id || 0)
    }, [categories, members])

    if (categories) {
        const category = categories.find(el => el.id === id)

        itemTitle = category?.title || '';
        itemAmount = category?.amount || 0

        const result = categories.map((category, index) => ({
            ...category,
            icon_url: '',
            color_code: category.color_code ?
                category.color_code : shaffledColors[index % shaffledColors.length]
        }));

        total = result
            .map((item) => item.amount || 0)
            .reduce((acc, curr) => acc + curr, 0);
        
        getItems = result.map((item, i) => <ChartCardDot key={i} category={item} setId={setId} />)
        dataLength = result.length;
        chartItem = <Chart categories={result} total={total} setId={setId} /> 
 
    } else if (members) {
        const member = members.find(el => el.id === id)

        itemTitle = member?.first_name + " " + member?.last_name
        itemAmount = member?.amount || 0;

        const result = members.map((member, index) => ({
            ...member,
            color_code: shaffledColors[index % shaffledColors.length]
        }));
        total = result
            .map((item) => item.amount || 0)
            .reduce((acc, curr) => acc + curr, 0);

        getItems = result.map((item, i) => <ChartCardDot key={i} member={item} setId={setId} />)
        dataLength = result.length;
        chartItem = <Chart members={result} total={total} setId={setId} /> 
    }
    

    let itemPercentage = 0;
    if (itemAmount){
        itemPercentage = +(itemAmount * 100 / total).toFixed(2) || 0;
    }

    const handleOpenExtended = () => {
        setIsExtended(true)
    }
    const handleCloseExtended = () => {
        if (isExtended) {
            setIsExtended(false)
        }
    }

    // if the user does not interact with this card for more than 15 seconds, close the extended menu
    let timeout: ReturnType<typeof setTimeout>;

    let clearInterval = () => {
        clearTimeout(timeout);
    }

    let setInterval = () => {
        timeout = setTimeout(handleCloseExtended, 15000);
    }

    if (dataLength === 0) {
        const emptyMessage = messageType === 'user' ? 'You have no expenses' :
            messageType === 'group' ? "Group doesn't have expenses" : null
        return <div className={classes.inner}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.noExpenses}>
                <i className="bi bi-database-x"></i>
                <h5 className={classes.noExpenses__title}>{emptyMessage}</h5>
                <p className={classes.noExpenses__text}>Try creating a new expense</p>
            </div>
        </div>
    }
    return (<div className={classes.inner} onMouseEnter={clearInterval} onMouseLeave={setInterval} onClick={handleCloseExtended}>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.wrapper}>
                    <div className={classes.chart}>
                        {chartItem}
                    </div>
                    <div className={classes.info}>
                        <div className={classes.expenseInfo}>
                            <h5 className={classes.expenseTitle}>{itemTitle?.slice(0,16)}</h5>
                            <p className={classes.expensePercent}>{itemPercentage}%</p>
                            <span className={classes.expenseAmount}>{numberWithCommas(itemAmount)}{currency}</span>
                        </div>
                        {isExtended ?
                            <ul className={classes.popupList} onClick={(e) => (e.stopPropagation())}>
                                {getItems}
                            </ul>
                            :
                           <ul className={classes.chartList}>
                                {getItems.slice(0, 4)}
                                {dataLength > 4 &&
                                <li className={classes.item}>
                                    <button className={classes.viewMore} onClick={handleOpenExtended}>View more</button>
                                </li>}
                            </ul>
                        }
                    </div>
                </div>
            </div>
    );
};

export default ChartCard;

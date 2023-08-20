import { FC, useCallback, useMemo, useState} from 'react';
//UI
import classes from './ChartCard.module.css'
import ChartCardDot from '@components/ChartCard/ChartCardDot/ChartCardDot';
//Logic
import { numberWithCommas, shaffledColors } from '@services/UsefulMethods/UIMethods';
import Chart from '@components/ChartCard/Chart';
import { ISimplifiedCategory, ISimplifiedCategoryWithColor } from '@models/ICategory';


type IChartCardProps = {
    data: ISimplifiedCategory[];
    title: string;
}; 



const ChartCard: FC<IChartCardProps> = ({ data, title }) => {
    const [id, setId] = useState<number>(data[0]?.id || 0);
    const [isExtended, setIsExtended] = useState<boolean>(false);
    let itemAmount = 0;
    let itemTitle = '';
    const categories = data as ISimplifiedCategoryWithColor[];
    const category = categories.find(el => el.id === id)
    itemTitle = category?.title || '';
    itemAmount = category?.amount || 0
    const categoriesWithColors: ISimplifiedCategoryWithColor[] = categories.map( (category, index) => ({
        ...category,
        color: shaffledColors[index % shaffledColors.length]
    }));

    const total = data
        .map((item) => item.amount || 0)
        .reduce((acc, curr) => acc + curr, 0);

    const getItems = useMemo(() => {
        return categoriesWithColors.map((item, i) => <ChartCardDot key={i} item={item} setId={setId} />)
    }, [data]) 

    let itemPercentage;
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

    return (<div className={classes.inner} onMouseEnter={clearInterval} onMouseLeave={setInterval} onClick={handleCloseExtended}>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.wrapper}>
                    <div className={classes.chart}>
                        <Chart data={categoriesWithColors} total={total} setId={setId} />
                    </div>
                    <div className={classes.info}>
                        <div className={classes.expenseInfo}>
                            <h5 className={classes.expenseTitle}>{itemTitle?.slice(0,16)}</h5>
                            <p className={classes.expensePercent}>{itemPercentage}%</p>
                            <span className={classes.expenseAmount}>{numberWithCommas(itemAmount)}$</span>
                        </div>
                        {isExtended ?
                            <ul className={classes.popupList} onClick={(e) => (e.stopPropagation())}>
                                {getItems}
                            </ul>
                            :
                            <ul className={classes.chartList}>
                                {getItems.slice(0, 4)}
                                <li className={classes.item}>
                                    <button className={classes.viewMore} onClick={handleOpenExtended}>View more</button>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
    );
};

export default ChartCard;

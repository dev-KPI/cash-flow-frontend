import { FC, Dispatch, SetStateAction } from 'react';

//UI
import classes from './ChartCardDot.module.css'
import Light from '@components/Light/Light';
//store
import { ISimplifiedCategoryWithColor } from '@models/ICategory';


interface ChartCardDotProps {
    item: ISimplifiedCategoryWithColor;
    setId: (Dispatch<SetStateAction<number>>)
}

const ChartCardDot: FC<ChartCardDotProps> = ({ item, setId }) => {
    let color = '#4C6FFF'
    let title = ''
    const onClick = () => {
        setId(item.id)
    }
    color = item.color;
    title = item.title || '';

    title = title.length > 13 ? title.slice(0,12) + '..' : title
    return (
        <li className={classes.item} onClick={onClick}>
            <Light type={'solid'} color={color}></Light>
            <p className={classes.itemTitle}>{title}</p>
        </li>
    );
};

export default ChartCardDot;
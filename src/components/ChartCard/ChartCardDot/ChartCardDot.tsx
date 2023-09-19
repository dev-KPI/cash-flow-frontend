import { FC, Dispatch, SetStateAction } from 'react';

//UI
import classes from './ChartCardDot.module.css'
import Light from '@components/Light/Light';
//store
import { ICategoryAmount } from '@models/ICategory';
import { IExtendedUser } from '@models/IUser';


type IChartCardDotProps = { setId: (Dispatch<SetStateAction<number>>) } & (
    | { category: ICategoryAmount, member?: never }
    | { category?: never, member: IExtendedUser }
)

const ChartCardDot: FC<IChartCardDotProps> = ({ category, member, setId }) => {
    let color = '#4C6FFF'
    let title = ''
    const onClick = () => {
        setId(category ? category.id : member.id)
    }
    if (category) {
        color = category.color_code;
        title = category.title || '';
    } else if (member) {
        color = member.color_code;
        title = member.first_name + ' ' + member.last_name || '';
    }

    return (
        <li className={classes.item} onClick={onClick}>
            <Light type={'solid'} color={color}></Light>
            <p className={classes.itemTitle}>{title}</p>
        </li>
    );
};

export default ChartCardDot;
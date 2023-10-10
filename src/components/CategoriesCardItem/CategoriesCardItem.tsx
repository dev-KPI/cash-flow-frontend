import { FC, MouseEvent} from 'react';

//logic
import { isValidHex, isValidIcon, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { ICategoryAmount } from '@models/ICategory';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';
//UI
import classes from './CategoriesCardItem.module.css';



interface IUserCategoriesCardProps{
    category: ICategoryAmount,
    setIdModalOpen: (value: number) => void,
    setIsModalOpen: (value: boolean) => void,
}

const UserCategoriesCardDot: FC<IUserCategoriesCardProps> = ({ category, setIdModalOpen, setIsModalOpen }) => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const amount: number = category.amount || 0;
    const color = isValidHex(category.color_code);
    const icon = isValidIcon(category.icon_url);
    const openModal = (e: MouseEvent) => {
        e.preventDefault()
        setIdModalOpen(category.id)
        setIsModalOpen(true)
    }    
    console.log(color);
    const categoryTitle = category.title.length > 8 ? `${category.title.slice(0, 7)}..` : category.title;
    return (
        <li 
        key={'123dsad' + amount + category.title}
        className={classes.item}
            onClick={openModal}
        >
            <h6 className={classes.expenseName}>{categoryTitle}</h6>
            <div className={classes.icon} style={{ background: color + 'B3'}}>
                <i className={icon}></i>
            </div>
            <p className={classes.expenseAmount} style={{ color: color }}>{`${numberWithCommas(amount)}${currency}`}</p>
        </li>
    );
};

export default UserCategoriesCardDot;
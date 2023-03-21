import React, {FC, useState, ReactNode} from 'react'

//UI
import classes from './FilterButton.module.css'
import SlideY from '@components/Animations/Slide/SlideY';
import Flip from '@components/Animations/Flip/Flip';
//store
import { ExpenseChartActions } from '@store/UI_store/ExpenseChartSlice/ExpenseChartSlice';
import { IExpenseChartState } from '@store/UI_store/ExpenseChartSlice/ExpenseChartInterfaces';
import { useActionCreators, useAppSelector } from '@hooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

interface Props {
    className?: string
}

const FilterButton: FC<Props> = () => {

    //store
    const ExpenseChartDispatch = useActionCreators(ExpenseChartActions);
    const ExpenseChartStore = useAppSelector<IExpenseChartState>(initialState => initialState.ExpenseChartSlice);
    const ThemeStore = useAppSelector<IThemeState>(initialState => initialState.persistedThemeSlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(initialState => initialState.persistedMonthPickerSlice);

    const [isDropDown, setIsDropDown] = useState<boolean>();
    const [isFlip, setIsFlip] = useState<boolean>();
    const titleFilterButton = ExpenseChartStore.displayRangeCurrent.slice(0, 1).toUpperCase() + ExpenseChartStore.displayRangeCurrent.substring(1);

    const getFiltersDropDown = (event: React.ChangeEvent | React.MouseEvent | null): void => {
        setIsDropDown(!isDropDown)
        setIsFlip(!isFlip)
    }

    const setCurrentRange = (event: React.MouseEvent, title: string) => {
        const type = title.toLowerCase();
        ExpenseChartDispatch.setDisplayRangeCurrent(type)
            if(type === 'monthly') {
                ExpenseChartDispatch.getDataByMonth(MonthPickerStore.currentMonth);
            } else if (type ==='weekly') {
                ExpenseChartDispatch.getDataByLastWeek();
            } else if (type === 'yearly'){
                ExpenseChartDispatch.getDataByYearPerMonth(MonthPickerStore.currentYear);
            }
        getFiltersDropDown(null)
    }

    const getFilters = (): ReactNode => {
        let res = ExpenseChartStore.rangeOverall.filter((el: string): boolean => el !== titleFilterButton.toLowerCase())
        return res.map((el: string): ReactNode => {
            const labelFilterButton = el.slice(0, 1).toUpperCase() + el.substring(1);
            return <li 
                onClick={(e)=>setCurrentRange(e, labelFilterButton)}
                key={el + '1df2'}
                className={classes.item}>
                    <h3>{labelFilterButton}</h3>
                </li>
        })
    }

    return (<>
        <div className={classes.wrapper}>
            <div 
            className={classes.filterButton}>
                <input type="checkbox" name="cheese" id="cheese" style={{display: "none"}}
                onChange={getFiltersDropDown}
                ></input>
                <label 
                className={classes.innerButton}
                htmlFor="cheese">
                    <h3>{titleFilterButton}</h3>
                    <Flip isAnimation={isFlip ? isFlip : false}>
                        <button onClick={getFiltersDropDown} >
                        <i className="bi bi-chevron-compact-down"></i>
                        </button>
                    </Flip>
                </label>
                <SlideY isAnimation={isDropDown ? isDropDown : false}>
                    <div className={classes.dropDown}>
                        <ul>
                            {getFilters()}
                        </ul>
                    </div>
                </SlideY>
            </div>
        </div>
    </>)
}

export default FilterButton
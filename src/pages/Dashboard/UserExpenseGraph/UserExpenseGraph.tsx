import React, { FC, useEffect, useState, useCallback, useRef, useMemo, ReactNode, MouseEvent } from 'react';

//logic
import DateService from '@services/DateService/DateService';
//UI
import classes from './UserExpenseGraph.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import { Bar, Chart } from "react-chartjs-2";
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, ChartData,Tick, TooltipPositionerFunction, 
    ChartType, TooltipModel, Element } from "chart.js";
import { Context } from 'vm';

//store
import { useActionCreators, useAppSelector } from '@hooks/useAppStore';

import { MonthPickerActions } from '@store/UI_store/MonthPickerSlice/MonthPickerSlice';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';

import { IExpenseItem } from '@store/ExpenseApiSlice/ExpenseApiInterfaces';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
import UserExpenseGraphPreloader from './UserExpenseGraphPreloader';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IUserExpenseGraphProps {
    expenses: IExpenseItem[],
    isExpensesLoading: boolean
}

const UserExpenseGraph: FC<IUserExpenseGraphProps> = ({expenses, isExpensesLoading}) => {

    //store
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);

    const getYParams = useCallback((): { high: number, step: number } => {
        let highValue = Math.max(...expenses.map(el => el.amount));
        const rank = highValue.toString().length - 1
        let highValueForY = (Math.floor(highValue / 10**rank) + 1) * 10**rank
        return { high: highValueForY, step: highValueForY /= 5 }
    }, [expenses])

    const getXParams = useCallback((): { high: number, step: number } => {
        return { high: 2, step: 5 }
    }, [expenses])
    
    const getChartData = useCallback((): { key: string; value: number }[] => {
        return [...expenses.map(el => {return {
            key: new Date(el.time).getDate() + '',
            value: el.amount,
            data: el
        }})]
    }, [expenses])

    const datasets: ChartData<'bar', { key: string, value: number }[]> = {
        datasets: [{
            data: getChartData(),
            parsing: {
                yAxisKey: 'value',
                xAxisKey: 'key',
            },
        }],
    };
    
    const [priceTooltip, setPriceTooltip] = useState<number>();
    const [monthTooltip, setMonthTooltip] = useState<string>();
    const [dateTooltip, setDateTooltip] = useState<number>();
    const [yearTooltip, setYearTooltip] = useState<number>();

    const titleTooltip = (context: Context): string => {
        setMonthTooltip(DateService.getMonthNameByIdx(new Date(context[0]?.raw.data.time).getMonth()).slice(0,3));
        setDateTooltip(new Date(context[0]?.raw.data.time).getDate());
        setYearTooltip(new Date(context[0]?.raw.data.time).getFullYear());
        setPriceTooltip(context[0]?.parsed.y);
        return `${monthTooltip} ${dateTooltip}, ${yearTooltip}`
    }
    const PriceTooltip = (context: Context): string => {
        return  priceTooltip + '$'
    }
    const footerTooltip = (context: Context): string => {
        return 'Total expenses'
    }
    const textColor = (context: Context): string => {
        return ThemeStore.textColor
    }

    const options = {
        responsive: true,
        elements: {
            bar:{
                barThickness: 24,
                backgroundColor: "#80D667",
                hoverBackgroundColor: "#80EE67",
                borderRadius: 20,
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                boxWidth: 132,
                boxHeight: 82,
                padding: 8,
                cornerRadius: 10,
                displayColors: false,
                backgroundColor: "rgba(75, 79, 82, 0.85)",
                bodyFont: {
                    family: 'Inter',
                    size: 16,
                    weight: "400",
                },
                titleFont: {
                    family: 'Inter',
                    size: 12,
                    weight: "300",
                },
                titleColor: '#AFAFC6',
                footerFont: {
                    family: 'Inter',
                    size: 12,
                    weight: "400",
                },
                footerColor: '#9BABC5',
                titleMarginBottom: 8,
                footerMarginTop: 8,
                afterFooterColor: 'white',
                usePointStyle: false,
                callbacks: {
                    title: titleTooltip,
                    label: PriceTooltip,
                    bodyColor: textColor,
                    footer: footerTooltip
                }
            },
        },
        scales: {
            x: {
                suggestedmin: 0,
                suggestedmax: getXParams().high,
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                    borderColor: '',
                    tickColor: textColor,
                },
                ticks: {
                    color: textColor,
                    stepSize: getXParams().step,
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: "300",
                    },
                },
                maxTicksLimit: getXParams().step
            },
            y: {
                suggestedmin: 0,
                suggestedmax: getYParams().high,
                border: {
                    display: false,
                    borderColor: '',
                    dash: [5, 4],
                },
                grid: {
                    color: textColor,
                    tickColor: '',
                    borderColor: '',
                },
                ticks: {
                    color: textColor,
                    font: {
                        family: 'Inter',
                        size: 14,
                        weight: "300",
                    },
                    stepSize: getYParams().step,   
                    callback: (value: string|number, index: number, ticks: Tick[]): string => {
                        if(window.innerWidth > 320 && window.innerWidth < 440){ 
                            return +(value)/1000 + 'k$';
                        } 
                        return value + '$';
                    }                 
                },
            }
        }
    }

    return <>
        {isExpensesLoading ? 
            <UserExpenseGraphPreloader/>
            : 
            <>
                <Chart<'bar', { key: string, value: number }[]>
                type="bar"
                className={classes.chartinner__wrapper}
                options={options} 
                data={datasets}/>
            </>
        }            
    </>
}

export default React.memo(UserExpenseGraph)
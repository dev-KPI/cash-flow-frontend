import React, { FC, useEffect, useState, useCallback, useRef, useMemo, ReactNode } from 'react';

//logic
import DateService from '@services/DateService/DateService';

//UI
import classes from './ExpenseChart.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import FilterButton from '@components/ExpenseChart/FilterButton/FilterButton';
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

import { ExpenseChartActions } from '@store/UI_store/ExpenseChartSlice/ExpenseChartSlice';
import { IExpenseChartState } from '@store/UI_store/ExpenseChartSlice/ExpenseChartInterfaces';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import { BaseChartComponent, ChartJSOrUndefined } from 'react-chartjs-2/dist/types';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart: FC = () => {

    //store
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.persistedMonthPickerSlice);
    const ExpenseChartStore = useAppSelector<IExpenseChartState>(state => state.ExpenseChartSlice);

    const ExpenseChartDispatch = useActionCreators(ExpenseChartActions)

    const updateChart = (): void => {
        if (ExpenseChartStore.displayRangeCurrent === 'monthly') {
            ExpenseChartDispatch.getDataByMonth(MonthPickerStore.currentMonth);
        } else if (ExpenseChartStore.displayRangeCurrent ==='weekly') {
            ExpenseChartDispatch.getDataByLastWeek();
        } 
        else if (ExpenseChartStore.displayRangeCurrent === 'yearly'){
            ExpenseChartDispatch.getDataByYearPerMonth(MonthPickerStore.currentYear);
        }
    }

    useEffect(() => {
        updateChart()
    }, [MonthPickerStore.currentMonth])

    const getYParams = (): { high: number, step: number } => {
        let highValue = Math.max(...ExpenseChartStore.data.map(el => { return el.value }));
        const rank = highValue.toString().length - 1
        let highValueForY = (Math.floor(highValue / 10**rank) + 1) * 10**rank
        return { high: highValueForY, step: highValueForY /= 5 }
    }
    const getXParams = (): { high: number, step: number } => {
        return { high: ExpenseChartStore.daysInMonth, step: 5 }
    }
    const getChartData = (): { key: string; value: number; }[] => {
        return [...ExpenseChartStore.data]
    }

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
        interface ITitleTooltipRes {
            month: string, 
            date: number, 
            year: number
        }
        setMonthTooltip(context[0]?.raw.datetime.month.slice(0,3));
        setDateTooltip(context[0]?.raw.datetime.date);
        setYearTooltip(context[0]?.raw.datetime.year);
        setPriceTooltip(context[0]?.parsed.y);
        const typeRangeChart = ExpenseChartStore.displayRangeCurrent === 'yearly' ? true : false
        return `${monthTooltip}${typeRangeChart ? '' : ' ' + dateTooltip}, ${yearTooltip}`
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
                    tickColor: '',
                },
                ticks: {
                    stepSize: getXParams().step,
                    color: textColor,
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
                    color: '#E5E6EB',
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
                        return value + '$';
                    }                 
                },
            }
        }
    }

    const RangeTitle: ReactNode = (ExpenseChartStore.displayRangeCurrent === 'monthly' || ExpenseChartStore.displayRangeCurrent === 'weekly') ? 
            <h2 className={classes.range}>From {
                ExpenseChartStore.data[0]?.key + ' ' + ExpenseChartStore.data[0]?.datetime.month.slice(0, 3)
            } - {
                ExpenseChartStore.data[ExpenseChartStore.data.length - 1]?.key + ' ' 
                + ExpenseChartStore.data[ExpenseChartStore.data.length - 1]?.datetime.month.slice(0, 3)
            }</h2> : <h2 className={classes.range}>By {MonthPickerStore.currentYear} year</h2>;

    return <>
        <div className={classes.expenseChart__wrapper}>
            <div className={classes.chart__uppernav}>
                <div className={classes.chart__titleRange}>
                    <h2 className={classes.title}>Statistic</h2>
                    {RangeTitle}
                </div>
                <FilterButton className={classes.filterButton}/>
            </div>
            <Chart<'bar', { key: string, value: number }[]>
            type="bar"
            className={classes.chartinner__wrapper}
            options={options} 
            data={datasets}/>
        </div>
    </>;
}

export default ExpenseChart;

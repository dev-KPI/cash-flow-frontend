import React, { FC, useEffect, useState, useCallback, useRef, useMemo, ReactNode, MouseEvent } from 'react';

//logic
import DateService from '@services/DateService/DateService';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GraphCard.module.css'
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, ChartData,Tick, TooltipPositionerFunction,
    ChartType, TooltipModel, Element } from "chart.js/auto";
import { Context } from 'vm';

//store
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface IExpenseItem { 
    id: number, 
    description: string,
    amount: number,
    time: string,
    user_id: number,
    group_id: number,
    category_id: number
}

interface IGraphProps {
    data: IExpenseItem[]
}

const Graph: FC<IGraphProps> = ({data}) => {

    //store
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    
    const getYParams = useCallback((): { high: number, step: number } => {
        let highValue = Math.max(...data.map(el => el.amount));
        const rank = highValue.toString().length - 1
        let highValueForY = (Math.floor(highValue / 10**rank) + 1) * 10**rank
        return { high: highValueForY, step: highValueForY /= 5 }
    }, [data])

    const getXParams = useCallback((): { high: number, step: number } => {
        return { high: 2, step: 5 }
    }, [data])
    
    const getChartData = useCallback((): { key: string; value: number }[] => {
        return [...data.map(el => {return {
            key: new Date(el.time).getDate() + '',
            value: el.amount,
            data: el
        }})]
    }, [data])

    const datasets: ChartData<'bar', { key: string, value: number }[]> = {
        datasets: [{
            data: getChartData(),
            parsing: {
                yAxisKey: 'value',
                xAxisKey: 'key',
            },
        }],
    };
    
    const [priceTooltip, setPriceTooltip] = useState<number>(0);
    const [monthTooltip, setMonthTooltip] = useState<string>('');
    const [dateTooltip, setDateTooltip] = useState<number>(0);
    const [yearTooltip, setYearTooltip] = useState<number>(0);

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
        maintainAspectRatio: false,
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
                boxWidth: 10,
                boxHeight: 10,
                padding: 8,
                cornerRadius: 10,
                caretSize: 0,
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
                    callback: (value: string | number, index: number, ticks: Tick[]): string => {
                        const resValue = +(value);
                        if (window.innerWidth < 440 && resValue >= 1000) {
                            return numberWithCommas(resValue / 1000)  + 'k$'
                        }
                        return numberWithCommas(resValue) + '$';
                    }
                },
            }
        }
    }

    return (
            <Chart<'bar', { key: string, value: number }[]>
            type="bar"
            className={classes.chartinner__wrapper}
            options={options}
            data={datasets}
            />
            )
}

export default React.memo(Graph)

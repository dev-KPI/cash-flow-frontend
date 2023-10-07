import React, { FC, useState, useCallback } from 'react';

//logic
import DateService from '@services/DateService/DateService';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GraphCard.module.css'
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, ChartData, Tick, CoreScaleOptions, Scale } from "chart.js/auto";
import { Context } from 'vm';

//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import { IGetCurrentUserDailyExpensesResponse } from '@store/Controllers/UserController/UserControllerInterfaces';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';




ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IGraphProps {
    data: IGetCurrentUserDailyExpensesResponse[]
}

const Graph: FC<IGraphProps> = ({data}) => {

    //store
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    
    const getChartData = useCallback((): { key: string; value: number }[] => {
        return [...data.map(el => {return {
            key: el.date,
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
            maxBarThickness: 24,
            borderRadius: 20,
            backgroundColor: "#80D667",
            hoverBackgroundColor: "#80EE67",
        }]
    };
    
    const [priceTooltip, setPriceTooltip] = useState<number>(0);

    const titleTooltip = (context: Context): string => {
        const [year, month, day] = context[0].label.split('-');
        const monthTitle = DateService.getMonthNameByIdx(+month-1).slice(0,3);
        setPriceTooltip(context[0]?.parsed.y);
        return `${monthTitle} ${day}, ${year}`
    }
    const PriceTooltip = (context: Context): string => {
        return  numberWithCommas(priceTooltip) + currency
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
                backgroundColor: "#80D667",
                hoverBackgroundColor: "#80EE67",
                borderColor: "#80D667",
            },
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
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: "300",
                    },
                    callback: function (this: Scale<CoreScaleOptions>, tickValue: string | number, index: number, ticks: Tick[]): number {
                        return +this.getLabelForValue(index).split('-')[2];
                    },
                },
            },
            y: {
                suggestedmin: 0,
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
                    callback: (value: string | number, index: number, ticks: Tick[]): string => {
                        const resValue = +(value);
                        if (window.innerWidth < 440 && resValue >= 1000) {
                            return numberWithCommas(resValue / 1000) + 'k' + currency
                        }
                        return numberWithCommas(resValue) + currency
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

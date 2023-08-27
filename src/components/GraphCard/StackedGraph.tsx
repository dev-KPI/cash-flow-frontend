import React, { FC, useCallback } from 'react';

//logic
import DateService from '@services/DateService/DateService';
import { shaffledColors, numberWithCommas } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GraphCard.module.css'
import {  Chart } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, Tick,
    TooltipItem
} from "chart.js/auto";
import { Context } from 'vm';

//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import { IExtendedUser } from '@models/IUser';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface IGraphGroupMembers {
    date: string,
    amount: number,
    users: Omit<IExtendedUser, 'picture'>[]
}

interface IStackedGraphProps {
    data: IGraphGroupMembers[]
}

const StackedGraph: FC<IStackedGraphProps> = ({ data }) => {
    //store
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    function findMaxAmount(existingData: IGraphGroupMembers[]) {
        let maxAmount = 0;

        existingData.forEach((item) => {
            if (item.amount > maxAmount) {
                maxAmount = item.amount;
            }
        });

        return maxAmount;
    }

    const textColor = (context: Context): string => {
        return ThemeStore.textColor
    }

    const titleTooltip = (context: Context): string => {
        const dateString = context[0].dataset.key[context[0].dataIndex]
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = DateService.getMonthNameByIdx(new Date(date).getMonth()).slice(0, 3);
        const day = date.getDate();
        return `${month} ${day}, ${year}`
    }
    const PriceTooltip = (context: Context): string => {
        const { chart } = context[0];
        const sum: number[] = [];

        chart.data.datasets[0].data.forEach((datapoint: any, i: number) => {
            const datasetArray: number[] = []
            chart.data.datasets.forEach((dataset: any) => {
                datasetArray.push(dataset.data[i])
            })
            const totalSum = (total: number, values: number): number => total + values
            sum.push(datasetArray.reduce(totalSum, 0))
        })
        const amount = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
        }).format(sum[context[0].dataIndex])
        return amount
    }

    function getAmountsByUserId(data: IGraphGroupMembers[], userId: number): number[] {
        const amounts: number[] = [];
        data.forEach((item) => {
            
            const details = item.users.find((user) => user.id === userId);
            if (details) {
                amounts.push(details.amount);
            } else {
                amounts.push(0);
            }
        });

        return amounts;
    }

    function findAllUsers(data: IGraphGroupMembers[]) {
        const idUserMap: { [key: number]: string } = {}; 

        data.forEach((item) => {
            item.users.forEach((user) => {
                const fullName = `${user.first_name} ${user.last_name}`;
                const userId = user.id;

                idUserMap[userId] = fullName;
            });
        });

        return idUserMap;
    }

    const getChartData = useCallback(() => {
        const users = findAllUsers(data);
        return Object.keys(users).map((userId, i) => {
            const fullName = users[+userId]; 
            return {
                label: fullName, 
                key: data.map((el) => new Date(el.date).toISOString().split('T')[0]),
                data: getAmountsByUserId(data, +userId),
                backgroundColor: shaffledColors[i % shaffledColors.length]
            };
        });
    }, [data]);

    const datasets = {
        labels: data.map((el) => new Date(el.date).getDate()),
        datasets: getChartData(),
    };


    const options = {
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const
        },
        elements: {
            bar: {
                barThickness: 24,
                backgroundColor: "#80D667",
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
                boxPadding: 10,
                multiKeyBackground: 'rgba(0,0,0,0)',
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
                usePointStyle: true,
                itemSort: function (a: TooltipItem<"bar">, b: TooltipItem<"bar">) {
                    const c: number = a.raw as number
                    const d: number = b.raw as number
                    return d - c
                },
                filter: (tooltipItem: TooltipItem<"bar">) => tooltipItem.raw as number > 0,
                callbacks: {
                    title: titleTooltip,
                    beforeBody: PriceTooltip,
                    bodyColor: textColor,
                    footer: function (context: Context) {
                        return 'Total expenses'
                    },
                    labelPointStyle: function (context: Context) {
                        return {
                            pointStyle: 'circle' as const,
                            rotation: 0
                        };
                    },
                    labelColor: function (context: Context) {
                        return {
                            borderColor: context.dataset.backgroundColor,
                            backgroundColor: context.dataset.backgroundColor,
                            borderWidth: 5,
                            borderRadius: 100
                        }
                    },
                    label: function (tooltipItem: TooltipItem<"bar">) {
                        const amount = (new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })).format(tooltipItem.raw as number)
                        const name = tooltipItem.dataset.label
                        return `${name} ${amount}`
                    }
                }
            },
        },
        // responsive: true,
        scales: {
            x: {
                stacked: true,
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
                    // stepSize: getXParams().step,
                    font: {
                        family: 'Inter',
                        size: 12,
                        weight: "300",
                    },
                },

            },
            y: {
                stacked: true,
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
                    // stepSize: getYParams().step,
                    callback: (value: string | number, index: number, ticks: Tick[]): string => {
                        const resValue = +(value);
                        if (window.innerWidth < 440 && resValue >= 1000) {
                            return numberWithCommas(resValue / 1000) + 'k$'
                        }
                        return numberWithCommas(resValue) + '$';
                    }
                }
            },
        }
    }

    return (
        <Chart<'bar'>
            type="bar"
            className={classes.chartinner__wrapper}
            options={options}
            data={datasets}
        />
    )
}

export default React.memo(StackedGraph)
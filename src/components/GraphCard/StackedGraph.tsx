import React, { FC, useEffect, useState, useCallback, useRef, useMemo, ReactNode, MouseEvent } from 'react';

//logic
import DateService from '@services/DateService/DateService';
//UI
import classes from './GraphCard.module.css'
import { Bar, Chart } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend, ChartData, Tick, TooltipPositionerFunction,
    ChartType, TooltipModel, Element, TooltipItem
} from "chart.js";
import { Context } from 'vm';

//store
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';

import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';

import { IExpenseItem } from '@store/ExpenseApiSlice/ExpenseApiInterfaces';
import UserExpenseGraphPreloader from './GraphCardLoader';
import { useContentSize } from '@hooks/layoutHooks/useLayout';
import IUser from '@models/IUser';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
type Colors = {
    [key: string]: string;
};

const colors: Colors = {
    blue: "#4C6FFF",
    orange: "#FF6E01",
    red: "#FF2D55",
    green: "#28CD41",
    purple: "#D96FF8"
};

function getRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const randomColorKey = colorKeys[randomIndex];
    return colors[randomColorKey];
}
interface IGraphGroupCategory {
    date: string,
    details: {
        user: IUser
        amount: number
    }[]
}
const existingData = [
    {
        date: '2023-04-01',
        details: [
            {
                user: {
                    id: 0,
                    login: 'johndoe@gmail.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    picture: 'ref.com',
                },
                amount: 132,
            },
            {
                user: {
                    id: 1,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Rezenkov',
                    picture: 'ref.com',
                },
                amount: 24,
            },
        ],
    },
];

const startDate = new Date('2023-04-02');
const endDate = new Date('2023-04-30');

const newData = [];

for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateString = date.toISOString().split('T')[0];
    const object = {
        date: dateString,
        details: [
            {
                user: {
                    id: 0,
                    login: 'johndoe@gmail.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2110 - 100 + 1)) + 100,
            },
            {
                user: {
                    id: 1,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Rezenkov',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2200 - 100 + 1)) + 100,
            },
            {
                user: {
                    id: 31,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Pestenkov',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2110 - 100 + 1)) + 100,
            },
        ],
    };
    newData.push(object);
}

const combinedData = [...existingData, ...newData];


interface IUserExpenseGraphProps {
    expenses: IExpenseItem[]
}

const UserExpenseGraph: FC<IUserExpenseGraphProps> = ({ expenses }) => {
    //store
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    function findMaxAmount(existingData: IGraphGroupCategory[]) {
        let maxAmount = 0;

        existingData.forEach((item) => {
            item.details.forEach((detail) => {
                if (detail.amount > maxAmount) {
                    maxAmount = detail.amount;
                }
            });
        });

        return maxAmount;
    }
    const { width } = useContentSize();
    const getYParams = useCallback((): { high: number, step: number } => {
        let highValue = findMaxAmount(combinedData)
        const rank = highValue.toString().length - 1
        let highValueForY = (Math.floor(highValue / 10 ** rank) + 1) * 10 ** rank
        return { high: highValueForY, step: highValueForY /= 5 }
    }, [expenses])

    const getXParams = useCallback((): { high: number, step: number } => {
        return { high: 2, step: 5 }
    }, [expenses])

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

    function getAmountsByUserId(newData: IGraphGroupCategory[], userId: number): number[] {
        const amounts: number[] = [];

        newData.forEach((item) => {
            const details = item.details.find((detail) => detail.user.id === userId);
            if (details) {
                amounts.push(details.amount);
            } else {
                amounts.push(0);
            }
        });

        return amounts;
    }
    function findAllUsers(combinedData: IGraphGroupCategory[]) {
        const fullNameUserMap: { [key: string]: number } = {};

        combinedData.forEach((item) => {
            item.details.forEach((detail) => {
                const { user } = detail;
                const fullName = `${user.first_name} ${user.last_name}`;
                const userId = user.id;

                fullNameUserMap[fullName] = userId;
            });
        });

        return fullNameUserMap;
    }

    const getChartData = useCallback(() => {
        const users = findAllUsers(combinedData);
        return Object.keys(users).map((user) => {
            return {
                label: user,
                key: combinedData.map((el) => new Date(el.date).toISOString().split('T')[0]),
                data: getAmountsByUserId(combinedData, users[user]),
                backgroundColor: getRandomColor()
            };
        });
    }, [combinedData]);
    console.log(getChartData());
    const datasets = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
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
        responsive: true,
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
                            return resValue / 1000 + 'k$'
                        }
                        return value + '$';
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

export default React.memo(UserExpenseGraph)
import React, { useEffect, useRef, FC, useState, SetStateAction } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartEvent } from 'chart.js'
import { useActionCreators, useAppSelector } from '@hooks/useAppStore';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, getElementAtEvent } from 'react-chartjs-2';

import { Context } from 'vm';
import { useAppDispatch } from '@hooks/useAppStore';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';
import { useGetCategoryExpenseByIdQuery } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';


interface DoughnutProps {
    options: ChartOptions<'doughnut'>;
    data: ChartData<'doughnut'>;
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
)

interface UserExpenseChartProps {
    expenses: IUserExpenseChartDataItem[];
    setId: (setId: SetStateAction<number | undefined>) => void;
}

const UserExpenseChart: FC<UserExpenseChartProps> = ({expenses, setId}) => {
    const dataAmount = expenses.map((item) => item.amount);
    const backgroundColor = expenses.map((item) => item.color)

    const data = {
        datasets: [{
            data: dataAmount ,
            backgroundColor: backgroundColor,
            hoverOffset: 4,
            spacing: 18,
            borderWidth: 1,
            cutout: 73,
            borderRadius: 30
        }],
    }

    const options = {
        plugins:{
            tooltip: {
                enabled: false,
            },
        },
        onHover: (e: ChartEvent) => {
            const { current: chart } = chartRef;
            if (!chart) return;
            if(!e.native) return
            if (chart.getActiveElements().length > 0)
                (e.native.target as HTMLElement).style.cursor = 'pointer';
            if (!chart.getActiveElements().length) 
                (e.native.target as HTMLElement).style.cursor = 'auto';
        },
       

    }

    const chartRef = useRef<ChartJS>(null)
    const onClick =  (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;
        if (!chart) return;
        const element = getElementAtEvent(chart, e);
        const index = element[0]?.index
        setId(index);
    }

   

    return (
        <Chart
            type='doughnut'
            ref={chartRef}
            data = {data}
            options={options}
            onClick={onClick}
        ></Chart>     
    )
}
export default UserExpenseChart
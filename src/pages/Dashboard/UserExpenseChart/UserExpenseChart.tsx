import React, { useRef, FC, Dispatch, SetStateAction } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartEvent } from 'chart.js'
import { useAppSelector } from '@hooks/useAppStore';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, getElementAtEvent } from 'react-chartjs-2';

import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';
import { AnyObject, EmptyObject } from 'chart.js/dist/types/basic';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';


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
    total: { total: number } | undefined
    setId: Dispatch<SetStateAction<number | undefined>>
}

const UserExpenseChart: FC<UserExpenseChartProps> = ({expenses, total, setId}) => {

    const {mainTextColor} = useAppSelector(state => state.persistedThemeSlice);
    
    const dataAmount = expenses.map((item) => item.amount);
    const backgroundColor = expenses.map((item) => item.color)

    const data = {
        datasets: [{
            data: dataAmount ,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            hoverOffset: 4,
            spacing: 18,
            borderWidth: 1,
            cutout: 73,
            borderRadius: 30      
        }],
        
    }

    const options = {
        responsive: true,
        layout: {
            padding: {
                bottom: 15
            }
        },
        plugins:{
            tooltip: {
                enabled: false,
            },
            doughnutLabel: {
                color: mainTextColor,
                total: total?.total
            },
            doughnutShadow: {

            }
        },
        onHover: (e: ChartEvent) => {
            const { current: chart } = chartRef;
            if (!chart) return;
            if(!e.native) return
            if (chart.getActiveElements().length > 0)
                (e.native.target as HTMLElement).style.cursor = 'pointer';
            if (!chart.getActiveElements().length) 
                (e.native.target as HTMLElement).style.cursor = 'auto';
        }
    }

    const doughnutShadowPlugin = {
        id: 'doughnutShadow',
        beforeDraw: (chart: ChartJS, args: AnyObject, pluginOptions: AnyObject) => {
            const { ctx } = chart;
            ctx.shadowColor = "rgba(131,131,131, 0.4)";
            ctx.shadowBlur = 10;
        },
    };
    const doughnutLabelPlugin = {
        id: 'doughnutLabel',
        beforeDatasetsDraw: (chart: ChartJS, args: AnyObject, pluginOptions: AnyObject) => {
            const { ctx, data } = chart;
            ctx.save();
            const xCoor = chart.getDatasetMeta(0).data[0].x;
            const yCoor = chart.getDatasetMeta(0).data[0].y;
            ctx.font = '600 24px Inter';
            ctx.fillStyle = pluginOptions.color
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${ numberWithCommas(pluginOptions.total)}$`, xCoor, yCoor);
        },
    }

    const chartRef = useRef<ChartJS>(null)
    const onClick =  (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;
        if (!chart) return;
        const element = getElementAtEvent(chart, e);
        const index = element[0]?.index
        if(index !== undefined) {
            setId(expenses[index].id);
        }
    }


    return (
        <Chart
            type='doughnut'
            ref={chartRef}
            data = {data}
            options = {options}
            plugins={[doughnutLabelPlugin, doughnutShadowPlugin]}
            onClick={onClick}
        ></Chart>     
    )
}
export default UserExpenseChart

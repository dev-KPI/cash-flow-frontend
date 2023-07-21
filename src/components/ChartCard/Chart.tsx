import React, { useRef, FC, Dispatch, SetStateAction } from 'react';
//logic
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartEvent } from 'chart.js'
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import { IUserExpenseChartDataItem } from '@store/TemporaryInterfaces';
import { AnyObject, EmptyObject } from 'chart.js/dist/types/basic';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { IMembersExpensesChart } from './ChartCard';


interface DoughnutProps {
    options: ChartOptions<'doughnut'>;
    data: ChartData<'doughnut'>;
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
)

interface ChartProps {
    data: IUserExpenseChartDataItem[] | IMembersExpensesChart[];
    total: number;
    setId: Dispatch<SetStateAction<number>>
}

const UserExpenseChart: FC<ChartProps> = ({ data, total, setId }) => {

    const { mainTextColor } = useAppSelector(state => state.persistedThemeSlice);
    const dataAmount = data.map((item) => item.amount);
    let backgroundColor = data.map((item) => '')
    if (data.some(item => item.hasOwnProperty("member"))) {
        const members = data as IMembersExpensesChart[];
        backgroundColor = members.map((item) => item.member.color || '#4C6FFF') ;
    } else if (data.some(item => item.hasOwnProperty("category"))) {
        const categories = data as IUserExpenseChartDataItem[];
        backgroundColor = categories.map((item) => item.category.color)
    }

    //fix to avoid very small segments
    let inPercent = dataAmount.map(v => Math.max(v / total * 100, 2)); 
    const dataProps = {
        datasets: [{
            data: inPercent,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            hoverOffset: 4,
            spacing: 18,
            borderWidth: 1,
            cutout: '85%',
            borderRadius: 30
        }],

    }

    const options = {
        layout: {
            padding: {
                bottom: 15
            }
        },
        plugins: {
            tooltip: {
                enabled: false,
            },
            doughnutLabel: {
                color: mainTextColor,
                total: total.toFixed(2)
            },
        },
        onHover: (e: ChartEvent) => {
            const { current: chart } = chartRef;
            if (!chart) return;
            if (!e.native) return
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
            ctx.font = "600 " + 0.12 * chart.chartArea.width + "px Inter";
            ctx.fillStyle = pluginOptions.color
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${numberWithCommas(pluginOptions.total)}$`, xCoor, yCoor);
        },
    }

    const chartRef = useRef<ChartJS>(null)
    const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = chartRef;
        if (!chart) return;
        const element = getElementAtEvent(chart, e);
        const index = element[0]?.index
        if (index !== undefined) {
            const item = data[index]
            if ('member' in item) {
                const memberId = item.member.id;
                setId(memberId)
            } else {
                const categoryId = item.category.id;
                setId(categoryId)
            }
        }
        
        
    }


    return (
        <Chart
            type='doughnut'
            ref={chartRef}
            data={dataProps}
            options={options}
            plugins={[doughnutLabelPlugin, doughnutShadowPlugin]}
            onClick={onClick}
            width='content-box'
        ></Chart>
    )
}
export default UserExpenseChart

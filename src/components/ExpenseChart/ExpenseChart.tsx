import React, {useEffect} from 'react';

//services
import  DateService from '@services/DateService/DateService';
//UI
import classes from './ExpenseChart.module.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );


const ExpenseChart = () => {

    console.log(DateService.getArrayFromDatesPerLastSevenDays())
    console.log(DateService.getArrayFromDatesPerSomeMonth(2, 2023))

    // const dataChart = {
    //     labels: [1,2],
    //     datasets: [
    //         {
    //             // label: `${DateService.currentMonth()} 20`,
    //             data: 1,
    //             backgroundColor: "#80D667",
    //             borderRadius: 100
    //         },{
    //             label: "January 20",
    //             data: 1,
    //             backgroundColor: "#80D667",
    //             borderRadius: 100
    //         },
    //     ]
    // };

    // const options = {
    //     responsive: true,
    //     subtitle: {
    //         display: true,
    //         text: 'Custom Chart Subtitle'
    //     },
    //     scales: {
            
    //     },
    //     plugins: {
    //         legend: {
    //             position: "top" as const
    //         },
    //         title: {
    //             display: true,
    //             text: "Chart.js Bar Chart",
    //         },
    
    //     }
    // };

    return <>
        <div className={classes.chart__wrapper}>
            {/* <Bar options={options} data={dataChart} /> */}
        </div>
    </>;
}

export default ExpenseChart;

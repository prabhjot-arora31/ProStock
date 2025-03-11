import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement, LineController } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, 
  Title,
  Tooltip,
  Legend,
  LineController 
);

const LineChart = ({ chartData }) => {
  const chartRef = useRef(null); 

  useEffect(() => {
    if (!chartRef.current) return; 
console.log('chartdata:',chartData)
    const chartInstance = new ChartJS(chartRef.current, {
      type: 'line', 
      data: {
        labels: chartData?.labels || [], 
        datasets: [
          {
            label: 'Sales Over Time',
            data: chartData?.data || [], 
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales Over Time',
          },
          tooltip: {
            enabled: true, 
          },
        },
        scales: {
          y: {
            beginAtZero: true, 
          },
        },
      },
    });

    
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartData]); 

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas> 
    </div>
  );
};

export default LineChart;

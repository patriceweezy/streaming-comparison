// ProviderPieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../app/styles/Comparison.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProviderPieChart = ({ provider }) => {
  const data = {
    labels: ['Filme', 'Serien'],
    datasets: [
      {
        data: [provider.films, provider.series],
        backgroundColor: ['#FF4500', '#FFA500'],
        hoverBackgroundColor: ['#FF6347', '#FFD700']
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <Pie data={data} options={options} style={{ maxHeight: '200px', maxWidth: '200px' }} />
      <h3 className="pieChartTitle">{provider.name}</h3>
    </div>
  );
};

export default ProviderPieChart;

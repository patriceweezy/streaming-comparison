// ComparisonChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonChart = ({ data }) => {
  const formattedData = data.map(provider => ({
    name: provider.name,
    Filme: provider.films,
    Serien: provider.series,
    Bewertung: provider.rating
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={formattedData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend 
          wrapperStyle={{ fontSize: '10px', fontWeight: 'normal' }} 
        />
        <Bar dataKey="Filme" fill="#8884d8" />
        <Bar dataKey="Serien" fill="#82ca9d" />
        <Bar dataKey="Bewertung" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ComparisonChart;

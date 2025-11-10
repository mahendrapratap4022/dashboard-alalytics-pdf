import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './ChartSection.css'

const PieChartSection = () => {
  const [chartOptions] = useState({
    data: [
      { category: 'North America', value: 35.5, amount: 142000 },
      { category: 'Europe', value: 28.2, amount: 112800 },
      { category: 'Asia Pacific', value: 22.8, amount: 91200 },
      { category: 'Latin America', value: 8.5, amount: 34000 },
      { category: 'Middle East', value: 5.0, amount: 20000 },
    ],
    title: {
      text: 'Market Share by Region',
      fontSize: 20,
      fontWeight: 'bold',
    },
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        legendItemKey: 'category',
        sectorLabelKey: 'value',
        fills: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'],
        strokes: ['#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50'],
        strokeWidth: 2,
        sectorLabel: {
          formatter: ({ datum }) => {
            return `${datum.value}%`
          },
        },
        tooltip: {
          renderer: ({ datum }) => {
            return {
              title: datum.category,
              content: `${datum.value}% ($${(datum.amount / 1000).toFixed(0)}K)`,
            }
          },
        },
      },
    ],
    legend: {
      position: 'right',
      item: {
        label: {
          formatter: ({ value }) => value,
        },
      },
    },
  })

  return (
    <div className="pie-chart-section chart-section">
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default PieChartSection


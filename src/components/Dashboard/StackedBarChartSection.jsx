import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './ChartSection.css'

const StackedBarChartSection = () => {
  const [chartOptions] = useState({
    data: [
      { quarter: 'Q1 2023', product: 12500, service: 8500, subscription: 6200 },
      { quarter: 'Q2 2023', product: 14200, service: 9100, subscription: 7500 },
      { quarter: 'Q3 2023', product: 13800, service: 9800, subscription: 8100 },
      { quarter: 'Q4 2023', product: 15600, service: 10500, subscription: 9200 },
      { quarter: 'Q1 2024', product: 16500, service: 11200, subscription: 10100 },
      { quarter: 'Q2 2024', product: 17800, service: 12500, subscription: 11500 },
      { quarter: 'Q3 2024', product: 18200, service: 13100, subscription: 12200 },
      { quarter: 'Q4 2024', product: 19500, service: 14200, subscription: 13500 },
    ],
    title: {
      text: 'Revenue by Category (Stacked)',
      fontSize: 20,
      fontWeight: 'bold',
    },
    series: [
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'product',
        yName: 'Product Sales',
        fill: '#3498db',
        stacked: true,
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'service',
        yName: 'Service Revenue',
        fill: '#2ecc71',
        stacked: true,
      },
      {
        type: 'bar',
        xKey: 'quarter',
        yKey: 'subscription',
        yName: 'Subscription Income',
        fill: '#9b59b6',
        stacked: true,
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Quarter',
          fontWeight: 'bold',
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Revenue ($)',
          fontWeight: 'bold',
        },
        label: {
          formatter: (params) => {
            return '$' + (params.value / 1000).toFixed(0) + 'K'
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      spacing: 40,
    },
  })

  return (
    <div className="stacked-bar-chart-section chart-section">
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default StackedBarChartSection


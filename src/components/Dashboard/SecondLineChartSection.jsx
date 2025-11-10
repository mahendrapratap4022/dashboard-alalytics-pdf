import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './LineChartSection.css'

const SecondLineChartSection = () => {
  const [chartOptions] = useState({
    data: [
      // 2023 Data
      { month: 'Jan 2023', revenue: 45200, expenses: 32800, profit: 12400 },
      { month: 'Feb 2023', revenue: 48500, expenses: 34200, profit: 14300 },
      { month: 'Mar 2023', revenue: 52100, expenses: 35900, profit: 16200 },
      { month: 'Apr 2023', revenue: 49800, expenses: 34500, profit: 15300 },
      { month: 'May 2023', revenue: 54600, expenses: 36800, profit: 17800 },
      { month: 'Jun 2023', revenue: 58900, expenses: 38500, profit: 20400 },
      { month: 'Jul 2023', revenue: 56700, expenses: 37900, profit: 18800 },
      { month: 'Aug 2023', revenue: 53200, expenses: 36200, profit: 17000 },
      { month: 'Sep 2023', revenue: 55800, expenses: 37200, profit: 18600 },
      { month: 'Oct 2023', revenue: 59500, expenses: 38900, profit: 20600 },
      { month: 'Nov 2023', revenue: 58200, expenses: 38200, profit: 20000 },
      { month: 'Dec 2023', revenue: 62800, expenses: 40100, profit: 22700 },
      
      // 2024 Data
      { month: 'Jan 2024', revenue: 48500, expenses: 33500, profit: 15000 },
      { month: 'Feb 2024', revenue: 51200, expenses: 35100, profit: 16100 },
      { month: 'Mar 2024', revenue: 55800, expenses: 37200, profit: 18600 },
      { month: 'Apr 2024', revenue: 53400, expenses: 36300, profit: 17100 },
      { month: 'May 2024', revenue: 58200, expenses: 38800, profit: 19400 },
      { month: 'Jun 2024', revenue: 62900, expenses: 41200, profit: 21700 },
      { month: 'Jul 2024', revenue: 60800, expenses: 40100, profit: 20700 },
      { month: 'Aug 2024', revenue: 57500, expenses: 38900, profit: 18600 },
      { month: 'Sep 2024', revenue: 59800, expenses: 39800, profit: 20000 },
      { month: 'Oct 2024', revenue: 64200, expenses: 42100, profit: 22100 },
      { month: 'Nov 2024', revenue: 63500, expenses: 41500, profit: 22000 },
      { month: 'Dec 2024', revenue: 68900, expenses: 44200, profit: 24700 },
    ],
    title: {
      text: 'Revenue, Expenses & Profit Analysis (2023-2024)',
      fontSize: 20,
      fontWeight: 'bold',
    },
    series: [
      {
        type: 'line',
        xKey: 'month',
        yKey: 'revenue',
        yName: 'Revenue',
        stroke: '#3498db',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#3498db',
          stroke: '#3498db',
          size: 6,
        },
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'expenses',
        yName: 'Expenses',
        stroke: '#e74c3c',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#e74c3c',
          stroke: '#e74c3c',
          size: 6,
        },
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'profit',
        yName: 'Profit',
        stroke: '#2ecc71',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#2ecc71',
          stroke: '#2ecc71',
          size: 6,
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Month',
          fontWeight: 'bold',
        },
        label: {
          rotation: 45,
          autoRotate: true,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Amount ($)',
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
    <div className="line-chart-section">
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default SecondLineChartSection


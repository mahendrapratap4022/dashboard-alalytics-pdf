import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './LineChartSection.css'

const LineChartSection = () => {
  const [chartOptions] = useState({
    data: [
      { month: 'Jan', units: 850, charged: 98500, allowed: 85200 },
      { month: 'Feb', units: 920, charged: 105400, allowed: 92100 },
      { month: 'Mar', units: 1050, charged: 118200, allowed: 103500 },
      { month: 'Apr', units: 980, charged: 112300, allowed: 98400 },
      { month: 'May', units: 1120, charged: 128800, allowed: 112600 },
      { month: 'Jun', units: 1245, charged: 145890, allowed: 125450 },
      { month: 'Jul', units: 1180, charged: 136200, allowed: 118500 },
      { month: 'Aug', units: 1090, charged: 125700, allowed: 109800 },
      { month: 'Sep', units: 1150, charged: 132400, allowed: 115600 },
      { month: 'Oct', units: 1220, charged: 140500, allowed: 122300 },
      { month: 'Nov', units: 1190, charged: 137200, allowed: 119800 },
      { month: 'Dec', units: 1310, charged: 151200, allowed: 131700 },
    ],
    title: {
      text: 'Total Units, Total Charged & Total Allowed',
      fontSize: 20,
      fontWeight: 'bold',
    },
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'units',
        yName: 'Total Units',
        fill: '#2196f3',
        fillOpacity: 0.7,
        cornerRadius: 4,
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'charged',
        yName: 'Total Charged ($)',
        stroke: '#4caf50',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#4caf50',
          stroke: '#4caf50',
          size: 8,
        },
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'allowed',
        yName: 'Total Allowed ($)',
        stroke: '#ff9800',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#ff9800',
          stroke: '#ff9800',
          size: 8,
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
      },
      {
        type: 'number',
        position: 'left',
        keys: ['units'],
        title: {
          text: 'Total Units',
          fontWeight: 'bold',
        },
      },
      {
        type: 'number',
        position: 'right',
        keys: ['charged', 'allowed'],
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

export default LineChartSection


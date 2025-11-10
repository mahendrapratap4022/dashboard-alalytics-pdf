import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './LineChartSection.css'

const LineChartSection = () => {
  const [chartOptions] = useState({
    data: [
      // 2023 Data
      { month: 'Jan 2023', units: 750, charged: 88500, allowed: 75200 },
      { month: 'Feb 2023', units: 820, charged: 95400, allowed: 82100 },
      { month: 'Mar 2023', units: 950, charged: 108200, allowed: 93500 },
      { month: 'Apr 2023', units: 880, charged: 102300, allowed: 88400 },
      { month: 'May 2023', units: 1020, charged: 118800, allowed: 102600 },
      { month: 'Jun 2023', units: 1145, charged: 135890, allowed: 115450 },
      { month: 'Jul 2023', units: 1080, charged: 126200, allowed: 108500 },
      { month: 'Aug 2023', units: 990, charged: 115700, allowed: 99800 },
      { month: 'Sep 2023', units: 1050, charged: 122400, allowed: 105600 },
      { month: 'Oct 2023', units: 1120, charged: 130500, allowed: 112300 },
      { month: 'Nov 2023', units: 1090, charged: 127200, allowed: 109800 },
      { month: 'Dec 2023', units: 1210, charged: 141200, allowed: 121700 },
      
      // 2024 Data
      { month: 'Jan 2024', units: 850, charged: 98500, allowed: 85200 },
      { month: 'Feb 2024', units: 920, charged: 105400, allowed: 92100 },
      { month: 'Mar 2024', units: 1050, charged: 118200, allowed: 103500 },
      { month: 'Apr 2024', units: 980, charged: 112300, allowed: 98400 },
      { month: 'May 2024', units: 1120, charged: 128800, allowed: 112600 },
      { month: 'Jun 2024', units: 1245, charged: 145890, allowed: 125450 },
      { month: 'Jul 2024', units: 1180, charged: 136200, allowed: 118500 },
      { month: 'Aug 2024', units: 1090, charged: 125700, allowed: 109800 },
      { month: 'Sep 2024', units: 1150, charged: 132400, allowed: 115600 },
      { month: 'Oct 2024', units: 1220, charged: 140500, allowed: 122300 },
      { month: 'Nov 2024', units: 1190, charged: 137200, allowed: 119800 },
      { month: 'Dec 2024', units: 1310, charged: 151200, allowed: 131700 },
    ],
    title: {
      text: 'Total Units, Total Charged & Total Allowed (2023-2024)',
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
        label: {
          rotation: 45,
          autoRotate: true,
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


import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './ChartSection.css'

const AreaChartSection = () => {
  const [chartOptions] = useState({
    data: [
      { month: 'Jan', newCustomers: 145, returningCustomers: 520, totalRevenue: 28500 },
      { month: 'Feb', newCustomers: 165, returningCustomers: 580, totalRevenue: 32400 },
      { month: 'Mar', newCustomers: 198, returningCustomers: 645, totalRevenue: 38200 },
      { month: 'Apr', newCustomers: 182, returningCustomers: 610, totalRevenue: 35800 },
      { month: 'May', newCustomers: 220, returningCustomers: 720, totalRevenue: 42500 },
      { month: 'Jun', newCustomers: 245, returningCustomers: 785, totalRevenue: 48900 },
      { month: 'Jul', newCustomers: 238, returningCustomers: 765, totalRevenue: 46200 },
      { month: 'Aug', newCustomers: 210, returningCustomers: 695, totalRevenue: 41800 },
      { month: 'Sep', newCustomers: 225, returningCustomers: 740, totalRevenue: 44500 },
      { month: 'Oct', newCustomers: 258, returningCustomers: 820, totalRevenue: 51200 },
      { month: 'Nov', newCustomers: 275, returningCustomers: 865, totalRevenue: 54800 },
      { month: 'Dec', newCustomers: 310, returningCustomers: 950, totalRevenue: 62500 },
    ],
    title: {
      text: 'Customer Growth & Revenue Trends',
      fontSize: 20,
      fontWeight: 'bold',
    },
    series: [
      {
        type: 'area',
        xKey: 'month',
        yKey: 'newCustomers',
        yName: 'New Customers',
        fill: '#3498db',
        fillOpacity: 0.6,
        stroke: '#2980b9',
        strokeWidth: 2,
        marker: {
          enabled: true,
          fill: '#3498db',
          stroke: '#2980b9',
        },
      },
      {
        type: 'area',
        xKey: 'month',
        yKey: 'returningCustomers',
        yName: 'Returning Customers',
        fill: '#2ecc71',
        fillOpacity: 0.6,
        stroke: '#27ae60',
        strokeWidth: 2,
        marker: {
          enabled: true,
          fill: '#2ecc71',
          stroke: '#27ae60',
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Month (2024)',
          fontWeight: 'bold',
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Number of Customers',
          fontWeight: 'bold',
        },
      },
    ],
    legend: {
      position: 'bottom',
      spacing: 40,
    },
  })

  return (
    <div className="area-chart-section chart-section">
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default AreaChartSection


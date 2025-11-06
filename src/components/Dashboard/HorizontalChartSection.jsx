import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './HorizontalChartSection.css'

const HorizontalChartSection = () => {
  const [activeTab, setActiveTab] = useState('stockLocation')
  const [filterBy, setFilterBy] = useState('revenue')
  const [selectedLocation, setSelectedLocation] = useState('All')

  // Sample data for different tabs
  const stockLocationData = {
    revenue: [
      { name: 'Location A', value: 28500 },
      { name: 'Location B', value: 24200 },
      { name: 'Location C', value: 19800 },
      { name: 'Location D', value: 15600 },
      { name: 'Location E', value: 12100 },
    ],
    quantity: [
      { name: 'Location A', value: 385 },
      { name: 'Location B', value: 342 },
      { name: 'Location C', value: 298 },
      { name: 'Location D', value: 256 },
      { name: 'Location E', value: 189 },
    ],
  }

  const providerData = {
    revenue: [
      { name: 'Provider A', value: 32400 },
      { name: 'Provider B', value: 28900 },
      { name: 'Provider C', value: 21500 },
      { name: 'Provider D', value: 18700 },
      { name: 'Provider E', value: 15200 },
    ],
    quantity: [
      { name: 'Provider A', value: 425 },
      { name: 'Provider B', value: 389 },
      { name: 'Provider C', value: 312 },
      { name: 'Provider D', value: 278 },
      { name: 'Provider E', value: 234 },
    ],
  }

  const hcpcsData = {
    revenue: [
      { name: 'HCPCS-001', value: 35600 },
      { name: 'HCPCS-002', value: 29400 },
      { name: 'HCPCS-003', value: 24800 },
      { name: 'HCPCS-004', value: 18900 },
      { name: 'HCPCS-005', value: 14200 },
    ],
    quantity: [
      { name: 'HCPCS-001', value: 456 },
      { name: 'HCPCS-002', value: 398 },
      { name: 'HCPCS-003', value: 342 },
      { name: 'HCPCS-004', value: 287 },
      { name: 'HCPCS-005', value: 234 },
    ],
  }

  const fittersData = {
    revenue: [
      { name: 'Fitter A', value: 26800 },
      { name: 'Fitter B', value: 23400 },
      { name: 'Fitter C', value: 19900 },
      { name: 'Fitter D', value: 17200 },
      { name: 'Fitter E', value: 14500 },
    ],
    quantity: [
      { name: 'Fitter A', value: 368 },
      { name: 'Fitter B', value: 329 },
      { name: 'Fitter C', value: 298 },
      { name: 'Fitter D', value: 267 },
      { name: 'Fitter E', value: 223 },
    ],
  }

  const getDataForTab = () => {
    switch (activeTab) {
      case 'stockLocation':
        return filterBy === 'revenue' ? stockLocationData.revenue : stockLocationData.quantity
      case 'provider':
        return filterBy === 'revenue' ? providerData.revenue : providerData.quantity
      case 'hcpcs':
        return filterBy === 'revenue' ? hcpcsData.revenue : hcpcsData.quantity
      case 'fitters':
        return filterBy === 'revenue' ? fittersData.revenue : fittersData.quantity
      default:
        return []
    }
  }

  const chartOptions = {
    data: getDataForTab(),
    series: [
      {
        type: 'bar',
        direction: 'horizontal',
        xKey: 'name',
        yKey: 'value',
        fill: '#3498db',
        cornerRadius: 4,
        label: {
          enabled: true,
          formatter: ({ value }) => {
            if (filterBy === 'revenue') {
              return '$' + value.toLocaleString()
            }
            return value.toLocaleString()
          },
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'left',
      },
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: filterBy === 'revenue' ? 'Est. Revenue (in dollars)' : 'Qty Total (in numbers)',
          fontWeight: 'bold',
        },
        label: {
          formatter: ({ value }) => {
            if (filterBy === 'revenue') {
              return '$' + (value / 1000).toFixed(0) + 'K'
            }
            return value.toString()
          },
        },
      },
    ],
  }

  return (
    <div className="horizontal-chart-section">
      <div className="chart-header">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'stockLocation' ? 'active' : ''}`}
            onClick={() => setActiveTab('stockLocation')}
          >
            Stock Location
          </button>
          <button
            className={`tab ${activeTab === 'provider' ? 'active' : ''}`}
            onClick={() => setActiveTab('provider')}
          >
            Provider
          </button>
          <button
            className={`tab ${activeTab === 'hcpcs' ? 'active' : ''}`}
            onClick={() => setActiveTab('hcpcs')}
          >
            HCPCS
          </button>
          <button
            className={`tab ${activeTab === 'fitters' ? 'active' : ''}`}
            onClick={() => setActiveTab('fitters')}
          >
            Fitters
          </button>
        </div>
      </div>

      <div className="chart-controls">
        {activeTab === 'stockLocation' && (
          <div className="control-item">
            <label>Stock Location:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All">All</option>
            </select>
          </div>
        )}

        <div className="control-item">
          <label>Filter By:</label>
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="revenue">Est. Revenue (in dollars)</option>
            <option value="quantity">Qty Total (in numbers)</option>
          </select>
        </div>
      </div>

      <div className="chart-wrapper">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default HorizontalChartSection


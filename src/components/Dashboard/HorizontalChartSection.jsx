import React, { useState, useEffect } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './HorizontalChartSection.css'

const HorizontalChartSection = () => {
  const [activeTab, setActiveTab] = useState('stockLocation')
  const [filterBy, setFilterBy] = useState('revenue')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [isPdfMode, setIsPdfMode] = useState(false)

  useEffect(() => {
    // Check if body has generating-pdf class
    const checkPdfMode = () => {
      setIsPdfMode(document.body.classList.contains('generating-pdf'))
    }
    
    checkPdfMode()
    
    // Watch for class changes
    const observer = new MutationObserver(checkPdfMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Sample data for different tabs
  const stockLocationData = {
    revenue: [
      { name: 'Location A', value: 28500 },
      { name: 'Location B', value: 24200 },
      { name: 'Location C', value: 19800 },
      { name: 'Location D', value: 15600 },
      { name: 'Location E', value: 12100 },
      { name: 'Location F', value: 10800 },
      { name: 'Location G', value: 9500 },
      { name: 'Location H', value: 8200 },
      { name: 'Location I', value: 7400 },
      { name: 'Location J', value: 6800 },
      { name: 'Location K', value: 5900 },
      { name: 'Location L', value: 5100 },
      { name: 'Location M', value: 4500 },
      { name: 'Location N', value: 3800 },
      { name: 'Location O', value: 3200 },
    ],
    quantity: [
      { name: 'Location A', value: 385 },
      { name: 'Location B', value: 342 },
      { name: 'Location C', value: 298 },
      { name: 'Location D', value: 256 },
      { name: 'Location E', value: 189 },
      { name: 'Location F', value: 165 },
      { name: 'Location G', value: 148 },
      { name: 'Location H', value: 132 },
      { name: 'Location I', value: 119 },
      { name: 'Location J', value: 105 },
      { name: 'Location K', value: 92 },
      { name: 'Location L', value: 81 },
      { name: 'Location M', value: 73 },
      { name: 'Location N', value: 64 },
      { name: 'Location O', value: 55 },
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

  const createChartOptions = (data, filterType) => ({
    data: data,
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
            if (filterType === 'revenue') {
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
          text: filterType === 'revenue' ? 'Est. Revenue (in dollars)' : 'Qty Total (in numbers)',
          fontWeight: 'bold',
        },
        label: {
          formatter: ({ value }) => {
            if (filterType === 'revenue') {
              return '$' + (value / 1000).toFixed(0) + 'K'
            }
            return value.toString()
          },
        },
      },
    ],
  })

  const chartOptions = createChartOptions(getDataForTab(), filterBy)

  // PDF Mode: Render all charts as separate sections
  if (isPdfMode) {
    return (
      <>
        <div className="horizontal-chart-section pdf-mode stock-location-section">
          <h3 className="pdf-chart-title">Stock Location - Est. Revenue (in dollars)</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(stockLocationData.revenue, 'revenue')} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode provider-section">
          <h3 className="pdf-chart-title">Provider - Est. Revenue (in dollars)</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(providerData.revenue, 'revenue')} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode hcpcs-section">
          <h3 className="pdf-chart-title">HCPCS - Est. Revenue (in dollars)</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(hcpcsData.revenue, 'revenue')} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode fitters-section">
          <h3 className="pdf-chart-title">Fitters - Est. Revenue (in dollars)</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(fittersData.revenue, 'revenue')} />
          </div>
        </div>
      </>
    )
  }

  // Normal Mode: Render tabs
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


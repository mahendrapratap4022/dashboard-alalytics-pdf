import React, { useState, useEffect } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import './HorizontalChartSection.css'

const HorizontalChartSection = () => {
  const [activeTab, setActiveTab] = useState('stockLocation')
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

  // Sample data for different tabs - combined Qty and Revenue
  // Multiply qty by 50 to make it more visible on the same scale as revenue
  const stockLocationData = [
    { name: 'Location A', qty: 385 * 50, revenue: 28500, qtyActual: 385 },
    { name: 'Location B', qty: 342 * 50, revenue: 24200, qtyActual: 342 },
    { name: 'Location C', qty: 298 * 50, revenue: 19800, qtyActual: 298 },
    { name: 'Location D', qty: 256 * 50, revenue: 15600, qtyActual: 256 },
    { name: 'Location E', qty: 189 * 50, revenue: 12100, qtyActual: 189 },
    { name: 'Location F', qty: 165 * 50, revenue: 10800, qtyActual: 165 },
    { name: 'Location G', qty: 148 * 50, revenue: 9500, qtyActual: 148 },
    { name: 'Location H', qty: 132 * 50, revenue: 8200, qtyActual: 132 },
    { name: 'Location I', qty: 119 * 50, revenue: 7400, qtyActual: 119 },
    { name: 'Location J', qty: 105 * 50, revenue: 6800, qtyActual: 105 },
    { name: 'Location K', qty: 92 * 50, revenue: 5900, qtyActual: 92 },
    { name: 'Location L', qty: 81 * 50, revenue: 5100, qtyActual: 81 },
    { name: 'Location M', qty: 73 * 50, revenue: 4500, qtyActual: 73 },
    { name: 'Location N', qty: 64 * 50, revenue: 3800, qtyActual: 64 },
    { name: 'Location O', qty: 55 * 50, revenue: 3200, qtyActual: 55 },
  ]

  const providerData = [
    { name: 'Provider A', qty: 425 * 50, revenue: 32400, qtyActual: 425 },
    { name: 'Provider B', qty: 389 * 50, revenue: 28900, qtyActual: 389 },
    { name: 'Provider C', qty: 312 * 50, revenue: 21500, qtyActual: 312 },
    { name: 'Provider D', qty: 278 * 50, revenue: 18700, qtyActual: 278 },
    { name: 'Provider E', qty: 234 * 50, revenue: 15200, qtyActual: 234 },
    { name: 'Provider F', qty: 198 * 50, revenue: 13800, qtyActual: 198 },
    { name: 'Provider G', qty: 176 * 50, revenue: 12200, qtyActual: 176 },
    { name: 'Provider H', qty: 154 * 50, revenue: 10900, qtyActual: 154 },
    { name: 'Provider I', qty: 139 * 50, revenue: 9800, qtyActual: 139 },
    { name: 'Provider J', qty: 125 * 50, revenue: 8600, qtyActual: 125 },
    { name: 'Provider K', qty: 112 * 50, revenue: 7500, qtyActual: 112 },
    { name: 'Provider L', qty: 98 * 50, revenue: 6700, qtyActual: 98 },
    { name: 'Provider M', qty: 87 * 50, revenue: 5900, qtyActual: 87 },
    { name: 'Provider N', qty: 74 * 50, revenue: 5100, qtyActual: 74 },
    { name: 'Provider O', qty: 62 * 50, revenue: 4400, qtyActual: 62 },
  ]

  const hcpcsData = [
    { name: 'HCPCS-001', qty: 456 * 50, revenue: 35600, qtyActual: 456 },
    { name: 'HCPCS-002', qty: 398 * 50, revenue: 29400, qtyActual: 398 },
    { name: 'HCPCS-003', qty: 342 * 50, revenue: 24800, qtyActual: 342 },
    { name: 'HCPCS-004', qty: 287 * 50, revenue: 18900, qtyActual: 287 },
    { name: 'HCPCS-005', qty: 234 * 50, revenue: 14200, qtyActual: 234 },
    { name: 'HCPCS-006', qty: 205 * 50, revenue: 12600, qtyActual: 205 },
    { name: 'HCPCS-007', qty: 183 * 50, revenue: 11200, qtyActual: 183 },
    { name: 'HCPCS-008', qty: 167 * 50, revenue: 9900, qtyActual: 167 },
    { name: 'HCPCS-009', qty: 148 * 50, revenue: 8700, qtyActual: 148 },
    { name: 'HCPCS-010', qty: 132 * 50, revenue: 7800, qtyActual: 132 },
    { name: 'HCPCS-011', qty: 119 * 50, revenue: 6900, qtyActual: 119 },
    { name: 'HCPCS-012', qty: 105 * 50, revenue: 6100, qtyActual: 105 },
    { name: 'HCPCS-013', qty: 93 * 50, revenue: 5400, qtyActual: 93 },
    { name: 'HCPCS-014', qty: 81 * 50, revenue: 4700, qtyActual: 81 },
    { name: 'HCPCS-015', qty: 69 * 50, revenue: 4100, qtyActual: 69 },
  ]

  const fittersData = [
    { name: 'Fitter A', qty: 368 * 50, revenue: 26800, qtyActual: 368 },
    { name: 'Fitter B', qty: 329 * 50, revenue: 23400, qtyActual: 329 },
    { name: 'Fitter C', qty: 298 * 50, revenue: 19900, qtyActual: 298 },
    { name: 'Fitter D', qty: 267 * 50, revenue: 17200, qtyActual: 267 },
    { name: 'Fitter E', qty: 223 * 50, revenue: 14500, qtyActual: 223 },
    { name: 'Fitter F', qty: 192 * 50, revenue: 12800, qtyActual: 192 },
    { name: 'Fitter G', qty: 171 * 50, revenue: 11400, qtyActual: 171 },
    { name: 'Fitter H', qty: 156 * 50, revenue: 10200, qtyActual: 156 },
    { name: 'Fitter I', qty: 142 * 50, revenue: 9100, qtyActual: 142 },
    { name: 'Fitter J', qty: 128 * 50, revenue: 8300, qtyActual: 128 },
    { name: 'Fitter K', qty: 115 * 50, revenue: 7500, qtyActual: 115 },
    { name: 'Fitter L', qty: 103 * 50, revenue: 6700, qtyActual: 103 },
    { name: 'Fitter M', qty: 91 * 50, revenue: 5900, qtyActual: 91 },
    { name: 'Fitter N', qty: 79 * 50, revenue: 5200, qtyActual: 79 },
    { name: 'Fitter O', qty: 67 * 50, revenue: 4600, qtyActual: 67 },
  ]

  const getDataForTab = () => {
    switch (activeTab) {
      case 'stockLocation':
        return stockLocationData
      case 'provider':
        return providerData
      case 'hcpcs':
        return hcpcsData
      case 'fitters':
        return fittersData
      default:
        return []
    }
  }

  const createChartOptions = (data) => {
    return {
      data: data,
      series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'name',
          yKey: 'qty',
          yName: 'Qty',
          fill: '#3498db',
          strokeWidth: 0,
          label: {
            enabled: true,
            formatter: ({ datum }) => datum.qtyActual.toLocaleString(),
          },
        },
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'name',
          yKey: 'revenue',
          yName: 'Est Revenue',
          fill: '#9b59b6',
          strokeWidth: 0,
          label: {
            enabled: true,
            formatter: ({ value }) => '$' + value.toLocaleString(),
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
        },
      ],
      legend: {
        enabled: true,
        position: 'bottom',
      },
    }
  }

  const chartOptions = createChartOptions(getDataForTab())

  // PDF Mode: Render all charts as separate sections
  if (isPdfMode) {
    return (
      <>
        <div className="horizontal-chart-section pdf-mode stock-location-section">
          <h3 className="pdf-chart-title">Stock Location - Qty & Est Revenue</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(stockLocationData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode provider-section">
          <h3 className="pdf-chart-title">Provider - Qty & Est Revenue</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(providerData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode hcpcs-section">
          <h3 className="pdf-chart-title">HCPCS - Qty & Est Revenue</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(hcpcsData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode fitters-section">
          <h3 className="pdf-chart-title">Fitters - Qty & Est Revenue</h3>
          <div className="chart-wrapper">
            <AgChartsReact options={createChartOptions(fittersData)} />
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

      <div className="chart-wrapper">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default HorizontalChartSection


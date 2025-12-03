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
    { name: 'Location A', qty: 412 * 50, revenue: 32800, qtyActual: 412 },
    { name: 'Location B', qty: 378 * 50, revenue: 28600, qtyActual: 378 },
    { name: 'Location C', qty: 298 * 50, revenue: 23400, qtyActual: 298 },
    { name: 'Location D', qty: 345 * 50, revenue: 26700, qtyActual: 345 },
    { name: 'Location E', qty: 267 * 50, revenue: 21200, qtyActual: 267 },
    { name: 'Location F', qty: 234 * 50, revenue: 18900, qtyActual: 234 },
    { name: 'Location G', qty: 289 * 50, revenue: 22800, qtyActual: 289 },
    { name: 'Location H', qty: 198 * 50, revenue: 16500, qtyActual: 198 },
    { name: 'Location I', qty: 223 * 50, revenue: 19300, qtyActual: 223 },
    { name: 'Location J', qty: 176 * 50, revenue: 14800, qtyActual: 176 },
    { name: 'Location K', qty: 156 * 50, revenue: 13200, qtyActual: 156 },
    { name: 'Location L', qty: 189 * 50, revenue: 15900, qtyActual: 189 },
    { name: 'Location M', qty: 134 * 50, revenue: 11400, qtyActual: 134 },
    { name: 'Location N', qty: 112 * 50, revenue: 9800, qtyActual: 112 },
    { name: 'Location O', qty: 98 * 50, revenue: 8500, qtyActual: 98 },
    { name: 'Location P', qty: 256 * 50, revenue: 20100, qtyActual: 256 },
    { name: 'Location Q', qty: 312 * 50, revenue: 24500, qtyActual: 312 },
    { name: 'Location R', qty: 167 * 50, revenue: 14200, qtyActual: 167 },
    { name: 'Location S', qty: 201 * 50, revenue: 17800, qtyActual: 201 },
    { name: 'Location T', qty: 145 * 50, revenue: 12600, qtyActual: 145 },
    { name: 'Location U', qty: 278 * 50, revenue: 21900, qtyActual: 278 },
    { name: 'Location V', qty: 123 * 50, revenue: 10500, qtyActual: 123 },
    { name: 'Location W', qty: 189 * 50, revenue: 16200, qtyActual: 189 },
    { name: 'Location X', qty: 234 * 50, revenue: 19600, qtyActual: 234 },
    { name: 'Location Y', qty: 156 * 50, revenue: 13800, qtyActual: 156 },
    { name: 'Location Z', qty: 267 * 50, revenue: 22400, qtyActual: 267 },
    { name: 'Location AA', qty: 89 * 50, revenue: 7600, qtyActual: 89 },
    { name: 'Location AB', qty: 178 * 50, revenue: 15400, qtyActual: 178 },
    { name: 'Location AC', qty: 212 * 50, revenue: 18200, qtyActual: 212 },
    { name: 'Location AD', qty: 145 * 50, revenue: 12100, qtyActual: 145 },
  ]

  const providerData = [
    { name: 'Provider A', qty: 520 * 50, revenue: 45800, qtyActual: 520 },
    { name: 'Provider B', qty: 485 * 50, revenue: 39200, qtyActual: 485 },
    { name: 'Provider C', qty: 412 * 50, revenue: 35600, qtyActual: 412 },
    { name: 'Provider D', qty: 378 * 50, revenue: 31400, qtyActual: 378 },
    { name: 'Provider E', qty: 345 * 50, revenue: 28900, qtyActual: 345 },
    { name: 'Provider F', qty: 298 * 50, revenue: 24700, qtyActual: 298 },
    { name: 'Provider G', qty: 267 * 50, revenue: 22100, qtyActual: 267 },
    { name: 'Provider H', qty: 234 * 50, revenue: 19800, qtyActual: 234 },
    { name: 'Provider I', qty: 198 * 50, revenue: 16500, qtyActual: 198 },
    { name: 'Provider J', qty: 176 * 50, revenue: 14200, qtyActual: 176 },
    { name: 'Provider K', qty: 145 * 50, revenue: 12600, qtyActual: 145 },
    { name: 'Provider L', qty: 129 * 50, revenue: 10800, qtyActual: 129 },
    { name: 'Provider M', qty: 108 * 50, revenue: 9200, qtyActual: 108 },
    { name: 'Provider N', qty: 92 * 50, revenue: 7800, qtyActual: 92 },
    { name: 'Provider O', qty: 75 * 50, revenue: 6400, qtyActual: 75 },
    { name: 'Provider P', qty: 456 * 50, revenue: 38500, qtyActual: 456 },
    { name: 'Provider Q', qty: 389 * 50, revenue: 32800, qtyActual: 389 },
    { name: 'Provider R', qty: 312 * 50, revenue: 26900, qtyActual: 312 },
    { name: 'Provider S', qty: 256 * 50, revenue: 21500, qtyActual: 256 },
    { name: 'Provider T', qty: 189 * 50, revenue: 15800, qtyActual: 189 },
    { name: 'Provider U', qty: 423 * 50, revenue: 36200, qtyActual: 423 },
    { name: 'Provider V', qty: 167 * 50, revenue: 13900, qtyActual: 167 },
    { name: 'Provider W', qty: 289 * 50, revenue: 24100, qtyActual: 289 },
    { name: 'Provider X', qty: 134 * 50, revenue: 11200, qtyActual: 134 },
    { name: 'Provider Y', qty: 356 * 50, revenue: 29800, qtyActual: 356 },
    { name: 'Provider Z', qty: 112 * 50, revenue: 9500, qtyActual: 112 },
    { name: 'Provider AA', qty: 245 * 50, revenue: 20400, qtyActual: 245 },
    { name: 'Provider AB', qty: 178 * 50, revenue: 14800, qtyActual: 178 },
    { name: 'Provider AC', qty: 67 * 50, revenue: 5600, qtyActual: 67 },
    { name: 'Provider AD', qty: 201 * 50, revenue: 16900, qtyActual: 201 },
  ]

  const hcpcsData = [
    { name: 'HCPCS-001', qty: 620 * 50, revenue: 52400, qtyActual: 620 },
    { name: 'HCPCS-002', qty: 145 * 50, revenue: 18200, qtyActual: 145 },
    { name: 'HCPCS-003', qty: 498 * 50, revenue: 41800, qtyActual: 498 },
    { name: 'HCPCS-004', qty: 234 * 50, revenue: 26700, qtyActual: 234 },
    { name: 'HCPCS-005', qty: 378 * 50, revenue: 35200, qtyActual: 378 },
    { name: 'HCPCS-006', qty: 189 * 50, revenue: 22400, qtyActual: 189 },
    { name: 'HCPCS-007', qty: 312 * 50, revenue: 29800, qtyActual: 312 },
    { name: 'HCPCS-008', qty: 98 * 50, revenue: 12900, qtyActual: 98 },
    { name: 'HCPCS-009', qty: 267 * 50, revenue: 24600, qtyActual: 267 },
    { name: 'HCPCS-010', qty: 156 * 50, revenue: 19400, qtyActual: 156 },
    { name: 'HCPCS-011', qty: 423 * 50, revenue: 38700, qtyActual: 423 },
    { name: 'HCPCS-012', qty: 67 * 50, revenue: 9800, qtyActual: 67 },
    { name: 'HCPCS-013', qty: 198 * 50, revenue: 21500, qtyActual: 198 },
    { name: 'HCPCS-014', qty: 289 * 50, revenue: 27900, qtyActual: 289 },
    { name: 'HCPCS-015', qty: 112 * 50, revenue: 14600, qtyActual: 112 },
    { name: 'HCPCS-016', qty: 534 * 50, revenue: 46200, qtyActual: 534 },
    { name: 'HCPCS-017', qty: 178 * 50, revenue: 20800, qtyActual: 178 },
    { name: 'HCPCS-018', qty: 445 * 50, revenue: 39500, qtyActual: 445 },
    { name: 'HCPCS-019', qty: 89 * 50, revenue: 11400, qtyActual: 89 },
    { name: 'HCPCS-020', qty: 356 * 50, revenue: 32100, qtyActual: 356 },
  ]

  const fittersData = [
    { name: 'Fitter A', qty: 245 * 50, revenue: 18400, qtyActual: 245 },
    { name: 'Fitter B', qty: 232 * 50, revenue: 17200, qtyActual: 232 },
    { name: 'Fitter C', qty: 218 * 50, revenue: 16100, qtyActual: 218 },
    { name: 'Fitter D', qty: 203 * 50, revenue: 14900, qtyActual: 203 },
    { name: 'Fitter E', qty: 189 * 50, revenue: 13700, qtyActual: 189 },
    { name: 'Fitter F', qty: 176 * 50, revenue: 12600, qtyActual: 176 },
    { name: 'Fitter G', qty: 162 * 50, revenue: 11500, qtyActual: 162 },
    { name: 'Fitter H', qty: 148 * 50, revenue: 10400, qtyActual: 148 },
    { name: 'Fitter I', qty: 135 * 50, revenue: 9300, qtyActual: 135 },
    { name: 'Fitter J', qty: 122 * 50, revenue: 8200, qtyActual: 122 },
    { name: 'Fitter K', qty: 109 * 50, revenue: 7100, qtyActual: 109 },
    { name: 'Fitter L', qty: 96 * 50, revenue: 6000, qtyActual: 96 },
    { name: 'Fitter M', qty: 83 * 50, revenue: 4900, qtyActual: 83 },
    { name: 'Fitter N', qty: 70 * 50, revenue: 3800, qtyActual: 70 },
    { name: 'Fitter O', qty: 57 * 50, revenue: 2700, qtyActual: 57 },
    { name: 'Fitter P', qty: 198 * 50, revenue: 15200, qtyActual: 198 },
    { name: 'Fitter Q', qty: 167 * 50, revenue: 12900, qtyActual: 167 },
    { name: 'Fitter R', qty: 223 * 50, revenue: 17600, qtyActual: 223 },
    { name: 'Fitter S', qty: 145 * 50, revenue: 11200, qtyActual: 145 },
    { name: 'Fitter T', qty: 178 * 50, revenue: 13800, qtyActual: 178 },
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

  // Calculate dynamic height based on number of items
  // Base: ~33px per item (1000px for 30 items)
  const calculateChartHeight = (itemCount) => {
    const baseHeightPerItem = 33.33 // pixels per item
    const minHeight = 400 // minimum height
    const calculatedHeight = itemCount * baseHeightPerItem
    return Math.max(calculatedHeight, minHeight)
  }

  // PDF Mode: Render all charts as separate sections
  if (isPdfMode) {
    return (
      <>
        <div className="horizontal-chart-section pdf-mode stock-location-section">
          <h3 className="pdf-chart-title">Stock Location - Qty & Est Revenue</h3>
          <div className="chart-wrapper" style={{ height: `${calculateChartHeight(stockLocationData.length)}px`, minHeight: `${calculateChartHeight(stockLocationData.length)}px` }}>
            <AgChartsReact options={createChartOptions(stockLocationData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode provider-section">
          <h3 className="pdf-chart-title">Provider - Qty & Est Revenue</h3>
          <div className="chart-wrapper" style={{ height: `${calculateChartHeight(providerData.length)}px`, minHeight: `${calculateChartHeight(providerData.length)}px` }}>
            <AgChartsReact options={createChartOptions(providerData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode hcpcs-section">
          <h3 className="pdf-chart-title">HCPCS - Qty & Est Revenue</h3>
          <div className="chart-wrapper" style={{ height: `${calculateChartHeight(hcpcsData.length)}px`, minHeight: `${calculateChartHeight(hcpcsData.length)}px` }}>
            <AgChartsReact options={createChartOptions(hcpcsData)} />
          </div>
        </div>

        <div className="horizontal-chart-section pdf-mode fitters-section">
          <h3 className="pdf-chart-title">Fitters - Qty & Est Revenue</h3>
          <div className="chart-wrapper" style={{ height: `${calculateChartHeight(fittersData.length)}px`, minHeight: `${calculateChartHeight(fittersData.length)}px` }}>
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

      <div className="chart-wrapper" style={{ height: `${calculateChartHeight(getDataForTab().length)}px`, minHeight: `${calculateChartHeight(getDataForTab().length)}px` }}>
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export default HorizontalChartSection


import React, { useState, useEffect } from 'react'
import './FilterSection.css'

const FilterSection = () => {
  const [filters, setFilters] = useState({
    dateOfService: '3months',
    stockLocation: 'All',
    provider: 'All',
    hcpcs: 'All',
    fitter: 'All',
    visitStatus: 'All',
    fromDate: '',
    toDate: '',
    itemCategory: 'All',
    bilType: 'All',
    itemNumber: 'All',
  })

  const [isPdfMode, setIsPdfMode] = useState(false)

  useEffect(() => {
    const checkPdfMode = () => {
      setIsPdfMode(document.body.classList.contains('generating-pdf'))
    }
    
    checkPdfMode()
    
    const observer = new MutationObserver(checkPdfMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Define all available options for each filter
  const filterOptions = {
    dateOfService: ['1 Month', '2 Months', '3 Months', 'Custom Date Range'],
    stockLocation: ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Main Storage', 'Regional Hub'],
    provider: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis', 'Dr. Martinez'],
    hcpcs: ['E0143 - Walker', 'E1390 - Oxygen Concentrator', 'E0260 - Hospital Bed', 'K0001 - Standard Wheelchair', 'E0601 - CPAP Device', 'E0235 - Bed Rails'],
    fitter: ['John Anderson', 'Sarah Mitchell', 'Mike Thompson', 'Emily Rodriguez', 'David Chen'],
    visitStatus: ['Scheduled', 'Completed', 'In Progress', 'Cancelled', 'Pending', 'Rescheduled'],
    itemCategory: ['Wheelchairs', 'Walkers', 'Hospital Beds', 'Oxygen Equipment', 'Mobility Aids', 'Respiratory'],
    bilType: ['Insurance', 'Medicare', 'Medicaid', 'Private Pay', 'Workers Comp'],
    itemNumber: ['ITM-001', 'ITM-002', 'ITM-003', 'ITM-004', 'ITM-005', 'ITM-006']
  }

  const getFilterDisplayValue = (key, value) => {
    if (key === 'dateOfService') {
      if (value === '1month') return '1 Month'
      if (value === '2months') return '2 Months'
      if (value === '3months') return '3 Months'
      if (value === 'custom') return 'Custom Date Range'
    }
    if (value === 'All' && filterOptions[key]) {
      return filterOptions[key].join(', ')
    }
    return value || 'Not Set'
  }

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  // Check if custom date range is selected
  const isCustomDateRange = filters.dateOfService === 'custom'

  const handleReset = () => {
    setFilters({
      dateOfService: '3months',
      stockLocation: 'All',
      provider: 'All',
      hcpcs: 'All',
      fitter: 'All',
      visitStatus: 'All',
      fromDate: '',
      toDate: '',
      itemCategory: 'All',
      bilType: 'All',
      itemNumber: 'All',
    })
  }

  const handleApply = () => {
    console.log('Applying filters:', filters)
    // Apply filter logic here
  }

  // PDF Mode: Show filter summary
  if (isPdfMode) {
    return (
      <div className="filter-section pdf-filter-summary">
        <h3 className="pdf-summary-title">Applied Filters</h3>
        <div className="pdf-summary-grid">
          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Date of Service:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('dateOfService', filters.dateOfService)}</span>
          </div>

          {filters.dateOfService === 'custom' && (
            <>
              <div className="pdf-summary-item">
                <span className="pdf-summary-label">From Date:</span>
                <span className="pdf-summary-value">{filters.fromDate || 'Not Set'}</span>
              </div>
              <div className="pdf-summary-item">
                <span className="pdf-summary-label">To Date:</span>
                <span className="pdf-summary-value">{filters.toDate || 'Not Set'}</span>
              </div>
            </>
          )}

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Stock Location:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('stockLocation', filters.stockLocation)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Provider:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('provider', filters.provider)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">HCPCS:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('hcpcs', filters.hcpcs)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Fitter:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('fitter', filters.fitter)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Visit Status:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('visitStatus', filters.visitStatus)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Item Category:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('itemCategory', filters.itemCategory)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Bil Type:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('bilType', filters.bilType)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Item Number:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('itemNumber', filters.itemNumber)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Normal Mode: Show filter form
  return (
    <div className="filter-section">
      <div className="filter-grid">
        <div className="filter-column">
          <div className="date-filter-box">
            <div className="filter-item">
              <label>Date of Service</label>
              <select
                value={filters.dateOfService}
                onChange={(e) => handleFilterChange('dateOfService', e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="2months">2 Months</option>
                <option value="3months">3 Months</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            <div className="date-range-row">
              <div className="filter-item">
                <label>From Date</label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                  disabled={!isCustomDateRange}
                />
              </div>

              <div className="filter-item">
                <label>To Date</label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange('toDate', e.target.value)}
                  disabled={!isCustomDateRange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Stock Location</label>
            <select
              value={filters.stockLocation}
              onChange={(e) => handleFilterChange('stockLocation', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
              <option value="Main Storage">Main Storage</option>
              <option value="Regional Hub">Regional Hub</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Item Category Name</label>
            <select
              value={filters.itemCategory}
              onChange={(e) => handleFilterChange('itemCategory', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Wheelchairs">Wheelchairs</option>
              <option value="Walkers">Walkers</option>
              <option value="Hospital Beds">Hospital Beds</option>
              <option value="Oxygen Equipment">Oxygen Equipment</option>
              <option value="Mobility Aids">Mobility Aids</option>
              <option value="Respiratory">Respiratory</option>
            </select>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Provider</label>
            <select
              value={filters.provider}
              onChange={(e) => handleFilterChange('provider', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Dr. Johnson">Dr. Johnson</option>
              <option value="Dr. Williams">Dr. Williams</option>
              <option value="Dr. Brown">Dr. Brown</option>
              <option value="Dr. Davis">Dr. Davis</option>
              <option value="Dr. Martinez">Dr. Martinez</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Bil Type</label>
            <select
              value={filters.bilType}
              onChange={(e) => handleFilterChange('bilType', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Insurance">Insurance</option>
              <option value="Medicare">Medicare</option>
              <option value="Medicaid">Medicaid</option>
              <option value="Private Pay">Private Pay</option>
              <option value="Workers Comp">Workers Comp</option>
            </select>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>HCPCS</label>
            <select
              value={filters.hcpcs}
              onChange={(e) => handleFilterChange('hcpcs', e.target.value)}
            >
              <option value="All">All</option>
              <option value="E0143">E0143 - Walker</option>
              <option value="E1390">E1390 - Oxygen Concentrator</option>
              <option value="E0260">E0260 - Hospital Bed</option>
              <option value="K0001">K0001 - Standard Wheelchair</option>
              <option value="E0601">E0601 - CPAP Device</option>
              <option value="E0235">E0235 - Bed Rails</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Item Number</label>
            <select
              value={filters.itemNumber}
              onChange={(e) => handleFilterChange('itemNumber', e.target.value)}
            >
              <option value="All">All</option>
              <option value="ITM-001">ITM-001</option>
              <option value="ITM-002">ITM-002</option>
              <option value="ITM-003">ITM-003</option>
              <option value="ITM-004">ITM-004</option>
              <option value="ITM-005">ITM-005</option>
              <option value="ITM-006">ITM-006</option>
            </select>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Fitter</label>
            <select
              value={filters.fitter}
              onChange={(e) => handleFilterChange('fitter', e.target.value)}
            >
              <option value="All">All</option>
              <option value="John Anderson">John Anderson</option>
              <option value="Sarah Mitchell">Sarah Mitchell</option>
              <option value="Mike Thompson">Mike Thompson</option>
              <option value="Emily Rodriguez">Emily Rodriguez</option>
              <option value="David Chen">David Chen</option>
            </select>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            Reset to Default
          </button>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Visit Status</label>
            <select
              value={filters.visitStatus}
              onChange={(e) => handleFilterChange('visitStatus', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Pending">Pending</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>

          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSection

